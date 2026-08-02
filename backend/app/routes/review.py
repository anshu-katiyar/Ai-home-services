from fastapi import APIRouter, Depends

from app.models.review import Review
from app.services.review_service import create_review
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)

@router.post("/")
def add_review(

    review: Review,

    user=Depends(get_current_user)

):

    data = review.model_dump()

    data["customer_email"] = user["email"]

    review_id = create_review(data)

    return {

        "message": "Review Added Successfully",

        "review_id": review_id

    }