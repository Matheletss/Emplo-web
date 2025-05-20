from pydantic_core import CoreSchema
from datetime import datetime
from typing import Optional, Union, List
from pydantic import BaseModel, GetJsonSchemaHandler, EmailStr
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

#Model for Employer profiles
class EmployerProfile(BaseModel):
    id:  PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    work_email: EmailStr
    hiring_size: Optional[str] = None
    worker_types: Optional[List[str]] = None
    company_type: Optional[str] = None
    name: Optional[str] = None
    additional_info: Optional[str] = None
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    
    model_config = {
        "validate_by_name": True,  # Equivalent to validate_by_name
        "json_encoders": {ObjectId: str}
    }