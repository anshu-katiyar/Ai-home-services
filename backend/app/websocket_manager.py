from fastapi import WebSocket

class ConnectionManager:

    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, email: str):
        await websocket.accept()
        self.active_connections[email] = websocket

    def disconnect(self, email: str):
        if email in self.active_connections:
            del self.active_connections[email]

    async def send_notification(self, email: str, message: dict):
        websocket = self.active_connections.get(email)

        if websocket:
            await websocket.send_json(message)

manager = ConnectionManager()