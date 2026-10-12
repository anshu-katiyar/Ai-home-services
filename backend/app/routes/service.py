
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.database import db
from app.models.service import Service
from app.services.service_service import (
    add_service,
    get_all_services,
    get_service_by_id
)
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


def require_admin(user):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can manage services"
        )


@router.get("/")
def fetch_services():
    return get_all_services()


@router.get("/{service_id}")
def fetch_single_service(service_id: str):
    service = get_service_by_id(service_id)

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return service


@router.post("/")
def create_service(
    service: Service,
    user=Depends(get_current_user)
):
    require_admin(user)

    service_data = service.model_dump()
    service_data["is_available"] = True

    add_service(service_data)

    return {
        "message": "Service added successfully"
    }


@router.put("/{service_id}")
def update_service(
    service_id: str,
    service: Service,
    user=Depends(get_current_user)
):
    require_admin(user)

    if not ObjectId.is_valid(service_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid service ID"
        )

    result = db.services.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": service.model_dump()}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return {
        "message": "Service updated successfully"
    }


@router.patch("/{service_id}/availability")
def update_service_availability(
    service_id: str,
    data: dict,
    user=Depends(get_current_user)
):
    require_admin(user)

    if not ObjectId.is_valid(service_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid service ID"
        )

    if not isinstance(data.get("is_available"), bool):
        raise HTTPException(
            status_code=422,
            detail="is_available must be true or false"
        )

    result = db.services.update_one(
        {"_id": ObjectId(service_id)},
        {
            "$set": {
                "is_available": data["is_available"]
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return {
        "message": "Service availability updated",
        "is_available": data["is_available"]
    }
