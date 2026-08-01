from pydantic import BaseModel

class Booking(BaseModel):

    service_id: str

    address: str

    booking_date: str

    booking_time: str

    status: str = "Pending"

    # Payment Details
    payment_id: str | None = None

    order_id: str | None = None

    payment_status: str = "Pending"