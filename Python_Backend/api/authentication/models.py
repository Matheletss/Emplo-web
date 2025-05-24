from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List
from models.profile import Profile
from typing import Optional

class ProfileWithToken(BaseModel):
    id: str
    user: str
    email: EmailStr
    access_token: str
    token_type: str = "bearer"
    
class ProfileUpdate(BaseModel):
    name: Optional[str]=None
    op_email: Optional[EmailStr]=None
    skills: Optional[List[str]]=None
    experience: Optional[List[str]]=None
    projects: Optional[List[str]]=None
    miscellaneous: Optional[List[str]]=None
    password: Optional[str]=None
    
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
