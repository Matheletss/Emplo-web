from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional

class ProfileWithToken(BaseModel):
    email: EmailStr
    access_token: str
    token_type: str = "bearer"
    
class ProfileUpdate(BaseModel):
    name: Optional[str]=None
    skills: Optional[str]=None
    experience: Optional[str]=None
    projects: Optional[str]=None
    miscellaneous: Optional[str]=None
    password: Optional[str]=None
