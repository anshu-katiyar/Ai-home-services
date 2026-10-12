
import logging

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.database import db
from app.models.review import Review
from app.dependencies.auth import get_current_user
from app.services.review_service import (
    create_review,
    get_provider_reviews,
)
from app.services.email_service import send_booking_email
from pymongo.errors import DuplicateKeyError




router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
)

logger = logging.getLogger(__name__)


@router.post("/")
async def add_review(
    review: Review,
    user=Depends(get_current_user),
):
    # 1. Validate IDs
    if not ObjectId.is_valid(review.booking_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid booking ID",
        )

    if not ObjectId.is_valid(review.provider_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid provider ID",
        )

    customer_email = user.get("email")

    if not customer_email:
        raise HTTPException(
            status_code=401,
            detail="Authenticated customer email is missing",
        )

    # 2. Find the booking
    booking = db.bookings.find_one({
        "_id": ObjectId(review.booking_id),
    })

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found",
        )

    # 3. Only the booking's customer can review it
    if booking.get("customer_email", "").strip().lower() != (
        customer_email.strip().lower()
    ):
        raise HTTPException(
            status_code=403,
            detail="You can only review your own booking",
        )

    # 4. Only completed bookings can be reviewed
    if str(booking.get("status", "")).strip().lower() != "completed":
        raise HTTPException(
            status_code=409,
            detail="Only completed bookings can be reviewed",
        )

    # 5. Review must match the assigned provider
    assigned_provider_id = str(booking.get("provider_id", ""))

    if assigned_provider_id:
        provider_matches = (
            assigned_provider_id == review.provider_id
        )
    else:
        # Legacy fallback for bookings that only store provider_email
        assigned_provider_email = booking.get("provider_email", "")
        requested_provider = db.users.find_one({
            "_id": ObjectId(review.provider_id),
            "role": "provider",
        })

        provider_matches = (
            requested_provider is not None
            and assigned_provider_email
            and requested_provider.get("email", "").strip().lower()
            == assigned_provider_email.strip().lower()
        )

    if not provider_matches:
        raise HTTPException(
            status_code=403,
            detail="This provider is not assigned to the booking",
        )

    # 6. Verify provider exists
    provider = db.users.find_one({
        "_id": ObjectId(review.provider_id),
        "role": "provider",
    })

    if not provider:
        raise HTTPException(
            status_code=404,
            detail="Provider not found",
        )

    # 7. Prevent duplicate reviews for the same booking
    existing_review = db.reviews.find_one({
        "booking_id": review.booking_id,
    })

    if existing_review:
        raise HTTPException(
            status_code=409,
            detail="This booking has already been reviewed",
        )

    # 8. Save trusted booking/customer data
    data = review.model_dump()
    data["booking_id"] = review.booking_id
    data["provider_id"] = review.provider_id
    data["customer_email"] = customer_email

    try:
        review_id = create_review(data)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=409,
        detail="This booking has already been reviewed",
    )

    # 9. Notify provider; email failure must not undo saved review
    email_sent = False
    provider_email = provider.get("email")

    if provider_email:
        subject = "New Customer Rating & Feedback - HomeAI"

        body = f"""
Hello {provider.get('full_name', 'Service Provider')},

You have received a new customer review on HomeAI.

Booking ID: {review.booking_id}
Rating: {review.rating}/5

Customer Feedback:
{review.review or 'No written feedback provided'}

Please check your HomeAI Provider Dashboard.

Regards,
HomeAI Team
"""

        try:
            await send_booking_email(
                email=provider_email,
                subject=subject,
                body=body,
            )
            email_sent = True
        except Exception:
            logger.exception(
                "Failed to send review notification email"
            )

    return {
        "message": "Review saved successfully",
        "review_id": review_id,
        "email_sent": email_sent,
    }


@router.get("/{provider_id}")
def provider_reviews(provider_id: str):
    if not ObjectId.is_valid(provider_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid provider ID",
        )

    return get_provider_reviews(provider_id)
