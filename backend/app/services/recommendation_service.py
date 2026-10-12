
from app.database import db


def recommend_providers(service_id: str):
    service = db.services.find_one({"_id": __import__(
        "bson"
    ).ObjectId(service_id)})

    if not service or service.get("is_available", True) is False:
        return []

    service_name = service.get("name", "").strip().lower()
    service_category = service.get("category", "").strip().lower()

    providers = list(db.users.find({"role": "provider"}))
    recommendations = []

    for provider in providers:
        if provider.get("is_available", True) is False:
            continue

        categories = [
            str(category).strip().lower()
            for category in provider.get("service_categories", [])
        ]

        skills = [
            str(skill).strip().lower()
            for skill in provider.get("skills", [])
        ]

        # New providers without history can still qualify
        category_match = (
            service_category in categories
            or service_name in skills
            or any(
                skill and skill in service_name
                for skill in skills
            )
        )

        if not category_match:
            continue

        email = provider.get("email")
        if not email:
            continue

        bookings = list(db.bookings.find({
            "service_id": service_id,
            "provider_email": email
        }))

        completed = [
            booking for booking in bookings
            if booking.get("status") == "Completed"
        ]

        cancelled = sum(
            1 for booking in bookings
            if booking.get("status") in ["Cancelled", "Rejected"]
        )

        provider_id = str(provider["_id"])

        completed_ids = {
            str(booking.get("_id"))
            for booking in completed
        }

        reviews = list(db.reviews.find({
            "provider_id": provider_id
        }))

        valid_ratings = []

        for review in reviews:
            matching_booking = next(
                (
                    booking for booking in completed
                    if str(booking.get("_id"))
                    == str(review.get("booking_id"))
                ),
                None
            )

            if (
                matching_booking
                and review.get("customer_email")
                == matching_booking.get("customer_email")
                and isinstance(review.get("rating"), (int, float))
                and 1 <= review["rating"] <= 5
            ):
                valid_ratings.append(review["rating"])

        average_rating = (
            sum(valid_ratings) / len(valid_ratings)
            if valid_ratings else 0
        )

        total = len(bookings)
        cancellation_rate = cancelled / total if total else 0

        rating_score = average_rating / 5 * 70
        experience_score = min(len(completed) / 10, 1) * 30
        penalty = cancellation_rate * 20

        score = round(
            max(0, min(100, rating_score + experience_score - penalty)),
            2
        )

        recommendations.append({
            "provider_id": provider_id,
            "provider_name": provider.get("full_name", "Provider"),
            "matched_category": service.get("category", ""),
            "completed_bookings": len(completed),
            "verified_reviews_used": len(valid_ratings),
            "average_rating": round(average_rating, 2),
            "recommendation_score": score,
            "recommendation_type": (
                "history_based"
                if completed else "new_provider_fallback"
            )
        })

    recommendations.sort(
        key=lambda item: item["recommendation_score"],
        reverse=True
    )

    return recommendations
