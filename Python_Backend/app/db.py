# db.py
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional

# MongoDB connection string
MONGO_URI = "mongodb://localhost:27017/database"

# Connect to MongoDB
client = AsyncIOMotorClient(MONGO_URI)
db = client.get_database("database")

# Get a reference to the profiles collection
profiles_collection = db.profiles
transcripts_collection = db.transcripts
jobs_collection = db.jobs
employers_collection = db.employers
resume_collection = db.resume
applicants_collection = db.applicants
scorer_collection = db.scorer

