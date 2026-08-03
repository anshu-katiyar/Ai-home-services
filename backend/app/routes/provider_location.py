from fastapi import APIRouter
from app.database import db
from app.models.provider_location import ProviderLocation
from bson import ObjectId

router = APIRouter(
    prefix="/provider-location",
    tags=["Provider Location"]
)

@router.put("/update")
def update_location(location: ProviderLocation):

    db.bookings.update_one(
        {
            "_id": ObjectId(location.booking_id)
        },
        {
            "$set": {
                "provider_latitude": location.latitude,
                "provider_longitude": location.longitude
            }
        }
    )

    return {
        "message": "Location Updated"
    }