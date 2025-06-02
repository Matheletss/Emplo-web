from fastapi import FastAPI
from app.routes import router as app_router  # Import the FastAPI router from routes.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.resume_parser_api.resume import router as resume_router  # Import the FastAPI router from resume_parser_api 
from api.authentication.auth import router as auth_router  # Import the FastAPI router from auth.py
from api.ai_interviewer_backend.app.api.interview import router as ai_interviewer_router  # Import the FastAPI router from ai_interviewer_backend
from api.ai_interviewer_backend.app.api.tts import router as tts_router  # Import the FastAPI router from tts.py
from api.ai_interviewer_backend.app.api.stt import router as stt_router  # Import the FastAPI router from stt.py
from api.Post_Jobs.post_jobs import router as post_jobs_router  # Import the FastAPI router from post_jobs.py
from api.Employer.employer import router as employer_router  # Import the FastAPI router from employer.py  
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#interviewer router
app.include_router(ai_interviewer_router, prefix="/interview", tags=["Interview"])
app.include_router(tts_router, prefix="/audio")
app.include_router(stt_router, prefix="/audio")

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
