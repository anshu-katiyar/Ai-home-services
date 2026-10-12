
import json
from pathlib import Path
from bson import ObjectId
from app.database import db

BOOKING_ID = "6ac7f1393b324eed6affc4f9"

reviews = list(
    db.reviews.find({"booking_id": BOOKING_ID})
)

backup = []

for review in reviews:
    review["_id"] = str(review["_id"])
    backup.append(review)

output = Path("duplicate_reviews_backup.json")

output.write_text(
    json.dumps(backup, indent=2, default=str),
    encoding="utf-8",
)

print("Backup saved:", output.resolve())
print("Reviews backed up:", len(backup))
