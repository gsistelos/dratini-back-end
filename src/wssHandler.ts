import type { WebSocket } from "ws";

export function wssHandler(ws: WebSocket) {
	ws.on("error", (err) => {
		console.log(`Websocket error: ${err}`);
	});

	ws.on("message", (data) => {
		console.log(`Received: ${data}`);
	});

	ws.send("connected");
}
