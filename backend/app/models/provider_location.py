from pydantic import BaseModel

class ProviderLocation(BaseModel):

    booking_id: str

    latitude: float

    longitude: float