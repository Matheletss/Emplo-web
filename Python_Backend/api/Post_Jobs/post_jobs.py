from fastapi import FastAPI, HTTPException, APIRouter, Depends
from app.db import jobs_collection
from models.jobs import JobCreate, Job
from bson import ObjectId
from api.authentication.auth import get_current_user
router = APIRouter()

def serialize_job(job) -> dict:
    return {
        "id": str(job["_id"]),
        "title": job["title"],
        "company": job["company"],
        "location": job["location"],
        "description": job.get("description", "")
    }

@router.get("/jobs")
async def get_jobs(user = Depends(get_current_user)):
    jobs_cursor = await jobs_collection.find().to_list(length=None)
    return [serialize_job(job) for job in jobs_cursor]

@router.get("/my-jobs")
async def get_my_jobs(user = Depends(get_current_user)):
    jobs_cursor = await jobs_collection.find({"email": user["email"]}).to_list(length=None)
    return [serialize_job(job) for job in jobs_cursor]

@router.post("/jobs", response_model=Job)
async def create_job(
    job: JobCreate,
    user = Depends(get_current_user)
):
    job_dict = job.model_dump(by_alias=True)
    print(job_dict)
    job_dict["email"] = user["email"]  # ✅ Add email from JWT
    print(job_dict)
    
    result = await jobs_collection.insert_one(job_dict)
    created = await jobs_collection.find_one({"_id": result.inserted_id})
    return serialize_job(created)

@router.get("/jobs/{job_id}")
async def get_job(job_id: str):
    job = await jobs_collection.find_one({"_id": ObjectId(job_id)})
    if job:
        job["_id"] = str(job["_id"])
        return job
    raise HTTPException(status_code=404, detail="Job not found")

@router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    result = await jobs_collection.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}
