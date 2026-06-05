import { Repository } from "typeorm";
import { Conversation } from "../entities/conversation.entity";
import { AppDataSource } from "../../data-source";
import { Participant } from "../entities/participant.entity";
import { Message } from "../entities/message.entity";

class ConversationService {
    private conversations: Repository<Conversation> = AppDataSource.getRepository(Conversation);
    private messages: Repository<Message> = AppDataSource.getRepository(Message);
    async findOrCreateConversation(userId: string, receiverId: string) {
        const existingConversation = await this.conversations.createQueryBuilder("c").innerJoin("c.participants", "p1", "p1.user_id=:userA", { userA: userId }).innerJoin("c.participants", "p2", "p2.user_id=:userB", { userB: receiverId }).orWhere("p1.user_id = :receiverId AND p2.user_id = :userId", { userId, receiverId }).getOne();
        if (existingConversation) {
            return existingConversation;
        }

        const conversation = this.conversations.create({
            participants: [{ user: { id: userId } }, { user: { id: receiverId } }] as Participant[],
        });

        return this.conversations.save(conversation);
    }
    async getMessages(userId: string, receiverId: string) {
        const messages = await this.messages
            .createQueryBuilder("m")
            .select(["m.id", "m.content", "m.sender_id", "m.conversation_id", "m.created_at"])
            .innerJoin("m.conversation", "c")
            .innerJoin("c.participants", "p1", "p1.user_id = :userId", {
                userId,
            })
            .innerJoin("c.participants", "p2", "p2.user_id = :receiverId", {
                receiverId,
            })
            .getMany();

        return messages;
    }
}

export default new ConversationService();
