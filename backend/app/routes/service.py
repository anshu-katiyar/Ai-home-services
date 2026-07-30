from fastapi import APIRouter
from app.models.service import Service
from app.services.service_service import (
    add_service,
    get_all_services,
    get_service_by_id
)

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.get("/")
def fetch_services():
    return get_all_services()


@router.post("/")
def create_service(service: Service):

    add_service(service.model_dump())

    return {
        "message": "Service Added Successfully"
    }

@router.get("/{service_id}")
def fetch_single_service(service_id: str):

    service = get_service_by_id(service_id)

    if service is None:
        return {
            "message": "Service Not Found"
        }

    return service