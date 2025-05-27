from pydantic import BaseModel, GetJsonSchemaHandler
from typing import List, Dict, Optional
from bson import ObjectId
from pydantic_core import CoreSchema

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

class InterviewState(BaseModel):
    question_count: int = 0
    conversation_history: List[Dict[str, str]] = []
    is_interview_complete: bool = False

class AskRequest(BaseModel):
    user_response: str
    state: InterviewState

class UserResponseRequest(BaseModel):
    user_response: str
    state: Optional[InterviewState] = None