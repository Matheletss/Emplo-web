from fastapi import FastAPI, File, UploadFile, APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from datetime import datetime
from api.resume_parser_llm_api.utils.pdf_extractor import extract_text_from_pdf
from api.resume_parser_llm_api.utils.preprocessor import structure_for_llm
from api.resume_parser_llm_api.utils.logger import save_training_example
from api.resume_parser_llm_api.utils.openai_parser import call_openai_parser 
from api.resume_parser_llm_api.utils.upload_to_s3 import upload_file_to_s3
from api.authentication.auth import get_current_user
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.post("/parser-resume/")
async def parse_resume(file: UploadFile = File(...), user=Depends(get_current_user)):
    try:
        # Create temp directory
        os.makedirs("temp", exist_ok=True)

        # Use a constant filename per user
        safe_filename = "resume.pdf"
        file_location = f"temp/{safe_filename}"

        # Save file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process file
        resume_text = await extract_text_from_pdf(file_location)
        structured_prompt = await structure_for_llm(resume_text)
        parsed_resume = await call_openai_parser(structured_prompt)

        # Store results
        await save_training_example(structured_prompt, parsed_resume, user)

        # Upload to S3 (overwrites existing file with same key)
        # s3_key = f"resumes/{user['email']}/resume.pdf"
        # s3_url = upload_file_to_s3(file_location, s3_key)

        return {
            "prompt_input": structured_prompt,
            "parsed_resume": parsed_resume,
            # "s3_url": s3_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Clean up
        if os.path.exists(file_location):
            os.remove(file_location)