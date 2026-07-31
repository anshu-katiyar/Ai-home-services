from app.utils.razorpay_client import client

def create_order(amount):

    order = client.order.create({

        "amount": amount * 100,

        "currency": "INR",

        "payment_capture": 1

    })

    return order