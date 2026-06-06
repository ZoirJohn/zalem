import { Message } from "../entities/message.entity";

export class MessageDTO {
    id: string;
    conversation_id!: string;
    sender_id: string;
    content: string;
    created_at: Date;

    constructor(message: Message) {
        this.id = message.id;
        this.conversation_id = message.conversation.id;
        this.sender_id = message.sender.id;
        this.content = message.content;
        this.created_at = message.created_at;
    }
}
