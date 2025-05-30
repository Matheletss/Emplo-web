import os
import uuid
import subprocess
import requests
import tempfile
from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from api.authentication.auth import get_current_user
from dotenv import load_dotenv
from typing import Tuple
from fastapi.responses import FileResponse

load_dotenv()

router = APIRouter()

SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")

async def save_webm_file(file: UploadFile) -> Tuple[str, bytes]:
    file_bytes = await file.read()
    temp_dir = tempfile.gettempdir()
    file_path = os.path.join(temp_dir, f"{uuid.uuid4()}.webm")
    with open(file_path, "wb") as f:
        f.write(file_bytes)
    print(f"Saved file to: {file_path}, exists: {os.path.exists(file_path)}")
    return file_path, file_bytes

async def transcribe_audio_file(filepath: str) -> str:
    try:
        wav_path = filepath.replace(".webm", ".wav")

        # Step 2: Convert to 16kHz mono wav using ffmpeg
        subprocess.run([
            "ffmpeg", "-y", "-i", filepath,
            "-ar", "16000", "-ac", "1", wav_path
        ], check=True)

        # Step 3: Send to Sarvam
        with open(wav_path, "rb") as wav_file:
            response = requests.post(
                "https://api.sarvam.ai/speech-to-text",
                headers={"api-subscription-key": SARVAM_API_KEY},
                files={"file": ("audio.wav", wav_file, "audio/wav")}
            )

        # Step 4: Cleanup
        os.remove(filepath)
        os.remove(wav_path)

        # Step 5: Return response
        if response.status_code == 200:
            return {"transcript": response.json().get("transcript")}
        else:
            return JSONResponse(content={"error": response.text}, status_code=500)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@router.post("/stt")
async def transcribe_audio(
    file: UploadFile = File(...)):
    try:
        webm_path, webm_bytes = await save_webm_file(file)
        print(f"Received file: {webm_path}")
        transcript = await transcribe_audio_file(webm_path)
        return {"transcript": transcript}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)