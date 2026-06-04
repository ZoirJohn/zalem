import { WebSocketServer, WebSocket } from "ws";

import { Server } from "http";
import { passportInitialize, passportSession, sessionMiddleware } from "../../config";
import { Request, RequestHandler, Response } from "express";
import { Conversation } from "../entities/conversation.entity";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Participant } from "../entities/participant.entity";
import { Message } from "../entities/message.entity";

export class ChatController {
    private conversations: Repository<Conversation> = AppDataSource.getRepository(Conversation);
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
                    console.log(this.clients);
                    
                    const { receiverId, message: content } = JSON.parse(message);
                    this.sendMessage(userId, receiverId, content);
                } catch (error) {
                    ws.send(JSON.stringify({ error: "Invalid message format" }));
                }
            });

            ws.on("close", () => {
                this.clients.delete(userId);
            });
        });
    }

    private async sendMessage(userId: string, receiverId: string, message: string) {
        const recipient = this.clients.get(receiverId);
        const sender = this.clients.get(userId);

        // const conversation = await this.findOrCreateConversation(userId, receiverId);
        // const newMessage = this.messages.create({
        //     conversation,
        //     content: message,
        //     sender: { id: userId },
        // });
        // const savedMessage = await this.messages.save(newMessage);

        const payload = JSON.stringify({message:"Check"});
        if (recipient !== sender) {
            recipient?.send(payload);
        }
        sender?.send(payload);
    }

    private async findOrCreateConversation(userId: string, receiverId: string) {
        const existingConversation = await this.conversations.createQueryBuilder("c").innerJoin("c.participants", "p1", "p1.user_id=:userA", { userA: userId }).innerJoin("c.participants", "p2", "p2.user_id=:userB", { userB: receiverId }).orWhere("p1.user_id = :receiverId AND p2.user_id = :userId", { userId, receiverId }).getOne();
        if (existingConversation) {
            return existingConversation;
        }

        const conversation = this.conversations.create({
            participants: [{ user: { id: userId } }, { user: { id: receiverId } }] as Participant[],
        });

        return this.conversations.save(conversation);
    }
}
