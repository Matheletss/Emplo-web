from cProfile import Profile
from fastapi import Depends, FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
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

router= APIRouter()

# PARSED_RESUMES_DIR = r"C:\Users\MAYUKH ABHIGYAN\resume_parser_llm_api\training_data"

class JobDescription(BaseModel):
    title: str
    description: str

def load_job_description(filepath="api/resume_scorer_llm_api/job_description/job_description.txt"):
    with open(filepath, "r", encoding="utf-8") as f:
        return f.read()

# @router.get("/resumes")
# async def list_parsed_resumes():
#     try:
#         files = [f for f in os.listdir(PARSED_RESUMES_DIR) if f.endswith(".json")]
#         return {"resumes": files}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

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

@router.post("/score/{user_email}")
async def score_resume(user_email: str, user=Depends(get_current_user)):
    try:
        # 🔍 Fetch resume by email
        document = await resume_collection.find_one({"user_email": user_email})
        if not document:
            raise HTTPException(status_code=404, detail="Resume not found")

        # 🔍 Fetch profile of the target user (NOT the currently logged-in user)
        profile_document = await profiles_collection.find_one({"email": user_email})
        if not profile_document:
            raise HTTPException(status_code=404, detail="Profile not found for this email")

        messages = document.get("messages", [])
        if not messages:
            raise HTTPException(status_code=400, detail="No messages in resume")

        parsed_resume = messages[-1].get("content")
        if not parsed_resume:
            raise HTTPException(status_code=400, detail="No parsed resume content found")

        job_description = load_job_description()

        candidate_name = document.get("name", profile_document.get("name", "unknown"))

        # ✅ Scoring result in the structured format
        score_result = score_resume_against_jd(parsed_resume, job_description, candidate_name)

        # Convert from string to dict if it's a JSON string
        if isinstance(score_result, str):
            score_result = json.loads(score_result)

        # ✅ Validate against ResumeScore model
        validated_score = ResumeScore(**score_result)

        await scorer_collection.update_one(
            {"user_email": user_email},
            {
                "$set": {
                    "user_id": str(profile_document.get("_id")),  # User ID of the resume owner
                    "name": profile_document.get("name"),
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

    
# @router.get("/score/{resume_id}")
# async def get_resume_score(resume_id: str):
#     try:
#         obj_id = ObjectId(resume_id)
#         document = await scorer_collection.find_one(
#             {"_id": obj_id},
#             {"score_data": 1, "_id": 0, "name": 1}
#         )

#         if not document or "score_data" not in document:
#             raise HTTPException(status_code=404, detail="Score not found for this resume")

#         return {
#             "name": document.get("name", "Unnamed"),
#             "score_data": document["score_data"]
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @router.get("/score/user/{user_id}")
# async def get_resume_score_by_user(user_id: str):
#     obj_id = ObjectId(user_id)
#     try:
#         document = await scorer_collection.find_one(
#             {"user_id": obj_id},
#             {"score_data": 1, "_id": 0, "name": 1}
#         )
#         if not document or "score_data" not in document:
#             raise HTTPException(status_code=404, detail="Score not found for this user")

#         return {
#             "score_id": str(document.get("_id")),
#             "name": document.get("name", "Unnamed"),
#             "score_data": document["score_data"]
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


@router.get("/score/user/{user_id}")
async def get_resume_score_by_user(user_id: str):
    try:
        document = await scorer_collection.find_one(
            {"user_id": user_id},
            {"score_data": 1, "name": 1, "user_email": 1, "user_id": 1}  # _id is included by default
        )

        if not document or "score_data" not in document:
            raise HTTPException(status_code=404, detail="Score not found for this user")

        return {
            "user_id": document.get("user_id"),  # Convert ObjectId to string
            "score_id": str(document.get("_id")),  # Convert ObjectId to string
            "user_email": document.get("user_email"),
            "name": document.get("name", "Unnamed"),
            "score_data": document["score_data"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))