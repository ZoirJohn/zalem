import { Repository } from "typeorm";
import { Conversation } from "../entities/conversation.entity";
import { AppDataSource } from "../../data-source";
import { Participant } from "../entities/participant.entity";
import { Message } from "../entities/message.entity";

class ConversationService {
    private conversations: Repository<Conversation> =
        AppDataSource.getRepository(Conversation);
    private messages: Repository<Message> =
        AppDataSource.getRepository(Message);

    async findOrCreateConversation(userId: string, receiverId: string) {
        const type = userId === receiverId ? "saved" : "direct";
        
        const queryBuilder = this.conversations
            .createQueryBuilder("c")
            .innerJoin("c.participants", "p1", "p1.user_id = :userA", {
                userA: userId,
            })
            .leftJoinAndSelect("c.messages", "m")
            .leftJoinAndSelect("c.participants", "p")
            .where("c.type = :type", { type });

        if (userId !== receiverId) {
            queryBuilder.innerJoin(
                "c.participants",
                "p2",
                "p2.user_id = :userB",
                { userB: receiverId },
            );
        }

        const existingConversation = await queryBuilder.getOne();

        if (existingConversation) {
            return existingConversation;
        }

        const participants =
            userId === receiverId
                ? [{ user: { id: userId } }]
                : [{ user: { id: userId } }, { user: { id: receiverId } }];

        const conversation = this.conversations.create({
            type,
            participants: participants as Participant[],
        });

        return this.conversations.save(conversation);
    }
    async getMessages(conversation_id: string) {
        const messages = await this.messages.find({
            where: { conversation_id },
        });
        return messages;
    }
}

export default new ConversationService();
