from datetime import datetime
from app.database import db

def create_notification(
    receiver_email,
    title,
    message,
    notification_type="booking"
):

    print("===== Notification Function Called =====")
    print("Receiver:", receiver_email)

    data = {
        "receiver_email": receiver_email,
        "title": title,
        "message": message,
        "type": notification_type,
        "is_read": False,
        "created_at": datetime.utcnow()
    }

    result = db.notifications.insert_one(data)

    print("Inserted ID:", result.inserted_id)