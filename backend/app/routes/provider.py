from fastapi import APIRouter
from bson import ObjectId
from app.database import db
from fastapi import Depends
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/provider",
    tags=["Provider"]
)


@router.get("/bookings")
def provider_bookings(current_user=Depends(get_current_user)):

    if current_user["role"] != "provider":
        return {
            "message": "Access Denied"
        }

    print("Current User:", current_user)

    bookings = list(
    db.bookings.find(
        {
            "provider_email": current_user["email"]
        }
    )
)
    print("Bookings:", bookings)

    data = []

    for booking in bookings:

        booking["id"] = str(booking["_id"])
        del booking["_id"]

        data.append(booking)

    return data


@router.put("/accept/{booking_id}")
def accept_booking(booking_id: str):

    result = db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": "Accepted"
            }
        }
    )

    return {
        "message": "Booking Accepted",
        "modified": result.modified_count
    }

@router.put("/reject/{booking_id}")
def reject_booking(booking_id: str):

    result = db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": "Rejected"
            }
        }
    )

    return {
        "message": "Booking Rejected",
        "modified": result.modified_count
    }

@router.put("/on-the-way/{booking_id}")
def on_the_way_booking(booking_id: str):

    result = db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": "On The Way"
            }
        }
    )

    return {
        "message": "Provider is on the way",
        "modified": result.modified_count
    }



@router.put("/complete/{booking_id}")
def complete_booking(booking_id: str):

    result = db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": "Completed"
            }
        }
    )

    return {
        "message": "Service Completed",
        "modified": result.modified_count
    }