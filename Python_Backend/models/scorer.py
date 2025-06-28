from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Union
from datetime import datetime


# 🔹 Detailed Analysis Models

class SkillAnalysis(BaseModel):
    title: str
    subtitle: str
    matchedSkills: List[str] = []
    visualizationTools: List[str] = []
    dataProcessingAndQuerying: List[str] = []
    statisticalAndAnalyticalTools: List[str] = []


class WorkExperienceItem(BaseModel):
    title: str
    company: str
    match: Union[int, float]
    description: str


class WorkExperienceAnalysis(BaseModel):
    title: str
    subtitle: str
    relevantExperiences: List[WorkExperienceItem] = []
    experienceDepth: str
    impactAssessment: str


class SemanticAnalysis(BaseModel):
    title: str
    subtitle: str
    keywordAlignment: str
    highMatchKeywords: List[str] = []
    partialMatchKeywords: List[str] = []
    contextRelevance: str


class ProjectAnalysis(BaseModel):
    title: str
    subtitle: str
    mostRelevantProjects: List[str] = []
    impactAnalysis: str


class Degree(BaseModel):
    degree: str
    institution: str
    period: str
    match: str


class EducationAnalysis(BaseModel):
    title: str
    subtitle: str
    degrees: List[Degree] = []
    certifications: List[str] = []


class InterpersonalAnalysis(BaseModel):
    title: str
    subtitle: str
    identifiedSkills: dict = Field(default_factory=lambda: {
        "strongEvidence": [],
        "moderateEvidence": []
    })
    evidenceSources: List[str] = []
    softSkillsPortfolio: List[str] = []


# 🔹 Evaluation Item Model

class EvaluationItem(BaseModel):
    title: str
    score: Union[int, float]
    description: str
    icon: str
    skills: List[str] = []

    detailedAnalysis: Union[
        SkillAnalysis,
        WorkExperienceAnalysis,
        SemanticAnalysis,
        ProjectAnalysis,
        EducationAnalysis,
        InterpersonalAnalysis,
        dict  # Fallback in case it's dynamic
    ]


# 🔹 Main Scoring Model

class ResumeScore(BaseModel):
    overallScore: Union[int, float]
    evaluation: List[EvaluationItem]


# 🔹 MongoDB Resume Document Model (Optional)

class ResumeDocument(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: str
    messages: List[dict]  # Or replace with your Message model
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    score_data: Optional[ResumeScore] = None
    last_scored_at: Optional[datetime] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
        