import { WebSocketServer } from "ws";
import { Server } from "http";

export class ChatController {
	private socket: WebSocketServer;
	constructor(server: Server) {
		this.socket = new WebSocketServer({ server });
		this.init();
	}
	private init() {
		this.socket.on("connection", (ws) => {
			ws.on("message", (message: string) => {
				console.log(JSON.parse(message));
				this.broadcastMessage(message);
			});
		});
	}
	private broadcastMessage(message: string) {
		this.socket.clients.forEach((client) => {
			client.send(
				JSON.stringify({
					id: crypto.randomUUID(),
					message: JSON.parse(message),
				}),
			);
		});
	}
}
