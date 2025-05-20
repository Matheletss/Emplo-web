# db.py
from pymongo import MongoClient
from typing import Optional

# MongoDB connection string
MONGO_URI = "mongodb://localhost:27017/database"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client.get_database()

# Get a reference to the profiles collection
profiles_collection = db.profiles
