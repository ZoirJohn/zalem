import { WebSocketServer, WebSocket } from "ws";

import { Server } from "http";
import { passportInitialize, passportSession, sessionMiddleware } from "../../config";
import { Request, RequestHandler, Response } from "express";

export class ChatController {
	private socket: WebSocketServer;
	private clients = new Map<string, WebSocket>();
	private middlewares = [sessionMiddleware, passportInitialize, passportSession];

	constructor(server: Server) {
		this.socket = new WebSocketServer({ server });
		this.init();
	}

	private applyMiddlewares(req: Request, res: Response): Promise<void> {
		return new Promise((resolve) => {
			let i = 0;
			const next = () => {
				const middleware = this.middlewares[i++];
				if (!middleware) {
					return resolve();
				}
				middleware(req, res, next);
			};
			next();
		});
	}

	private init() {
		this.socket.on("connection", async (ws, req: Request) => {
			await this.applyMiddlewares(req, {} as unknown as Response);
			const user = req.user?.id;

			if (!user) {
				ws.close(1008, "Unauthorized");
				return;
			}

			this.clients.set(user, ws);

			ws.on("message", (message: string) => {
				try {
					const parsed = JSON.parse(message);
					this.sendMessage(parsed.recipientId, parsed);
				} catch (error) {
					ws.send(JSON.stringify({ error: "Invalid message format" }));
				}
			});

			ws.on("close", () => {
				this.clients.delete(user);
			});
		});
	}

	private sendMessage(recipientId: string, message: object) {
		const recipient = this.clients.get(recipientId);
		if (recipient?.readyState === WebSocket.OPEN) {
			recipient.send(
				JSON.stringify({
					id: crypto.randomUUID(),
					...message,
				}),
			);
		}
	}
}
