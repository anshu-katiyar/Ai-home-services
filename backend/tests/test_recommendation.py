from unittest.mock import patch, MagicMock

from app.services.recommendation_service import recommend_providers
from app.services.recommendation_evaluation import evaluate_ranking
from app.services.recommendation_data_audit import audit_recommendation_data


VALID_SERVICE_ID = "507f1f77bcf86cd799439011"


def create_fake_service():
    return {
        "_id": VALID_SERVICE_ID,
        "name": "AC Repair",
        "category": "AC Service",
        "is_available": True,
    }


def create_fake_provider(
    provider_id="507f1f77bcf86cd799439012",
    email="provider@example.com",
    full_name="Test Provider",
    service_categories=None,
    skills=None,
):
    return {
        "_id": provider_id,
        "email": email,
        "full_name": full_name,
        "role": "provider",
        "service_categories": (
            service_categories if service_categories is not None
            else ["AC Service"]
        ),
        "skills": skills if skills is not None else ["AC Repair"],
        "is_available": True,
    }


def create_fake_db(providers=None, bookings=None, reviews=None):
    fake_db = MagicMock()

    fake_db.services.find_one.return_value = create_fake_service()
    fake_db.users.find.return_value = providers or []
    fake_db.bookings.find.return_value = bookings or []
    fake_db.reviews.find.return_value = reviews or []

    return fake_db


def test_no_providers_returns_empty_list():
    fake_db = create_fake_db(providers=[])

    with patch("app.services.recommendation_service.db", fake_db):
        result = recommend_providers(VALID_SERVICE_ID)

    assert result == []

def test_provider_without_completed_bookings_uses_fallback():
    provider = create_fake_provider()

    bookings = [
        {
            "_id": "booking-1",
            "service_id": VALID_SERVICE_ID,
            "provider_email": provider["email"],
            "status": "Pending",
        }
    ]

    fake_db = create_fake_db(
        providers=[provider],
        bookings=bookings,
        reviews=[],
    )

    with patch("app.services.recommendation_service.db", fake_db):
        result = recommend_providers(VALID_SERVICE_ID)

    assert len(result) == 1
    assert result[0]["completed_bookings"] == 0
    assert result[0]["recommendation_type"] == "new_provider_fallback"


def test_provider_without_reviews_is_still_ranked():
    provider = create_fake_provider()

    bookings = [
        {
            "_id": "booking-1",
            "service_id": VALID_SERVICE_ID,
            "provider_email": provider["email"],
            "customer_email": "customer@example.com",
            "status": "Completed",
        }
    ]

    fake_db = create_fake_db(
        providers=[provider],
        bookings=bookings,
        reviews=[],
    )

    with patch("app.services.recommendation_service.db", fake_db):
        result = recommend_providers(VALID_SERVICE_ID)

    assert len(result) == 1
    assert result[0]["completed_bookings"] == 1
    assert result[0]["verified_reviews_used"] == 0
    assert result[0]["average_rating"] == 0


def test_recommendations_are_sorted_by_score():
    low_provider = create_fake_provider(
        provider_id="507f1f77bcf86cd799439013",
        email="low@example.com",
        full_name="Lower Rated Provider",
    )

    high_provider = create_fake_provider(
        provider_id="507f1f77bcf86cd799439014",
        email="high@example.com",
        full_name="Higher Rated Provider",
    )

    bookings = [
        {
            "_id": "booking-low",
            "service_id": VALID_SERVICE_ID,
            "provider_email": "low@example.com",
            "customer_email": "customer1@example.com",
            "status": "Completed",
        },
        {
            "_id": "booking-high",
            "service_id": VALID_SERVICE_ID,
            "provider_email": "high@example.com",
            "customer_email": "customer2@example.com",
            "status": "Completed",
        },
    ]

    reviews = [
        {
            "booking_id": "booking-low",
            "provider_id": "507f1f77bcf86cd799439013",
            "customer_email": "customer1@example.com",
            "rating": 2,
        },
        {
            "booking_id": "booking-high",
            "provider_id": "507f1f77bcf86cd799439014",
            "customer_email": "customer2@example.com",
            "rating": 5,
        },
    ]

    fake_db = create_fake_db(
        providers=[low_provider, high_provider],
        bookings=bookings,
        reviews=reviews,
    )

    def bookings_for_provider(query):
        return [
            booking
            for booking in bookings
            if booking["provider_email"] == query["provider_email"]
        ]

    def reviews_for_provider(query):
        return [
            review
            for review in reviews
            if review["provider_id"] == query["provider_id"]
        ]

    fake_db.bookings.find.side_effect = bookings_for_provider
    fake_db.reviews.find.side_effect = reviews_for_provider

    with patch("app.services.recommendation_service.db", fake_db):
        result = recommend_providers(VALID_SERVICE_ID)

    assert len(result) == 2
    assert result[0]["recommendation_score"] >= result[1]["recommendation_score"]
    assert result[0]["provider_id"] == "507f1f77bcf86cd799439014"


def test_evaluation_reports_sorted_scores():
    recommendations = [
        {"recommendation_score": 80, "verified_reviews_used": 2},
        {"recommendation_score": 50, "verified_reviews_used": 0},
    ]

    report = evaluate_ranking(recommendations)

    assert report["providers_recommended"] == 2
    assert report["scores_in_descending_order"] is True
    assert report["providers_with_verified_reviews"] == 1
    assert report["average_recommendation_score"] == 65


def test_data_audit_returns_expected_fields():
    fake_db = MagicMock()

    fake_db.users.find.return_value = [
        {"email": "provider@example.com"}
    ]

    fake_db.bookings.find.return_value = [
        {
            "_id": "booking-1",
            "status": "Completed",
            "provider_email": "provider@example.com",
        }
    ]

    fake_db.reviews.find.return_value = [
        {"booking_id": "booking-1"}
    ]

    with patch("app.services.recommendation_data_audit.db", fake_db):
        report = audit_recommendation_data()

    assert report["total_providers"] == 1
    assert report["total_bookings"] == 1
    assert report["completed_bookings"] == 1
    assert report["reviews_linked_to_completed_booking"] == 1


def test_matching_new_provider_is_recommended():
    provider = create_fake_provider(
        full_name="New AC Provider",
    )

    fake_db = create_fake_db(
        providers=[provider],
        bookings=[],
        reviews=[],
    )

    with patch("app.services.recommendation_service.db", fake_db):
        result = recommend_providers(VALID_SERVICE_ID)

    assert len(result) == 1
    assert result[0]["provider_name"] == "New AC Provider"
    assert result[0]["recommendation_type"] == "new_provider_fallback"
    assert result[0]["completed_bookings"] == 0