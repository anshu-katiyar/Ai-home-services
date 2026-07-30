from pydantic import BaseModel

class Service(BaseModel):
    name: str
    category: str
    price: float
    description: str
    image: str