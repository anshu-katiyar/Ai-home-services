let socket = null;

export const connectWebSocket = (email, onMessage) => {

    socket = new WebSocket(`ws://127.0.0.1:8000/ws/${email}`);

    socket.onopen = () => {
        console.log("✅ WebSocket Connected");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onclose = () => {
        console.log("❌ WebSocket Disconnected");
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
    }
};