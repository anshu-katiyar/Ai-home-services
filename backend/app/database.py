from pymongo import MongoClient
from app.config import MONGODB_URI, DATABASE_NAME

client = MongoClient(MONGODB_URI)

try:
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print("❌ MongoDB Connection Error:")
    print(e)

db = client[DATABASE_NAME]
users_collection = db["users"]