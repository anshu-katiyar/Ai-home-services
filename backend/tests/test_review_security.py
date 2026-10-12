
import asyncio
from unittest.mock import MagicMock, AsyncMock, patch

import pytest
from fastapi import HTTPException

from app.models.review import Review
from app.routes.review import add_review


BOOKING_ID = "507f1f77bcf86cd799439011"
PROVIDER_ID = "507f1f77bcf86cd799439012"


def setup_fake_db(status="Completed", customer="customer@example.com"):
    fake_db = MagicMock()

    fake_db.bookings.find_one.return_value = {
        "_id": BOOKING_ID,
        "customer_email": customer,
        "provider_id": PROVIDER_ID,
        "provider_email": "provider@example.com",
        "status": status,
    }

    fake_db.users.find_one.return_value = {
        "_id": PROVIDER_ID,
        "role": "provider",
        "email": "provider@example.com",
        "full_name": "Test Provider",
    }

    fake_db.reviews.find_one.return_value = None

    return fake_db


def test_customer_can_review_own_completed_booking():
    fake_db = setup_fake_db()

    review = Review(
        booking_id=BOOKING_ID,
        provider_id=PROVIDER_ID,
        rating=5,
        review="Good service",
    )

    with (
        patch("app.routes.review.db", fake_db),
        patch("app.routes.review.create_review", return_value="review-1"),
        patch(
            "app.routes.review.send_booking_email",
            new_callable=AsyncMock,
        ),
    ):
        result = asyncio.run(
            add_review(review, user={"email": "customer@example.com"})
        )

    assert result["message"] == "Review saved successfully"
    assert result["review_id"] == "review-1"


def test_other_customer_cannot_review_booking():
    fake_db = setup_fake_db()

    review = Review(
        booking_id=BOOKING_ID,
        provider_id=PROVIDER_ID,
        rating=5,
    )

    with (
        patch("app.routes.review.db", fake_db),
        patch("app.routes.review.create_review") as save_review,
    ):
        with pytest.raises(HTTPException) as error:
            asyncio.run(
                add_review(
                    review,
                    user={"email": "attacker@example.com"},
                )
            )

    assert error.value.status_code == 403
    save_review.assert_not_called()


def test_pending_booking_cannot_be_reviewed():
    fake_db = setup_fake_db(status="Pending")

    review = Review(
        booking_id=BOOKING_ID,
        provider_id=PROVIDER_ID,
        rating=4,
    )

    with (
        patch("app.routes.review.db", fake_db),
        patch("app.routes.review.create_review") as save_review,
    ):
        with pytest.raises(HTTPException) as error:
            asyncio.run(
                add_review(review, user={"email": "customer@example.com"})
            )

    assert error.value.status_code == 409
    save_review.assert_not_called()


def test_duplicate_review_is_rejected():
    fake_db = setup_fake_db()
    fake_db.reviews.find_one.return_value = {
        "booking_id": BOOKING_ID,
        "rating": 5,
    }

    review = Review(
        booking_id=BOOKING_ID,
        provider_id=PROVIDER_ID,
        rating=5,
    )

    with (
        patch("app.routes.review.db", fake_db),
        patch("app.routes.review.create_review") as save_review,
    ):
        with pytest.raises(HTTPException) as error:
            asyncio.run(
                add_review(review, user={"email": "customer@example.com"})
            )

    assert error.value.status_code == 409
    save_review.assert_not_called()
