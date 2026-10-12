
from fastapi import APIRouter, Depends, HTTPException

from app.database import db
from app.dependencies.auth import get_current_user
from app.models.provider_profile import ProviderProfile

router = APIRouter(
    prefix="/provider-profile",
    tags=["Provider Profile"]
)


@router.get("/me")
def get_my_profile(user=Depends(get_current_user)):
    if user.get("role") != "provider":
        raise HTTPException(
            status_code=403,
            detail="Only providers can access this profile"
        )

    profile = db.users.find_one(
        {"email": user["email"]},
        {
            "_id": 0,
            "full_name": 1,
            "email": 1,
            "role": 1,
            "service_categories": 1,
            "skills": 1,
            "is_available": 1
        }
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Provider not found"
        )

    profile.setdefault("service_categories", [])
    profile.setdefault("skills", [])
    profile.setdefault("is_available", True)

    return profile


@router.put("/me")
def update_my_profile(
    profile: ProviderProfile,
    user=Depends(get_current_user)
):
    if user.get("role") != "provider":
        raise HTTPException(
            status_code=403,
            detail="Only providers can update this profile"
        )

    result = db.users.update_one(
        {"email": user["email"], "role": "provider"},
        {"$set": profile.model_dump()}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Provider not found"
        )

    return {"message": "Provider profile updated successfully"}
