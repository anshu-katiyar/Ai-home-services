from pydantic import BaseModel

class Review(BaseModel):

    booking_id: str

    provider_id: str

    customer_email: str

    rating: int

    review: str