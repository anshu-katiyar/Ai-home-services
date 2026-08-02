from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60)
)

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")



MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM")

MAIL_PORT = int(os.getenv("MAIL_PORT"))

MAIL_SERVER = os.getenv("MAIL_SERVER")

MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME")

MAIL_STARTTLS = os.getenv("MAIL_STARTTLS") == "True"

MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS") == "True"