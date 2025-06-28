from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from bson import ObjectId

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    description: Optional[str]

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: str
    class Config:
        from_attributes = True