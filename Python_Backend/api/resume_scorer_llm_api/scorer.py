from fastapi import Depends, FastAPI, HTTPException, APIRouter, Path
from pydantic import BaseModel
from bson.errors import InvalidId
import json
import os
from api.authentication.auth import get_current_user
from api.resume_scorer_llm_api.utils.scorer import score_resume_against_jd
from app.db import resume_collection  # Import the MongoDB collection
from bson import ObjectId
from datetime import datetime
from models.scorer import ResumeScore  # Import the ResumeScore model
from models.scorer import ResumeDocument  # Import the ResumeDocument model
from app.db import scorer_collection  # Import the scorer collection
from app.db import profiles_collection  # Import the profile collection
from app.db import jobs_collection  # Import the jobs collection
from typing import Optional

router= APIRouter()

# PARSED_RESUMES_DIR = r"C:\Users\MAYUKH ABHIGYAN\resume_parser_llm_api\training_data"

class JobDescription(BaseModel):
    title: str
    description: str

async def load_job_description_from_db(email: str, job_id: Optional[str] = None) -> str:
    """
    Load the job description from the MongoDB collection.
    If job_id is provided, it fetches that specific job.
    Otherwise, it fetches the most recent job created by the user.
    """
    query = {"email": email}
    if job_id:
        try:
            query["_id"] = ObjectId(job_id)
        except InvalidId:
            raise HTTPException(status_code=400, detail="Invalid job ID format")


    job_doc = await jobs_collection.find_one(query, sort=[("_id", -1)])  
    if not job_doc or "description" not in job_doc:
        raise HTTPException(status_code=404, detail="Job description not found")
    
    return job_doc["description"]
    
@router.get("/resumes")
async def list_resumes():
    try:
        cursor = resume_collection.find({}, {"name": 1})
        resumes = []
        async for document in cursor:
            resumes.append({
                "id": str(document["_id"]),
                "name": document.get("name", "Unnamed")
            })
        return {"resumes": resumes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload_resume")
async def upload_resume(resume: ResumeDocument):
    try:
        doc = resume.dict(by_alias=True, exclude_none=True)
        result = await resume_collection.insert_one(doc)
        return {"id": str(result.inserted_id), "message": "Resume uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @router.post("/score/{user_email}")
# async def score_resume(user_email: str, user=Depends(get_current_user)):
#     try:
#         # 🔍 Fetch resume document
#         document = await resume_collection.find_one({"user_email": user_email})
#         if not document:
#             raise HTTPException(status_code=404, detail="Resume not found")

#         # 🔍 Fetch profile document
#         profile_document = await profiles_collection.find_one({"email": user_email})
#         if not profile_document:
#             raise HTTPException(status_code=404, detail="Profile not found for this email")

#         # 📄 Extract latest parsed resume content
#         messages = document.get("messages", [])
#         if not messages:
#             raise HTTPException(status_code=400, detail="No messages in resume")

#         parsed_resume = messages[-1].get("content")
#         if not parsed_resume:
#             raise HTTPException(status_code=400, detail="No parsed resume content found")

#         # 📋 Load job description
#         job_description = await load_job_description_from_db(user_email)

#         # 👤 Determine candidate name
#         candidate_name = document.get("name", profile_document.get("name", "unknown"))

#         # 🤖 Generate score using external function
#         score_result = score_resume_against_jd(parsed_resume, job_description, candidate_name)

#         # 🔄 If score_result is JSON string, convert to dict/list
#         if isinstance(score_result, str):
#             score_result = json.loads(score_result)

#         # 🔧 Transform list-based response into dict for ResumeScore model
#         if isinstance(score_result, list):
#             score_result = {
#                 "overallScore": score_result[0].get("overallScore", 0),
#                 "candidateData": score_result[0].get("candidateData", {}),
#                 "evaluation": score_result[1:]
#             }

#         # ✅ Validate against ResumeScore Pydantic model
#         validated_score = ResumeScore(**score_result)

#         # 💾 Upsert result into database
#         await scorer_collection.update_one(
#             {"user_email": user_email},
#             {
#                 "$set": {
#                     "user_id": str(profile_document.get("_id")),
#                     "name": profile_document.get("name"),
#                     "score_data": validated_score.model_dump(),
#                     "last_scored_at": datetime.utcnow()
#                 }
#             },
#             upsert=True
#         )

#         # 📤 Return success response
#         return {
#             "message": "Score generated and saved successfully.",
#             "score_data": validated_score.model_dump()
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@router.post("/score/{user_email}/{job_id}")
async def score_resume(
    user_email: str,
    job_id: str = Path(..., description="Job ID to evaluate resume against"),
    user=Depends(get_current_user)
):
    try:
        # 🔍 Fetch resume document
        document = await resume_collection.find_one({"user_email": user_email})
        if not document:
            raise HTTPException(status_code=404, detail="Resume not found")

        # 🔍 Fetch profile document
        profile_document = await profiles_collection.find_one({"email": user_email})
        if not profile_document:
            raise HTTPException(status_code=404, detail="Profile not found for this email")

        # 📄 Extract latest parsed resume content
        messages = document.get("messages", [])
        if not messages:
            raise HTTPException(status_code=400, detail="No messages in resume")

        parsed_resume = messages[-1].get("content")
        if not parsed_resume:
            raise HTTPException(status_code=400, detail="No parsed resume content found")

        # 📋 Load job description
        job_description = await load_job_description_from_db(user["email"], job_id)

        # 👤 Determine candidate name
        candidate_name = document.get("name", profile_document.get("name", "unknown"))

        # 🤖 Generate score using external function
        score_result = score_resume_against_jd(parsed_resume, job_description, candidate_name)

        if isinstance(score_result, str):
            score_result = json.loads(score_result)

        if isinstance(score_result, list):
            score_result = {
                "overallScore": score_result[0].get("overallScore", 0),
                "candidateData": score_result[0].get("candidateData", {}),
                "evaluation": score_result[1:]
            }

        # ✅ Validate using ResumeScore model
        validated_score = ResumeScore(**score_result)

        # 💾 Save to scorer_collection keyed by (user_email + job_id)
        await scorer_collection.update_one(
            {"user_email": user_email, "job_id": job_id},
            {
                "$set": {
                    "user_id": str(profile_document.get("_id")),
                    "name": profile_document.get("name"),
                    "job_id": job_id,
                    "score_data": validated_score.model_dump(),
                    "last_scored_at": datetime.utcnow()
                }
            },
            upsert=True
        )

        return {
            "message": "Score generated and saved successfully.",
            "score_data": validated_score.model_dump()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @router.get("/score/user/{user_id}")
# async def get_resume_score_by_user(user_id: str):
#     try:
#         document = await scorer_collection.find_one(
#             {"user_id": user_id},
#             {"score_data": 1, "name": 1, "user_email": 1, "user_id": 1}  # _id is included by default
#         )

#         if not document or "score_data" not in document:
#             raise HTTPException(status_code=404, detail="Score not found for this user")

#         return {
#             "user_id": document.get("user_id"),  # Convert ObjectId to string
#             "score_id": str(document.get("_id")),  # Convert ObjectId to string
#             "user_email": document.get("user_email"),
#             "name": document.get("name", "Unnamed"),
#             "score_data": document["score_data"]
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@router.get("/score/user/{user_id}/{job_id}")
async def get_resume_score_by_job(user_id: str, job_id: str):
    try:
        document = await scorer_collection.find_one(
            {"user_id": user_id, "job_id": job_id},
            {"score_data": 1, "name": 1, "user_email": 1, "job_id": 1}
        )

        if not document or "score_data" not in document:
            raise HTTPException(status_code=404, detail="Score not found for this user and job")

        return {
            "user_email": document.get("user_email"),
            "job_id": document.get("job_id"),
            "score_id": str(document.get("_id")),
            "name": document.get("name", "Unnamed"),
            "score_data": document["score_data"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))