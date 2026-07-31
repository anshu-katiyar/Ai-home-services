from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket_manager import manager

router = APIRouter(tags=["WebSocket"])

@router.websocket("/ws/{email}")
async def websocket_endpoint(websocket: WebSocket, email: str):

    await manager.connect(websocket, email)

    try:

        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(email)