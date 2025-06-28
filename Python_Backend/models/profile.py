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

#Model for user profiles
class Profile(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    password: Optional[str] = None
    op_email: Optional[EmailStr] = None
    skills: Optional[Union[str, List[str]]] = None
    experience: Optional[Union[str, List[str]]] = None
    projects: Optional[Union[str, List[str]]] = None
    miscellaneous: Optional[Union[str, List[str]]] = None
    education: Optional[Union[str, List[str]]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "validate_by_name": True,  # Equivalent to validate_by_name
        "json_encoders": {ObjectId: str}
    }
       