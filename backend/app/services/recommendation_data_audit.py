
from app.database import db


def audit_recommendation_data():
    providers = list(
        db.users.find(
            {"role": "provider"},
            {"email": 1}
        )
    )

    bookings = list(db.bookings.find({}))
    reviews = list(db.reviews.find({}))

    completed = [
        b for b in bookings
        if b.get("status") == "Completed"
    ]

    assigned = [
        b for b in bookings
        if b.get("provider_email")
    ]

    reviewed_booking_ids = {
        str(r.get("booking_id"))
        for r in reviews
        if r.get("booking_id")
    }

    completed_ids = {
        str(b.get("_id"))
        for b in completed
    }

    return {
        "total_providers": len(providers),
        "total_bookings": len(bookings),
        "completed_bookings": len(completed),
        "assigned_bookings": len(assigned),
        "total_reviews": len(reviews),
        "reviews_linked_to_completed_booking": len(
            reviewed_booking_ids & completed_ids
        )
    }
