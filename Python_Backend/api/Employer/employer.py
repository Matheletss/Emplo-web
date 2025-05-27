from models.employer_profile import EmployerProfile
from fastapi import APIRouter
from app.db import employers_collection as collection
router = APIRouter()

@router.post("/employer-profile")
async def save_profile(profile: EmployerProfile):
    result = await collection.update_one(
        {"_id": profile.id},
        {"$set": profile.dict()},
        upsert=True
    )
    return {"message": "Profile saved"}