from pydantic import BaseModel, Field, EmailStr
from typing import List, Union, Optional
from datetime import datetime

class Message(BaseModel):
    role: str  # e.g., "user" or "assistant"
    content: Union[str, dict]  # Assistant content could be parsed JSON

class TrainingExample(BaseModel):
    user_email: EmailStr
    user_id: str  # User ID or email
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    messages: List[Message]