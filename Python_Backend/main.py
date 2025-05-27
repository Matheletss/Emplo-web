from fastapi import FastAPI
from app.routes import router as app_router  # Import the FastAPI router from routes.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.resume_parser_api.resume import router as resume_router  # Import the FastAPI router from resume_parser_api 
from api.authentication.auth import router as auth_router  # Import the FastAPI router from auth.py
from fastapi import UploadFile, File
from api.ai_interviewer_backend.app.api import interview, tts, stt
from api.Post_Jobs.post_jobs import router as post_jobs_router  # Import the FastAPI router from post_jobs.py
from api.Employer.employer import router as employer_router  # Import the FastAPI router from employer.py
import os
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#interviewer router
app.include_router(interview.router, prefix="/interview", tags=["Interview"])
app.include_router(tts.router, prefix="/audio")
app.include_router(stt.router, prefix="/audio")

# Include the API router
app.include_router(resume_router)
app.include_router(auth_router)
app.include_router(post_jobs_router)
app.include_router(employer_router)

# # Serve static files
# app.mount("/static", StaticFiles(directory="static"), name="static")

# Register the routes (FastAPI routes from the router in routes.py)
app.include_router(app_router)

@app.get("/")
def read_root():
    return {"message": "Connected to Backend"}
