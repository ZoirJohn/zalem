interface User {
    blocked: boolean;
    created_at: string;
    display_name: string | null;
    email: string;
    facebook_id: string | null;
    google_id: string | null;
    id: string;
    is_email_verified: boolean;
    role: "user" | "god";
    updated_at: string;
}
interface Message {
    content: string;
    id: string;
    created_at: string;
    conversation_id: string;
    sender_id: string;
}
type ChatUser = Pick<User, "id" | "display_name" | "updated_at" | "created_at">;

interface UsersStore {
    users: ChatUser[];
    loading: boolean;
    error: string;
    fetchUsers: () => Promise<void>;
}

interface CurrentUserStore {
    user: User | null;
    loading: boolean;
    error: string;
    fetchCurrentUser: () => Promise<void>;
}

interface MessagesStore {
    messages: Message[];
    loading: boolean;
    error: string;
    fetchMessages: (receiverId: string) => Promise<void>;
    setMessages: (message: Message) => void;
}
