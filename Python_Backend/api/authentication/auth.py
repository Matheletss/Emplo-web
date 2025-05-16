from fastapi import APIRouter, HTTPException, Depends
import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.models import Profile
from app.db import profiles_collection
from api.authentication.models import ProfileWithToken, ProfileUpdate
import logging

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
    
    profiles_collection.insert_one(profile_dict)
    
    # Create JWT token right after signup
    access_token = create_access_token(data={"sub": profile.email})
    
    return ProfileWithToken(email=profile.email, access_token=access_token)

@router.post("/login", response_model=ProfileWithToken)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = profiles_collection.find_one({"email": form_data.username})

    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Check password
    if not bcrypt.checkpw(form_data.password.encode('utf-8'), user['password'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user['email']})

    return ProfileWithToken(email=user['email'], access_token=access_token)

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

@router.put("/profile", response_model=Profile)
async def update_profile(
    profile_update: ProfileUpdate,
    token: str = Depends(oauth2_scheme),
):
    # Decode token to get user's email
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

    update_data = profile_update.dict(exclude_unset=True)

    # If password is being updated, hash it
    if "password" in update_data:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(update_data["password"].encode("utf-8"), salt).decode("utf-8")
        update_data["password"] = hashed_password

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    # Update the profile in DB
    profiles_collection.update_one({"email": email}, {"$set": update_data})

    # Fetch the updated user
    updated_user = profiles_collection.find_one({"email": email})

    # Prepare the response dict
    user_data = {
        "id": str(updated_user["_id"]),
        "user_id": updated_user.get("user_id"),
        "name": updated_user.get("name"),
        "email": updated_user.get("email"),
        "skills": updated_user.get("skills"),
        "experience": updated_user.get("experience"),
        "projects": updated_user.get("projects"),
        "miscellaneous": updated_user.get("miscellaneous")
    }

    return user_data