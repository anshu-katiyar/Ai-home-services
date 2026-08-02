from app.database import db

def create_review(data):

    result = db.reviews.insert_one(data)

    return str(result.inserted_id)

def get_provider_reviews(provider_id):

    reviews = list(

        db.reviews.find(
            {
                "provider_id": provider_id
            }
        )

    )

    data = []

    total = 0

    for review in reviews:

        review["id"] = str(review["_id"])

        del review["_id"]

        total += review["rating"]

        data.append(review)

    average = 0

    if len(data) > 0:

        average = round(
            total / len(data),
            1
        )

    return {

        "average_rating": average,

        "total_reviews": len(data),

        "reviews": data

    }