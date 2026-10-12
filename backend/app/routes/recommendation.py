
import logging
from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.dependencies.auth import get_current_user
from app.database import db
from app.services.recommendation_service import recommend_providers

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)

logger = logging.getLogger(__name__)


@router.get("/providers/{service_id}")
def get_provider_recommendations(
    service_id: str,
    user=Depends(get_current_user),
):
    # 1. Validate service ID
    if not ObjectId.is_valid(service_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid service ID",
        )

    # 2. Find the service
    service = db.services.find_one({
        "_id": ObjectId(service_id)
    })

    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found",
        )

    if service.get("is_available", True) is False:
        raise HTTPException(
            status_code=409,
            detail="This service is currently unavailable",
        )

    # 3. Generate recommendations
    recommendations = recommend_providers(service_id)

    # 4. Record what was shown and in which order
    impression = {
        "service_id": service_id,
        "customer_email": user.get("email"),
        "requested_at": datetime.now(timezone.utc),
        "recommendation_type": "history_based_baseline",
        "total_recommended": len(recommendations),
        "providers_shown": [
            {
                "provider_id": item["provider_id"],
                "position": position,
                "recommendation_score": item["recommendation_score"],
                "recommendation_type": item.get(
                    "recommendation_type",
                    "history_based",
                ),
            }
            for position, item in enumerate(
                recommendations,
                start=1,
            )
        ],
    }

    # Logging failure should not prevent recommendations
    # from being returned to the customer.
    try:
        db.recommendation_impressions.insert_one(impression)
    except Exception:
        logger.exception(
            "Failed to record recommendation impression"
        )

    # 5. Return the API response
    return {
        "service_id": service_id,
        "service_name": service.get("name", "Service"),
        "recommendation_type": "history_based_baseline",
        "total_recommended": len(recommendations),
        "recommendations": recommendations,
    }
