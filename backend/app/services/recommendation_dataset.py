
from app.database import db


def build_recommendation_dataset():
    """
    Build one row per provider-service combination.
    Review ratings are used only when linked to a completed
    booking belonging to the same provider and customer.
    """

    bookings = list(db.bookings.find({}))
    reviews = list(db.reviews.find({}))

    # Index reviews by booking ID for efficient lookup
    reviews_by_booking = {}

    for review in reviews:
        booking_id = str(review.get("booking_id", ""))

        if booking_id:
            reviews_by_booking.setdefault(booking_id, []).append(review)

    dataset = {}

    for booking in bookings:
        service_id = str(booking.get("service_id", ""))
        provider_id = str(booking.get("provider_id", ""))
        provider_email = booking.get("provider_email", "")

        if not service_id or not provider_id or not provider_email:
            continue

        key = (service_id, provider_id)

        if key not in dataset:
            dataset[key] = {
                "service_id": service_id,
                "provider_id": provider_id,
                "provider_email": provider_email,
                "provider_name": booking.get(
                    "provider_name", "Provider"
                ),
                "total_bookings": 0,
                "completed_bookings": 0,
                "cancelled_bookings": 0,
                "paid_bookings": 0,
                "verified_ratings": [],
            }

        row = dataset[key]
        row["total_bookings"] += 1

        status = str(booking.get("status", "")).strip().lower()
        payment_status = str(
            booking.get("payment_status", "")
        ).strip().lower()

        if status == "completed":
            row["completed_bookings"] += 1

            booking_id = str(booking.get("_id", ""))
            booking_customer = booking.get("customer_email")
            booking_provider = str(booking.get("provider_id", ""))

            for review in reviews_by_booking.get(booking_id, []):
                review_provider = str(review.get("provider_id", ""))
                review_customer = review.get("customer_email")
                rating = review.get("rating")

                if (
                    review_provider == booking_provider
                    and review_customer == booking_customer
                    and isinstance(rating, (int, float))
                    and not isinstance(rating, bool)
                    and 1 <= rating <= 5
                ):
                    row["verified_ratings"].append(float(rating))

        if status in {"cancelled", "canceled", "rejected"}:
            row["cancelled_bookings"] += 1

        if payment_status == "paid":
            row["paid_bookings"] += 1

    result = []

    for row in dataset.values():
        total = row["total_bookings"]
        ratings = row["verified_ratings"]

        row["cancellation_rate"] = round(
            row["cancelled_bookings"] / total, 4
        ) if total else 0.0

        row["completion_rate"] = round(
            row["completed_bookings"] / total, 4
        ) if total else 0.0

        row["verified_review_count"] = len(ratings)

        row["average_verified_rating"] = round(
            sum(ratings) / len(ratings), 2
        ) if ratings else None

        # Keep the feature dataset compact; individual ratings
        # are not needed once the aggregate has been calculated.
        del row["verified_ratings"]

        result.append(row)

    return result