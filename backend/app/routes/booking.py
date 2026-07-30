from fastapi import APIRouter
from app.models.booking import Booking
from app.services.booking_service import ( create_booking, get_all_bookings)
from fastapi import Depends
from app.dependencies.auth import get_current_user
from app.services.booking_service import (
    create_booking,
    get_bookings_by_email,
    cancel_booking
)




router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)

@router.post("/")
def add_booking(
    booking: Booking,
    user=Depends(get_current_user)
):

    print(user)

    data = booking.model_dump()

    data["customer_email"] = user["email"]

    booking_id = create_booking(data)

    return {
        "message": "Booking Created",
        "booking_id": booking_id
    }

@router.get("/")
def fetch_bookings(
    user=Depends(get_current_user)
):

    return get_bookings_by_email(
        user["email"]
    )

@router.put("/cancel/{booking_id}")
def cancel_booking_route(
    booking_id: str,
    user=Depends(get_current_user)
):

    count = cancel_booking(booking_id)

    if count == 0:

        return {
            "message": "Booking not found"
        }

    return {
        "message": "Booking Cancelled Successfully"
    }