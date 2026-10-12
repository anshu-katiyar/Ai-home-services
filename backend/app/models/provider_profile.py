
from pydantic import BaseModel, Field


class ProviderProfile(BaseModel):
    service_categories: list[str] = Field(min_length=1)
    skills: list[str] = Field(default_factory=list)
    is_available: bool = True
