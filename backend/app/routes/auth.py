from fastapi import APIRouter, HTTPException
from app.models.user import UserSignup
from app.database import users_collection
from app.utils.security import hash_password
from app.models.login import UserLogin
from app.utils.security import verify_password
from app.utils.jwt_handler import create_access_token



router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserSignup):

    # Check existing email
    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    # Prepare data
    user_data = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role
    }

    # Save to MongoDB
    users_collection.insert_one(user_data)

    return {
        "message": "Signup Successful"
    }


@router.post("/login")
def login(user: UserLogin):

    print("Login Email:", user.email)

    db_user = users_collection.find_one(
        {"email": user.email}
    )
    print("Database User:", db_user)

    if db_user:
     print(
        "Password Match:",
        verify_password(
            user.password,
            db_user["password"]
        )
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "email": db_user["email"],
            "role": db_user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": db_user["role"]
    }