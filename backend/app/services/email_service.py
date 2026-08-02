from fastapi_mail import FastMail, MessageSchema

from app.utils.mail import conf

async def send_booking_email(

    email,
    subject,
    body

):

    message = MessageSchema(

        subject=subject,

        recipients=[email],

        body=body,

        subtype="plain"

    )

    fm = FastMail(conf)

    await fm.send_message(message)