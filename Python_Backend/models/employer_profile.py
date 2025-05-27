from pydantic_core import CoreSchema
from datetime import datetime
from typing import Optional, Union, List, Literal
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
HiringSizeType = Literal["1-10", "10-50", "50-100", "100-500", "500+"]
CompanyType = Literal[
    "AI company",
    "Technology company",
    "Staffing agency/talent acquisition",
    "Consultancy/managed service provider",
    "Capital allocator",
    "Multinational corporation",
    "Others",
]

class EmployerProfile(BaseModel):
    id:  PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    work_email: EmailStr
    hiring_size: HiringSizeType
    worker_types: List[str]
    company_type: CompanyType
    name: str
    additional_info: Optional[str] = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)