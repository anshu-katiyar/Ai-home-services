from app.database import db
from bson import ObjectId


def add_service(service_data):
    result = db.services.insert_one(service_data)
    return result.inserted_id


def get_all_services():

    services = list(db.services.find())

    for service in services:
        service["id"] = str(service["_id"])
        del service["_id"]

    return services


def get_service_by_id(service_id):

    service = db.services.find_one(
        {"_id": ObjectId(service_id)}
    )

    if not service:
        return None

    service["id"] = str(service["_id"])
    del service["_id"]

    return service