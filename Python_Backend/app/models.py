from pydantic_core import CoreSchema
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, GetJsonSchemaHandler
from bson import ObjectId
from pydantic import Field

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema: CoreSchema, handler: GetJsonSchemaHandler) -> dict[str, Optional[dict]]:
        json_schema = super().__get_pydantic_json_schema__(core_schema, handler)
        json_schema = handler.resolve_ref_schema(json_schema)
        json_schema.update(examples=['example'])
        return json_schema
    
class Profile(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str  # This will match the auth user ID
    name: Optional[str] = None
    email: Optional[str] = None
    skills: Optional[str] = None
    experience: Optional[str] = None
    projects: Optional[str] = None
    miscellaneous: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        json_encoders = {ObjectId: str}
        # schema_extra = {
        #     "example": {
        #         "user_id": "auth0|123456",
        #         "name": "John Doe",
        #         "email": "john@example.com",
        #         "skills": "Python, FastAPI, MongoDB",
        #         "created_at": "2023-01-01T00:00:00",
        #         "updated_at": "2023-01-01T00:00:00"
        #     }
        # }