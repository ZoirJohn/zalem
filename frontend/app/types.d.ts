export interface User {
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
export interface Message {
    content: string;
    id: string;
    created_at: string;
    conversation: { conversation_id: string };
    sender: { sender_id: string };
}
export type ChatUser = Pick<User, "id" | "display_name" | "updated_at" | "created_at">;

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
}

/*


content
: 
"asdf"
conversation
: 
{id: 'fa11a696-120f-4089-a42e-5436431d7ed8', created_at: '2026-06-04T12:46:30.005Z'}
conversation_id
: 
"fa11a696-120f-4089-a42e-5436431d7ed8"
created_at
: 
"2026-06-05T15:41:38.039Z"
id
: 
"b60dc349-db20-498d-b8c5-f1299aa525b1"
sender
: 
{id: 'c4d0948a-684f-4f0e-92c2-6acc288b28c0'}
sender_id
: 
"c4d0948a-684f-4f0e-92c2-6acc288b28c0"
*/
