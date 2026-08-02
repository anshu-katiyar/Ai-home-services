from fastapi import FastAPI
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.service import router as service_router
from app.routes.booking import router as booking_router
from app.routes.provider import router as provider_router
from app.routes.admin import router as admin_router
from app.routes import notification
from app.routes import websocket
from app.routes.payment import router as payment_router
from app.routes.review import router as review_router


app = FastAPI(
    title="HomeAI API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(service_router)

app.include_router(booking_router)
app.include_router(provider_router)
app.include_router(admin_router)
app.include_router(notification.router)
app.include_router(websocket.router)
app.include_router(payment_router)
app.include_router(review_router)

@app.get("/")
def home():
    return {
        "message": "HomeAI Backend Running 🚀"
    }