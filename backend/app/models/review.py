
from pydantic import BaseModel, Field, ConfigDict


class Review(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    booking_id: str = Field(min_length=1)
    provider_id: str = Field(min_length=1)

    # Set by the backend from the authenticated user.
    # Clients cannot supply arbitrary extra fields.
    rating: int = Field(ge=1, le=5)
    review: str = Field(default="", max_length=2000)

    model_config = ConfigDict(
        str_strip_whitespace=True,
        extra="forbid",
    )