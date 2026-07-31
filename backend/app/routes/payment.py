from fastapi import APIRouter

from app.services.payment_service import create_order

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)

@router.post("/create-order")
def payment(data: dict):

    amount = data["amount"]

    order = create_order(amount)

    return order