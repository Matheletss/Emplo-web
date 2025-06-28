from fastapi import APIRouter
from app.db import profiles_collection
from models.profile import Profile as Profile
from models.profile import PyObjectId as PyObjectId
from models.employer_profile import EmployerProfile as EmployerProfile
from app.db import jobs_collection
from fastapi import HTTPException
from app.db import applicants_collection
from bson import ObjectId
from bson.errors import InvalidId
from app.db import resume_collection

router = APIRouter()

@router.get("/applicants/{job_id}")
async def get_applicants_for_job(job_id: str):
    try:
        job_obj_id = ObjectId(job_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid job ID format")

    # Check if job exists
    job = await jobs_collection.find_one({"_id": job_obj_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Fetch all applicants for the job
    applicants_cursor = applicants_collection.find({"job_id": job_obj_id})
    applicants = []
    async for applicant in applicants_cursor:
        # Optionally fetch user profile for extra info
        user_profile = await profiles_collection.find_one({"_id": applicant["user_id"]})
        applicants.append({
            "application_id": str(applicant["_id"]),
            "user_id": str(applicant["user_id"]),
            "user_email": str(applicant["user_email"]),
            "job_title": applicant["job_title"],
            "job_company": applicant["job_company"],
            "status": applicant.get("status", "unknown"),
            "user_email": user_profile.get("email") if user_profile else "Unknown",
            "user_name": user_profile.get("name") if user_profile else "Unknown"
        })

    return {
        "job_id": job_id,
        "job_title": job["title"],
        "applicant_count": len(applicants),
        "applicants": applicants
    }

@router.post("/apply/{job_id}/{email}")
async def apply_to_job(job_id: str, email: str):
    profile = await profiles_collection.find_one({"email": email})
    # resume = await resume_collection.find_one({"id": _id})
    if not profile:
        raise HTTPException(status_code=404, detail="User profile not found")
    
    user_id = profile["_id"]
    print(f"Applying for job {job_id} for user {user_id}")
    try:
        job_obj_id = ObjectId(job_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid job ID format")

    job = await jobs_collection.find_one({"_id": job_obj_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    # Check if already applied to this job
    if await applicants_collection.find_one({"user_id": user_id, "job_id": job["_id"]}):
        raise HTTPException(status_code=409, detail="Already applied to this job")

    # Insert new application
    applicant_doc = {
        "_id": ObjectId(),  # unique for each application
        "user_id": user_id,
        "user_email": profile["email"],
        "job_id": job["_id"],
        "job_title": job["title"],
        "job_company": job["company"],
        "status": "applied"
    }

    await applicants_collection.insert_one(applicant_doc)

    return {
        "message": "Application successful",
        "user_id": str(user_id),
        "job_title": job["title"]
    }
