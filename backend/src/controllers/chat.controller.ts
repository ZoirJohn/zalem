import { WebSocketServer, WebSocket } from "ws";

import { Server } from "http";
import { passportInitialize, passportSession, sessionMiddleware } from "../../config";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";
import ConversationService from "../services/conversation.service";
import { MessageDTO } from "../dtos/message.dto";

export class ChatController {
    private messages: Repository<Message> = AppDataSource.getRepository(Message);
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
            const userId = req.user?.id;

            if (!userId) {
                ws.close(1008, "Unauthorized");
                return;
            }

            this.clients.set(userId, ws);
            ws.on("message", (message: string) => {
                try {
                    const { receiverId, message: content } = JSON.parse(message);
                    this.sendMessage(userId, receiverId, content);
                } catch (error) {
                    ws.send(JSON.stringify({ error: "Invalid message format" }));
                }
            });

            ws.on("close", () => {
                if (this.clients.get(userId) === ws) {
                    this.clients.delete(userId);
                }
            });
        });
    }

    private async sendMessage(userId: string, receiverId: string, message: string) {
        const recipient = this.clients.get(receiverId);
        const sender = this.clients.get(userId);

        const conversation = await ConversationService.findOrCreateConversation(userId, receiverId);
        const newMessage = this.messages.create({
            conversation,
            content: message,
            sender: { id: userId },
        });
        const savedMessage = await this.messages.save(newMessage);

        const payload = JSON.stringify(new MessageDTO(savedMessage));
        if (recipient !== sender) {
            recipient?.send(payload);
        }
        sender?.send(payload);
    }
}
