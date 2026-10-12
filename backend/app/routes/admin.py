from fastapi import APIRouter
from app.database import db

from bson import ObjectId

from app.services.notification_service import create_notification

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

        # Fetch service details using service_id
        service = None

        try:
            service_id = booking.get("service_id")

            if service_id and ObjectId.is_valid(service_id):
                service = db.services.find_one({
                    "_id": ObjectId(service_id)
                })

        except Exception as error:
            print("Service lookup error:", error)

        if service:
            service["id"] = str(service["_id"])
            del service["_id"]

            # Provide fields expected by AdminDashboard.jsx
            booking["service"] = service
            booking["service_name"] = service.get("name", "Service")
            booking["service_price"] = service.get("price")
            booking["amount"] = booking.get(
                "amount",
                service.get("price")
            )
        else:
            booking["service"] = None
            booking["service_name"] = "Service details unavailable"
            booking["service_price"] = None
            booking["amount"] = booking.get("amount")

        data.append(booking)

    return data

@router.put("/assign-provider/{booking_id}")
def assign_provider(booking_id: str, data: dict):

    provider = db.users.find_one({
        "_id": ObjectId(data["provider_id"])
    })

    if not provider:
        return {"message": "Provider not found"}

    # Update booking
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

    # Create notification
    create_notification(
        provider["email"],
        "New Booking",
        f"You have received a new booking. Booking ID: {booking_id}"
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