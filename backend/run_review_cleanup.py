
from app.database import db

BOOKING_ID = "6ac7f1393b324eed6affc4f9"

KEEP_REVIEW_ID = "6ac8709dc49126adf4c524b7"
DELETE_REVIEW_ID = "6accac851e70e398148b8553"


def cleanup_duplicate_review():
    keep = db.reviews.find_one({
        "_id": __import__("bson").ObjectId(KEEP_REVIEW_ID),
        "booking_id": BOOKING_ID,
    })

    duplicate = db.reviews.find_one({
        "_id": __import__("bson").ObjectId(DELETE_REVIEW_ID),
        "booking_id": BOOKING_ID,
    })

    if not keep or not duplicate:
        raise RuntimeError(
            "Review IDs or booking ID do not match. Nothing deleted."
        )

    if (
        keep.get("provider_id") != duplicate.get("provider_id")
        or keep.get("customer_email") != duplicate.get("customer_email")
    ):
        raise RuntimeError(
            "Review ownership differs. Nothing deleted."
        )

    print("Review to KEEP:", keep)
    print("Review to DELETE:", duplicate)

    confirmation = input(
        "\nType DELETE to remove only the empty duplicate review: "
    )

    if confirmation != "DELETE":
        print("Cancelled. No records deleted.")
        return

    if str(duplicate.get("review", "")).strip():
        raise RuntimeError(
            "Duplicate review is not empty. Nothing deleted."
        )

    result = db.reviews.delete_one({
        "_id": __import__("bson").ObjectId(DELETE_REVIEW_ID),
        "booking_id": BOOKING_ID,
        "review": "",
    })

    print("Deleted duplicate count:", result.deleted_count)


if __name__ == "__main__":
    cleanup_duplicate_review()
