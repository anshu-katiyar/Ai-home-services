from fastapi import APIRouter
from app.database import db

router = APIRouter(
    prefix="/provider",
    tags=["Provider"]
)


@router.get("/bookings")
def provider_bookings():

    bookings = list(db.bookings.find())

    data = []

    for booking in bookings:

        booking["id"] = str(booking["_id"])
        del booking["_id"]

        data.append(booking)

    return data