from fastapi import APIRouter
from app.database import db

from bson import ObjectId

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/bookings")
def get_all_bookings():

    bookings = list(db.bookings.find())

    data = []

    for booking in bookings:

        booking["id"] = str(booking["_id"])
        del booking["_id"]

        data.append(booking)

    return data

@router.put("/assign-provider/{booking_id}")
def assign_provider(booking_id: str, data: dict):

    provider = db.users.find_one({
        "_id": ObjectId(data["provider_id"])
    })

    if not provider:
        return {"message": "Provider not found"}

    db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {

                "provider_id": str(provider["_id"]),
               "provider_name": provider["full_name"],
                "provider_email": provider["email"]

            }
        }
    )

    return {
        "message": "Provider Assigned Successfully"
    }



@router.get("/providers")
def get_providers():

    providers = list(

        db.users.find(
            {
                "role": "provider"
            }
        )

    )

    data = []

    for provider in providers:

        provider["id"] = str(provider["_id"])
        del provider["_id"]

        data.append(provider)

    return data