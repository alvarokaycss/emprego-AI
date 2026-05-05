from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        # Lista para armazenar todos os navegadores conectados
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: list[dict]):
        # Envia um JSON para todos os navegadores simultaneamente
        for connection in self.active_connections:
            await connection.send_json(message)
