import os
import json
import logging
from fastapi import APIRouter, HTTPException, Depends, UploadFile
from fastapi import status, File, Form
from api.ai_interviewer_backend.app.core.gpt_client import generate_greeting, generate_followup, generate_thank_you
from models.schema import UserResponseRequest, AskRequest, InterviewState
from config import MAX_INTERVIEW_QUESTIONS
from app.db import transcripts_collection
from datetime import datetime
from bson import ObjectId as PyObjectId
from bson import Binary
from api.authentication.auth import get_current_user 
from models.profile import Profile
from fastapi import Request
import base64
from api.ai_interviewer_backend.app.api.stt import transcribe_audio
from uuid import uuid4
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

def load_resume():
    try:
        resume_path = os.path.join(os.path.dirname(__file__), '..', 'core', 'data', 'resume.json')
        logger.info(f"Attempting to load resume from: {resume_path}")
        with open(resume_path, "r") as f:
            resume = json.load(f)
        logger.info("Resume loaded successfully")
        return resume
    except Exception as e:
        logger.error(f"Error loading resume: {e}")
        raise HTTPException(status_code=500, detail=f"Could not load resume: {e}")

def load_job_description():
    try:
        jd_path = os.path.join(os.path.dirname(__file__), '..', 'core', 'data', 'job_description.txt')
        logger.info(f"Attempting to load job description from: {jd_path}")
        with open(jd_path, "r") as f:
            jd = f.read()
        logger.info("Job description loaded successfully")
        return jd
    except Exception as e:
        logger.error(f"Error loading job description: {e}")
        raise HTTPException(status_code=500, detail=f"Could not load job description: {e}")

@router.get("/start")
async def start_interview():
    try:
        resume = load_resume()
        name = resume.get("name", "Candidate")
        greeting = generate_greeting(name)

        logger.info(f"Interview started for candidate: {name}")
        return {
            "greeting": greeting,
            "state": {
                "question_count": 0,
                "conversation_history": [],
                "is_interview_complete": False
            }
        }
    except Exception as e:
        logger.error(f"Error starting interview: {e}")
        raise HTTPException(status_code=500, detail=f"Could not start interview: {e}")
    
@router.post("/ask")
async def ask_question(
    request: AskRequest,
    user: Profile = Depends(get_current_user)  # ⬅️ current user injected
):
    try:
        # Load context
        with open("api/ai_interviewer_backend/app/core/data/resume.json", "r") as f:
            resume = json.load(f)

        with open("api/ai_interviewer_backend/app/core/data/job_description.txt", "r") as f:
            jd = f.read()

        # Assign a new interview ID if not provided
        interview_id = request.state.interview_id
        print(f"Interview ID: {interview_id}, User ID:", user['id'])
        
        existing_doc = await transcripts_collection.find_one({"interview_id": interview_id})
        if not existing_doc:
            await transcripts_collection.insert_one({
                "user_id": str(user["id"]),
                "interview_id": interview_id,
                "question_count": 0,
                "conversation": [],
                "is_interview_complete": False,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            })

        # Check for end of interview
        if request.state.question_count >= MAX_INTERVIEW_QUESTIONS:
            thank_you_message = generate_thank_you(resume.get("name", "Candidate"))

            await transcripts_collection.update_one(
                {"interview_id": interview_id},
                {"$set": {
                    "is_interview_complete": True,
                    "completed_at": datetime.utcnow().isoformat()
                }},
                upsert=True
            )

            return {
                "question": thank_you_message,
                "state": {
                    "question_count": request.state.question_count,
                    "conversation_history": request.state.conversation_history,
                    "is_interview_complete": True
                }
            }

        # Generate follow-up question
        followup = generate_followup(
            resume=json.dumps(resume, indent=2),
            job_description=jd,
            user_response=request.user_response,
            conversation_history=request.state.conversation_history
        )

        # Append to conversation history
        new_conversation_history = request.state.conversation_history + [
            {"role": "user", "content": request.user_response},
            {"role": "assistant", "content": followup}
        ]

        # Save or update MongoDB document
        await transcripts_collection.update_one(
            {"interview_id": interview_id},
            {
                "$set": {
                    "user_id": str(user["id"]),
                    "interview_id": interview_id,
                    "question_count": request.state.question_count + 1,
                    "updated_at": datetime.utcnow().isoformat(),
                    "is_interview_complete": False
                },
                "$setOnInsert": {
                    "created_at": datetime.utcnow().isoformat()
                },
                "$push": {
                    "conversation": {
                        "$each": [
                            {"role": "user", "content": request.user_response},
                            {"role": "assistant", "content": followup}
                        ]
                    }
                }
            }
        )

        return {
            "question": followup,
            "state": {
                "question_count": request.state.question_count + 1,
                "conversation_history": new_conversation_history,
                "is_interview_complete": False
            }
        }

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# @router.post("/ask")
# async def ask_question(request: AskRequest,  user: Profile = Depends(get_current_user)):
#     try:
#         # Load context
#         with open("api/ai_interviewer_backend/app/core/data/resume.json", "r") as f:
#             resume = json.load(f)

#         with open("api/ai_interviewer_backend/app/core/data/job_description.txt", "r") as f:
#             jd = f.read()

#         # Check end of interview
#         if request.state.question_count >= MAX_INTERVIEW_QUESTIONS:
#             thank_you_message = generate_thank_you(resume.get("name", "Candidate"))
#             return {
#                 "question": thank_you_message,
#                 "state": {
#                     "question_count": request.state.question_count,
#                     "conversation_history": request.state.conversation_history,
#                     "is_interview_complete": True
#                 }
#             }

#         # Generate next question
#         followup = generate_followup(
#             resume=json.dumps(resume, indent=2),
#             job_description=jd,
#             user_response=request.user_response,
#             conversation_history=request.state.conversation_history
#         )

#         # Update conversation state
#         new_conversation_history = request.state.conversation_history + [
#             {"role": "user", "content": request.user_response},
#             {"role": "assistant", "content": followup}
#         ]

#         print(user["id"])
#         print("interview_id:", request.state.interview_id)
#         existing = await transcripts_collection.find_one({"interview_id": request.state.interview_id})
#         if not existing:
#             raise HTTPException(status_code=400, detail="Interview not found")
#         # ✅ Save to MongoDB
#         await transcripts_collection.update_one(
#     {"interview_id": request.state.interview_id},  # Use a consistent interview_id
#     {
#         "$set": {
#             "user_id": str(user["id"]),
#             "timestamp": datetime.utcnow().isoformat(),
#             "question_count": request.state.question_count + 1,
#             "conversation": new_conversation_history,
#         }
#     }
# )
#         return {
#             "question": followup,
#             "state": {
#                 "question_count": request.state.question_count + 1,
#                 "conversation_history": new_conversation_history,
#                 "is_interview_complete": False
#             }
#         }

#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


# @router.post("/ask")
# async def ask_question(
#     request_str: str = Form(...),
#     file: UploadFile = File(...),
#     user: Profile = Depends(get_current_user)
# ):
#     try:
#         # Parse JSON string to AskRequest model
#         request = AskRequest.parse_raw(request_str)
#         state = request.state

#         print(f"Received request: {state.interview_id}")

#         if not hasattr(state, "interview_id") or not state.interview_id:
#             interview_id = str(PyObjectId())
#         else:
#             interview_id = state.interview_id
        
#         # Step 1: Save incoming audio file to temp for STT
#         webm_path, webm_bytes = await save_webm_file(file)

#         # Step 2: Use your STT function to get transcript
#         stt_result = await transcribe_audio_file(webm_path)
#         user_response = stt_result["transcript"]
        
        


#         # Load resume and job description as before
#         with open("api/ai_interviewer_backend/app/core/data/resume.json", "r") as f:
#             resume = json.load(f)
#         with open("api/ai_interviewer_backend/app/core/data/job_description.txt", "r") as f:
#             jd = f.read()

#         # Check if interview complete
#         if state.question_count >= MAX_INTERVIEW_QUESTIONS:
#             thank_you_message = generate_thank_you(resume.get("name", "Candidate"))
#             return {
#                 "question": thank_you_message,
#                 "state": {
#                     "question_count": state.question_count,
#                     "conversation_history": state.conversation_history,
#                     "is_interview_complete": True
#                 }
#             }
            
#         # Generate next question text
#         followup = generate_followup(
#             resume=json.dumps(resume, indent=2),
#             job_description=jd,
#             user_response=user_response,
#             conversation_history=state.conversation_history
#         )

#         # Generate TTS audio bytes for followup question
#         tts_audio_bytes = text_to_speech(followup)  # your TTS function returning raw wav bytes

#         # Optionally encode TTS audio as base64 string to send in JSON
#         tts_audio_b64 = base64.b64encode(tts_audio_bytes).decode('utf-8')

#         # Update conversation history
#         new_conversation_history = state.conversation_history + [
#             {"role": "user", "content": user_response},
#             {"role": "assistant", "content": followup}
#         ]

#         # Save user audio, transcript and followup question/audio to MongoDB
#         # await transcripts_collection.insert_one({
#         #     "interview_id": str(PyObjectId()),
#         #     "user_id": str(user["id"]),
#         #     "timestamp": datetime.utcnow().isoformat(),
#         #     "question_count": state.question_count + 1,
#         #     "conversation": new_conversation_history,
#         #     "user_audio": {
#         #         "filename": file.filename,
#         #         "content_type": file.content_type,
#         #         "data": Binary(webm_bytes)  # you may want to save again or save from temp file
#         #     },
#         #     "user_transcript": user_response,
#         #     "assistant_text": followup,
#         #     "assistant_audio": Binary(tts_audio_bytes)
#         # })

#         await transcripts_collection.update_one(
#     {"interview_id": str(interview_id)},
#     {
#         "$set": {
#             "user_id": str(user["id"]),
#             "timestamp": datetime.utcnow().isoformat(),
#             "question_count": state.question_count + 1,
#             "conversation": new_conversation_history,
#             "user_audio": {
#                 "filename": file.filename,
#                 "content_type": file.content_type,
#                 "data": Binary(webm_bytes)
#             },
#             "user_transcript": user_response,
#             "assistant_text": followup,
#             "assistant_audio": Binary(tts_audio_bytes)
#         }
#     },
#     upsert=True
# )

#         # Return text question + TTS audio base64 string
#         return {
#             "question": followup,
#             "tts_audio_base64": tts_audio_b64,
#             "state": {
#                 "interview_id": str(interview_id),
#                 "question_count": state.question_count + 1,
#                 "conversation_history": new_conversation_history,
#                 "is_interview_complete": False
#             }
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
