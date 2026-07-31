from fastapi import APIRouter
from app.database import db

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