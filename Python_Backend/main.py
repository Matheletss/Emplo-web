from fastapi import FastAPI
from app.routes import router as app_router  # Import the FastAPI router from routes.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.resume_parser_api.resume import router as resume_router  # Import the FastAPI router from resume_parser_api 
# from api.auth.auth import router as auth_router  # Import the FastAPI router from auth.py
from api.authentication.auth import router as auth_router  # Import the FastAPI router from auth.py
from fastapi import UploadFile, File
import os
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API router
app.include_router(resume_router)
app.include_router(auth_router)

# # Serve static files
# app.mount("/static", StaticFiles(directory="static"), name="static")

# Register the routes (FastAPI routes from the router in routes.py)
app.include_router(app_router)

@app.get("/")
def read_root():
    return {"message": "Connected to Backend"}
