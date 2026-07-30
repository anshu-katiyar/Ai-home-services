from app.database import db

services = [

    {
        "name": "Electrician",
        "category": "Electrical",
        "price": 299,
        "description": "Home electrical repair",
        "image": "electrician.jpg"
    },

    {
        "name": "Plumber",
        "category": "Plumbing",
        "price": 399,
        "description": "Leakage and pipe repair",
        "image": "plumber.jpg"
    },

    {
        "name": "AC Repair",
        "category": "AC Service",
        "price": 599,
        "description": "AC installation and repair",
        "image": "ac.jpg"
    },

    {
        "name": "Cleaning",
        "category": "Cleaning",
        "price": 499,
        "description": "Home Deep Cleaning",
        "image": "cleaning.jpg"
    },

    {
        "name": "Carpenter",
        "category": "Wood Work",
        "price": 699,
        "description": "Furniture repair",
        "image": "carpenter.jpg"
    }

]

db.services.insert_many(services)

print("✅ Services Inserted Successfully")