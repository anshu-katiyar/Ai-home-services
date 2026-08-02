from app.database import db

def create_review(data):

    result = db.reviews.insert_one(data)

    return str(result.inserted_id)