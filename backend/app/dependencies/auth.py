from fastapi import Header, HTTPException
from app.utils.jwt_handler import verify_token

def get_current_user(authorization: str = Header(...)):

    print("Authorization Header:", authorization)

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    token = authorization.split(" ")[1]

    print("Token:", token)

    payload = verify_token(token)

    print("Payload:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Token Expired"
        )

    return payload