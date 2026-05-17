import { WebSocketServer, WebSocket } from "ws";

import { Server } from "http";
import { passportInitialize, passportSession, sessionMiddleware } from "../../config";
import { Request, RequestHandler, Response } from "express";
import { User } from "../entities/user.entity";

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
					this.sendMessage(req.user!, parsed.recipientId, parsed);
				} catch (error) {
					ws.send(JSON.stringify({ error: "Invalid message format" }));
				}
			});

			ws.on("close", () => {
				this.clients.delete(user);
			});
		});
	}

	private sendMessage(user: User, recipientId: string, message: object) {
		const recipient = this.clients.get(recipientId);
		const sender = this.clients.get(user.id)!;

		if (recipient?.readyState === WebSocket.OPEN && sender.readyState === WebSocket.OPEN) {
			const payload = JSON.stringify({
				id: crypto.randomUUID(),
				...message,
			});
			recipient.send(payload);
			sender.send(payload);
		}
	}
}
