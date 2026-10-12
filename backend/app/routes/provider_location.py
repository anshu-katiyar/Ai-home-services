
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.database import db
from app.models.provider_location import ProviderLocation
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/provider-location",
    tags=["Provider Location"]
)


@router.put("/update")
def update_location(
    location: ProviderLocation,
    user=Depends(get_current_user)
):
    if user.get("role") != "provider":
        raise HTTPException(
            status_code=403,
            detail="Only providers can update location"
        )

    if not ObjectId.is_valid(location.booking_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid booking ID"
        )

    if not (-90 <= location.latitude <= 90):
        raise HTTPException(
            status_code=400,
            detail="Invalid latitude"
        )

    if not (-180 <= location.longitude <= 180):
        raise HTTPException(
            status_code=400,
            detail="Invalid longitude"
        )

    result = db.bookings.update_one(
        {
            "_id": ObjectId(location.booking_id),
            "provider_email": user.get("email")
        },
        {
            "$set": {
                "provider_latitude": location.latitude,
                "provider_longitude": location.longitude
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Booking not found or not assigned to you"
        )

    return {
        "message": "Location updated successfully"
    }
