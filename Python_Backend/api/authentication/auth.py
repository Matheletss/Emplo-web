from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, status
import bcrypt
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from models.profile import Profile as Profile
from models.employer_profile import EmployerProfile as EmployerProfile
from app.db import profiles_collection
from api.authentication.models import ProfileWithToken, ProfileUpdate
from api.resume_parser_api.parser.extract_text import extract_text_from_pdf
from api.resume_parser_api.parser.parse_resume import parse_resume
from api.authentication.models import LoginRequest
import os
import logging
from typing import Optional

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

logger = logging.getLogger(__name__)

JWT_SECRET = "MayukhsSecretKey"
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_email: str = payload.get("sub")
        if user_email is None:
            raise credentials_exception

        print(f"Authenticated user email: {user_email}")
        # Optionally get more info about user or just return the id
        user = {"email": user_email}  
    except PyJWTError:
        raise credentials_exception
    return user

# @router.post("/api/profile")
# async def upsert_profile(profile: Profile, user: dict = Depends(get_current_user)):
#     user_email = user["email"]
#     print(f"Authenticated user email: {user_email}")
#     if profile.email != user_email:
#         raise HTTPException(status_code=403, detail="You can only update your own profile")
    
#     # Ensure the update is scoped to this user only
#     profiles_collection.update_one(
#         {"email": user_email},  # match the user's own profile
#         {"$set": profile.model_dump()},
#         upsert=True
#     )
#     return {"message": "Profile upserted"}

# Create a new profile
@router.post("/profile", response_model=ProfileWithToken)
async def create_profile(profile: Profile):
    if profile.password is None:
        raise HTTPException(status_code=400, detail="Password cannot be None")

    existing_profile = profiles_collection.find_one({"email": profile.email})
    if existing_profile:
        raise HTTPException(status_code=400, detail="A profile with this email already exists.")
    
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(profile.password.encode('utf-8'), salt).decode('utf-8')
    
    profile_dict = profile.model_dump(by_alias=True)
    profile_dict["password"] = hashed_password
    
    result = profiles_collection.insert_one(profile_dict)
    
    # Create JWT token right after signup
    access_token = create_access_token(data={"sub": profile.email})

    return ProfileWithToken(
        id=str(result.inserted_id),  # convert ObjectId to string for JSON
        user=profile.name or profile.email,
        email=profile.email,
        access_token=access_token,
        token_type="bearer"
    )
# Login endpoint
@router.post("/login", response_model=ProfileWithToken)
async def login(request: LoginRequest):
    user = profiles_collection.find_one({"email": request.email})

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Check password
    if not bcrypt.checkpw(request.password.encode('utf-8'), user['password'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": user['email']})

    return ProfileWithToken(id=str(user['_id']), user=user['name'], email=user['email'], access_token=access_token)

# Get the current user's profile
@router.get("/me", response_model=Profile)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    user = profiles_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Convert ObjectId to str and filter fields
    user_data = {
        "id": str(user["_id"]),
        "user_id": user.get("user_id"),
        "name": user.get("name"),
        "email": user.get("email"),
        "skills": user.get("skills"),
        "experience": user.get("experience"),
        "projects": user.get("projects"),
        "miscellaneous": user.get("miscellaneous"),
        "created_at": user.get("created_at"),
        "updated_at": user.get("updated_at"),
    }
    return user_data

# Update the current user's profile
@router.put("/api/profile")
async def upsert_profile(profile: Profile, user=Depends(get_current_user)):
    if profile.email != user["email"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    existing_profile = profiles_collection.find_one({"email": profile.email})

    now_str = datetime.utcnow().isoformat()
    profile_dict = profile.model_dump(by_alias=True)

    if not existing_profile:
        profile_dict["created_at"] = now_str
    profile_dict["updated_at"] = now_str
    
    profile_dict.pop("password", None)
    profile_dict.pop("_id", None)

    # Upsert profile (replace or insert)
    result = profiles_collection.update_one(
        {"email": profile.email},
        {"$set": profile_dict},
        upsert=True
    )

    if result.upserted_id or result.modified_count:
        return {"message": "Profile updated successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to update profile")
    
# # Update profile from resume
# @router.put("/profile/resume", response_model=Profile)
# async def update_profile_from_resume(
#     file: UploadFile = File(...),
#     token: str = Depends(oauth2_scheme),
# ):
#     if file.content_type != "application/pdf":
#         raise HTTPException(status_code=400, detail="Only PDF files are supported")

#     # Decode JWT and get email (reuse your logic)
#     try:
#         payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
#         email = payload.get("sub")
#         if email is None:
#             raise HTTPException(status_code=401, detail="Could not validate credentials")
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail="Could not validate credentials")

#     user = profiles_collection.find_one({"email": email})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # Save file temporarily
#     os.makedirs("/tmp", exist_ok=True)
#     pdf_path = f"/tmp/{file.filename}"
#     try:
#         content = await file.read()
#         with open(pdf_path, "wb") as f:
#             f.write(content)
#         logging.info(f"Saved file at {pdf_path}")

#         # Extract text from PDF (your existing function)
#         text = extract_text_from_pdf(pdf_path)
#         if not text:
#             raise HTTPException(status_code=400, detail="Could not extract text from PDF")

#         # Parse resume text (your existing function)
#         parsed_data = parse_resume(text)
#         if not parsed_data:
#             raise HTTPException(status_code=400, detail="Could not parse resume content")

#         # Validate parsed data using Pydantic ProfileUpdate
#         update_data = ProfileUpdate(**parsed_data).model_dump(exclude_unset=True)
#         if not update_data:
#             raise HTTPException(status_code=400, detail="No valid fields found in resume")

#         # Update MongoDB profile
#         profiles_collection.update_one({"email": email}, {"$set": update_data})

#         # Fetch updated user
#         updated_user = profiles_collection.find_one({"email": email})

#         # Prepare response dict (similar to your /profile PUT)
#         user_data = {
#             "id": str(updated_user["_id"]),
#             "user_id": updated_user.get("user_id"),
#             "name": updated_user.get("name"),
#             "email": updated_user.get("email"),
#             "skills": updated_user.get("skills"),
#             "experience": updated_user.get("experience"),
#             "projects": updated_user.get("projects"),
#             "miscellaneous": updated_user.get("miscellaneous"),
#         }
#         return user_data

#     finally:
#         try:
#             os.remove(pdf_path)
#             logging.info(f"Deleted temp file {pdf_path}")
#         except Exception as e:
#             logging.error(f"Failed to delete temp file: {e}")