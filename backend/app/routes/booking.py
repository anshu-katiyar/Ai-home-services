from fastapi import APIRouter, Depends

from app.models.booking import Booking
from app.dependencies.auth import get_current_user

from app.services.booking_service import (
    create_booking,
    get_bookings_by_email,
    cancel_booking
)

from app.services.email_service import send_booking_email


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


@router.post("/")
async def add_booking(
    booking: Booking,
    user=Depends(get_current_user)
):

    print(user)

    data = booking.model_dump()

    data["customer_email"] = user["email"]

    booking_id = create_booking(data)

    subject = "HomeAI - Booking Confirmed"

    body = f"""
Hello,

Your booking has been confirmed successfully.

Booking ID: {booking_id}

Address: {data['address']}

Date: {data['booking_date']}

Time: {data['booking_time']}

Thank you for choosing HomeAI.
"""

    await send_booking_email(
        user["email"],
        subject,
        body
    )

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