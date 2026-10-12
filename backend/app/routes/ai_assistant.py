
import os
import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from google import genai

router = APIRouter(prefix="/ai", tags=["AI Assistant"])

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite")


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str


SYSTEM_PROMPT = """
You are HomeAI, a friendly AI assistant for a home-services platform.

Your responsibilities:
- Help users understand home services such as cleaning, plumbing,
  electrical work, appliance repair, and painting.
- Ask relevant follow-up questions when the problem is unclear.
- Suggest an appropriate service based on the user's description.
- Explain that actual prices, provider availability, and booking status
  must be checked using HomeAI's real platform data.
- Never invent service prices, provider details, bookings, or guarantees.
- Do not claim that you have created or cancelled a booking.
- For electrical hazards, gas leaks, fire, or similar emergencies,
  advise the user to move to safety and contact the appropriate emergency
  service or qualified professional.
- Be polite, concise, and easy to understand.
- Respond in the language used by the user, including Hindi or english or Hinglish.
- HomeAI customer support helpline number is 8318120145.
- If a user asks for customer care, helpline, human support,
  or how to contact HomeAI, provide 8318120145.
- Never invent any other customer support number.
"""


@router.post("/chat", response_model=ChatResponse)
def chat_with_assistant(payload: ChatRequest):
    message = payload.message.strip()

    if not message:
        raise HTTPException(
            status_code=422,
            detail="Please enter a message."
        )

    if not GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY is not configured.")
        raise HTTPException(
            status_code=503,
            detail="AI Assistant is not configured. Please try again later."
        )

    try:
        client = genai.Client(api_key=GEMINI_API_KEY)

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=f"{SYSTEM_PROMPT}\n\nUser message: {message}"
        )

        reply = (response.text or "").strip()

        if not reply:
            raise HTTPException(
                status_code=502,
                detail="AI could not generate a response. Please try again."
            )

        return ChatResponse(reply=reply)

    except HTTPException:
        raise
    except Exception:
        logger.exception("HomeAI assistant request failed.")
        raise HTTPException(
            status_code=502,
            detail="AI Assistant is temporarily unavailable. Please try again."
        )
