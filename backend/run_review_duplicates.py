
from pprint import pprint

from app.database import db


def find_duplicate_reviews():
    pipeline = [
        {
            "$group": {
                "_id": "$booking_id",
                "count": {"$sum": 1},
                "reviews": {
                    "$push": {
                        "review_id": {"$toString": "$_id"},
                        "provider_id": "$provider_id",
                        "customer_email": "$customer_email",
                        "rating": "$rating",
                        "review": "$review",
                    }
                },
            }
        },
        {
            "$match": {
                "_id": {"$ne": None},
                "count": {"$gt": 1},
            }
        },
        {"$sort": {"count": -1}},
    ]

    duplicates = list(db.reviews.aggregate(pipeline))

    print("\nHomeAI Duplicate Review Audit")
    print("Duplicate booking groups:", len(duplicates))

    if not duplicates:
        print("No duplicate booking IDs found.")
        return

    for item in duplicates:
        print("\nBooking ID:", item["_id"])
        print("Review count:", item["count"])
        pprint(item["reviews"])


if __name__ == "__main__":
    find_duplicate_reviews()
