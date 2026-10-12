from app.database import db
from bson import ObjectId


def add_service(service_data):
    result = db.services.insert_one(service_data)
    return result.inserted_id



def get_all_services():
    services = list(db.services.find())

    data = []

    for service in services:
        service["id"] = str(service["_id"])
        del service["_id"]

        # Existing services without this field remain available
        service["is_available"] = service.get("is_available", True)

        data.append(service)

    return data



def add_service(data):
    result = db.services.insert_one(data)
    return str(result.inserted_id)



def get_service_by_id(service_id):
    if not ObjectId.is_valid(service_id):
        return None

    service = db.services.find_one({
        "_id": ObjectId(service_id)
    })

    if service:
        service["id"] = str(service["_id"])
        del service["_id"]
        service["is_available"] = service.get("is_available", True)

    return service



def get_service_by_id(service_id):

    service = db.services.find_one(
        {"_id": ObjectId(service_id)}
    )

    if not service:
        return None

    service["id"] = str(service["_id"])
    del service["_id"]

    return service