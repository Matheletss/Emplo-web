# routes.py
from fastapi import APIRouter
from app.db import profiles_collection
from app.models import Profile, PyObjectId
from fastapi import HTTPException
from typing import List
from datetime import datetime
import logging
import bcrypt

logger = logging.getLogger(__name__)

router = APIRouter()

# Get a user profile
@router.get("/profile/{profile_id}", response_model=Profile)
async def get_profile(profile_id: str):
    if (profile := profiles_collection.find_one({"_id": PyObjectId(profile_id)})) is not None:
        return profile
    raise HTTPException(status_code=404, detail="Profile not found")

# Create a new profile
@router.post("/profile", response_model=Profile)
async def create_profile(profile: Profile):
    existing_profile = profiles_collection.find_one({"email": profile.email})
    if existing_profile:
        raise HTTPException(status_code=400, detail="A profile with this email already exists.")
    
    profile_dict = profile.model_dump(by_alias=True)
    profiles_collection.insert_one(profile_dict)
    
    if profile.password is None:
        raise ValueError("Password cannot be None")

    salt = bcrypt.gensalt()
    secPass = bcrypt.hashpw(profile.password.encode('utf-8'), salt).decode('utf-8')
    profile_dict["password"] = secPass
    profiles_collection.update_one(
    {"_id": profile.id},             # Find by username (or _id)
    {"$set": {"password": secPass}}     # Store hashed password
)
    return profile_dict

# Update an existing profile
@router.put("/profile/{profile_id}", response_model=Profile)
async def update_profile(profile_id: str, profile_update: Profile):
    profile_update.updated_at = datetime.utcnow()
    update_data = {k: v for k, v in profile_update.model_dump(by_alias=True).items() 
                 if v is not None and k not in ["_id", "created_at"]}
    
    result = profiles_collection.update_one(
        {"_id": PyObjectId(profile_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 1:
        updated_profile = profiles_collection.find_one({"_id": PyObjectId(profile_id)})
        return updated_profile
    
    raise HTTPException(status_code=404, detail="Profile not found")