
from pymongo.errors import DuplicateKeyError

from app.database import db


def ensure_review_unique_index():
    """
    Allow only one review document per booking.
    Existing duplicate booking_id values must be cleaned first.
    """
    duplicate_groups = list(
        db.reviews.aggregate([
            {
                "$group": {
                    "_id": "$booking_id",
                    "count": {"$sum": 1},
                }
            },
            {
                "$match": {
                    "_id": {"$ne": None},
                    "count": {"$gt": 1},
                }
            },
            {"$limit": 10},
        ])
    )

    if duplicate_groups:
        raise RuntimeError(
            "Duplicate reviews already exist. Clean them before "
            "creating the unique index."
        )

    db.reviews.create_index(
        [("booking_id", 1)],
        unique=True,
        name="unique_review_per_booking",
        partialFilterExpression={"booking_id": {"$type": "string"}},
    )

    return "Unique review index created successfully"
