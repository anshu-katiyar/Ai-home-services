from pydantic import BaseModel
from typing import Optional

class Booking(BaseModel):

    service_id: str

    address: str

    booking_date: str

    booking_time: str

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    payment_id: Optional[str] = None

    order_id: Optional[str] = None

    payment_status: Optional[str] = None

    status: str = "Pending"