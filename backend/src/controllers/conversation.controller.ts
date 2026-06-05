import { Request, Response, NextFunction } from "express";
import ConversationService from "../services/conversation.service";

class ConversationController {
    async getConversation(req: Request, res: Response, next: NextFunction) {
        try {
            const { receiverId } = req.params;
            const userId = req.user?.id;
            const conversation = await ConversationService.findOrCreateConversation(userId as string, receiverId as string);

            return res.json({ conversation });
        } catch (error) {
            return next(error);
        }
    }
     async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const { receiverId } = req.params;
            const userId = req.user?.id;
            const messages = await ConversationService.getMessages(userId as string, receiverId as string);

            return res.json({ messages });
        } catch (error) {
            return next(error);
        }
    }
}

export default new ConversationController();
