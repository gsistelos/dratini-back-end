import type { WebSocket } from "ws";
import redisClient from "./redisClient.js";

function getQuery(url: string) {
	const paramsIndex = url.indexOf("?");
	if (paramsIndex === -1 || paramsIndex === url.length - 1) {
		return [];
	}

	const params = url.slice(paramsIndex + 1);

	return params.split("&");
}

function getParams(url: string) {
	const query = getQuery(url);
	if (!query) {
		return ["", ""];
	}

	const result: string[] = [];

	for (const part of query) {
		const param = part.split("=");

		result.push(param[1]);
	}

	return result;
}

export async function wssHandler(ws: WebSocket, req: Request) {
	const [userId, wsToken] = getParams(req.url);

	const key = `ws-token-${userId}`;

	const redisToken = await redisClient.get(key);

	if (wsToken !== redisToken) {
		ws.close();
		return;
	}

	await redisClient.del(key);

	ws.on("error", (err) => {
		console.log(`Websocket error: ${err}`);
	});

	ws.on("message", (data) => {
		console.log(`Received: ${data}`);
	});

	ws.send("connected");
}
