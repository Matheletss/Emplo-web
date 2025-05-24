from fastapi import FastAPI, UploadFile, File, APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.resume_parser_api.parser.extract_text import extract_text_from_pdf
from api.resume_parser_api.parser.parse_resume import parse_resume
from api.authentication.auth import get_current_user
from api.authentication.models import ProfileWithToken
import os
import logging

router = APIRouter()
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/parse-resume")
async def parse_resume_api(file: UploadFile = File(...)):
    try:
        # Log the incoming request
        logger.info(f"Received file: {file.filename}, content_type: {file.content_type}")
        
        # Validate file type
        if file.content_type != "application/pdf":
            logger.error(f"Invalid file type: {file.content_type}")
            return JSONResponse(
                status_code=400,
                content={"error": "Only PDF files are supported"}
            )

        # Create temp directory if it doesn't exist
        os.makedirs("/tmp", exist_ok=True)
        
        # Save uploaded PDF temporarily
        pdf_path = f"/tmp/{file.filename}"
        try:
            content = await file.read()
            with open(pdf_path, "wb") as f:
                f.write(content)
            logger.info(f"File saved successfully at {pdf_path}")
        except Exception as e:
            logger.error(f"Error saving file: {str(e)}")
            return JSONResponse(
                status_code=500,
                content={"error": "Failed to save uploaded file"}
            )

        try:
            # Extract text from PDF
            text = extract_text_from_pdf(pdf_path)
            if not text:
                logger.error("No text extracted from PDF")
                return JSONResponse(
                    status_code=400,
                    content={"error": "Could not extract text from PDF"}
                )
            logger.info("Successfully extracted text from PDF")

            # Parse the resume text
            parsed_data = parse_resume(text)
            if not parsed_data:
                logger.error("Failed to parse resume text")
                return JSONResponse(
                    status_code=400,
                    content={"error": "Could not parse resume content"}
                )
            logger.info("Successfully parsed resume data")

            return JSONResponse(content=parsed_data)
        finally:
            # Clean up temporary file
            try:
                os.remove(pdf_path)
                logger.info(f"Cleaned up temporary file: {pdf_path}")
            except Exception as e:
                logger.error(f"Error cleaning up file: {str(e)}")

    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": f"An unexpected error occurred: {str(e)}"}
        )



