from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Union, Dict
from datetime import datetime


# 🔹 Candidate Info
class CandidateData(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    location: Optional[str] = ""
    jobTitle: Optional[str] = ""


# 🔹 Skill Match Analysis
class ToolSkill(BaseModel):
    name: str
    level: str

class SkillAnalysis(BaseModel):
    title: str
    subtitle: str
    matchedSkills: List[str] = []
    visualizationTools: List[ToolSkill] = []
    dataProcessingAndQuerying: List[ToolSkill] = []
    statisticalAndAnalyticalTools: List[ToolSkill] = []


# 🔹 Work Experience Analysis
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


# 🔹 Semantic Scoring Analysis
class SemanticAnalysis(BaseModel):
    title: str
    subtitle: str
    keywordAlignment: str
    highMatchKeywords: List[str] = []
    partialMatchKeywords: List[str] = []
    contextRelevance: str


# 🔹 Project Relevancy Analysis
class ProjectItem(BaseModel):
    name: str
    match: Union[int, float]
    description: str
    technologies: List[str] = []

class ProjectAnalysis(BaseModel):
    title: str
    subtitle: str
    mostRelevantProjects: List[ProjectItem] = []
    impactAnalysis: str


# 🔹 Education Analysis
class Degree(BaseModel):
    degree: str
    institution: str
    period: str
    match: str

class Certification(BaseModel):
    name: str
    year: str

class EducationAnalysis(BaseModel):
    title: str
    subtitle: str
    degrees: List[Degree] = []
    certifications: List[Certification] = []


# 🔹 Interpersonal Skills Analysis
class SkillEvidence(BaseModel):
    skill: str
    score: Union[int, float]
    description: str

class EvidenceSource(BaseModel):
    skill: str
    evidence: str

class InterpersonalAnalysis(BaseModel):
    title: str
    subtitle: str
    identifiedSkills: Dict[str, List[SkillEvidence]]  # "strongEvidence" and "moderateEvidence"
    evidenceSources: List[EvidenceSource] = []
    softSkillsPortfolio: List[str] = []


# 🔹 Evaluation Item Union
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
        dict  # fallback
    ]


# 🔹 Main Resume Score Model
class ResumeScore(BaseModel):
    overallScore: Union[int, float]
    candidateData: CandidateData
    evaluation: List[EvaluationItem]


# 🔹 Full MongoDB Resume Document (optional)
class ResumeDocument(BaseModel):
    id: Optional[str] = Field(alias="_id")
    name: str
    messages: List[dict]  # You can replace with MessageModel if needed
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    score_data: Optional[ResumeScore] = None
    last_scored_at: Optional[datetime] = None

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
