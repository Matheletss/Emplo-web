import json
from datetime import datetime

from fastapi import Depends
from api.authentication.auth import get_current_user
from app.db import resume_collection  # imported from your db.py
from models.resume import TrainingExample, Message 

# async def save_training_example(prompt_input: str, parsed_resume, user = Depends(get_current_user)):
#     print("🔧 save_training_example() called")

#     # If parsed_resume is a JSON string, decode it
#     if isinstance(parsed_resume, str):
#         try:
#             parsed_resume = json.loads(parsed_resume)
#             print("✅ parsed_resume decoded successfully")
#         except json.JSONDecodeError as e:
#             print("❌ Failed to decode parsed_resume:", e)
#             return

#     # 🕒 Include timestamp for tracking
#     timestamp = datetime.now().isoformat()

#     # Construct the document
#     # Create TrainingExample object using schema
#     example = TrainingExample(
#         user_id=user.get("id"),  # Use email as ID
#         timestamp=datetime.utcnow(),
#         messages=[
#             Message(role="user", content=prompt_input),
#             Message(role="assistant", content=parsed_resume)
#         ]
#     )

#     # Insert into MongoDB
#     try:
#         result = await resume_collection.insert_one(example.dict())
#         print(f"✅ Saved training data to MongoDB with _id: {result.inserted_id}")
#     except Exception as e:
#         print("❌ Error inserting into MongoDB:", e)

async def save_training_example(prompt_input: str, parsed_resume, user=Depends(get_current_user)):
    print("🔧 save_training_example() called")
    print("User:", user)
    # Decode JSON string if necessary
    if isinstance(parsed_resume, str):
        try:
            parsed_resume = json.loads(parsed_resume)
            print("✅ parsed_resume decoded successfully")
        except json.JSONDecodeError as e:
            print("❌ Failed to decode parsed_resume:", e)
            return

    # Build the TrainingExample document
    example = TrainingExample(
        user_email=user.get("email"),
        user_id=user.get("_id"),  # Unique identifier for the user
        timestamp=datetime.utcnow(),
        messages=[
            Message(role="user", content=prompt_input),
            Message(role="assistant", content=parsed_resume)
        ]
    )

    # Save to MongoDB with update/replace logic
    try:
        result = await resume_collection.update_one(
            {"user_id": user.get("_id")},  # Find by user_id
            {"$set": example.model_dump()},      # Set the new data
            upsert=True                    # Insert if not found
        )

        if result.matched_count > 0:
            print(f"🔄 Existing resume updated for user {user.get('_id')}")
        else:
            print(f"🆕 New resume inserted for user {user.get('_id')}")

    except Exception as e:
        print("❌ Error inserting/updating in MongoDB:", e)
