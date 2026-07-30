from app.database import db
from bson import ObjectId


def create_booking(data):

    result = db.bookings.insert_one(data)

    return str(result.inserted_id)


def get_all_bookings():

    bookings = list(db.bookings.find())

    for booking in bookings:
        booking["id"] = str(booking["_id"])
        del booking["_id"]

    return bookings


def get_bookings_by_email(email):

    print("Searching Email:", email)

    bookings = list(
        db.bookings.find(
            {
                "customer_email": email
            }
        )
    )

    print("Bookings Found:", bookings)

    for booking in bookings:

        booking["id"] = str(booking["_id"])
        del booking["_id"]

        try:

            service = db.services.find_one(
                {
                    "_id": ObjectId(booking["service_id"])
                }
            )

            if service:

                service["id"] = str(service["_id"])
                del service["_id"]

                booking["service"] = service

            else:

                booking["service"] = None

        except Exception:

            print(f"Invalid service_id skipped: {booking['service_id']}")
            booking["service"] = None

    return bookings


def cancel_booking(booking_id):

    result = db.bookings.update_one(
        {
            "_id": ObjectId(booking_id)
        },
        {
            "$set": {
                "status": "Cancelled"
            }
        }
    )

    return result.modified_count