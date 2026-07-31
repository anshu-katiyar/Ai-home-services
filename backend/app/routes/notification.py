from fastapi import APIRouter
from bson import ObjectId

from app.database import db
from app.dependencies.auth import get_current_user
from fastapi import Depends

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def get_notifications(current_user=Depends(get_current_user)):

    notifications = list(
        db.notifications.find(
            {
                "receiver_email": current_user["email"]
            }
        ).sort("created_at", -1)
    )

    data = []

    for notification in notifications:

        notification["id"] = str(notification["_id"])
        del notification["_id"]

        data.append(notification)

    return data


@router.put("/read/{notification_id}")
def mark_as_read(notification_id: str):

    db.notifications.update_one(
        {
            "_id": ObjectId(notification_id)
        },
        {
            "$set": {
                "is_read": True
            }
        }
    )

    return {
        "message": "Notification marked as read"
    }