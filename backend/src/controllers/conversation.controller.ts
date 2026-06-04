import { Repository } from "typeorm";
import { Conversation } from "../entities/conversation.entity";
import { AppDataSource } from "../../data-source";
import { Request, Response, NextFunction } from "express";
import { Participant } from "../entities/participant.entity";

class ConversationController {
    private conversations: Repository<Conversation> = AppDataSource.getRepository(Conversation);
    private participants: Repository<Participant> = AppDataSource.getRepository(Participant);
    async getConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const { conversationId, senderId, receiverId } = req.params;

            const conversation = await this.conversations.findOne({ where: { id: conversationId as string } });
            if (!conversation) {
                const newConversation = this.conversations.create({
                    participants: [{ user_id: senderId } as Participant, { user_id: receiverId } as Participant],
                });
                const savedConversation = await this.conversations.save(newConversation);
                return res.json({ conversation: savedConversation });
            }

            return res.json({ conversation });
        } catch (error) {
            return next(error)
        }
    }
}

export default new ConversationController();
