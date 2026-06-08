import { create } from "zustand";
import { api } from "~/services/api";
import { toast } from "sonner";

export const useUsersStore = create<UsersStore>()((set, get) => ({
    users: [],
    loading: false,
    error: "",

    fetchUsers: async () => {
        if (get().users.length) return;
        set({ loading: true });
        try {
            const data = await api.users();
            set({ users: data.users });
        } catch (error) {
            if (error instanceof Error) {
                const error = "Error fetching users";
                set({ error });
                toast.error(error, { duration: 4000 });
            }
        } finally {
            set({ loading: false });
        }
    },
}));

export const useCurrentUserStore = create<CurrentUserStore>()((set, get) => ({
    user: null,
    loading: false,
    error: "",

    setUser: (user: User | null) => {
        set({ user });
    },

    fetchCurrentUser: async () => {
        if (get().user) return;
        set({ loading: true });
        try {
            const data = await api.me();
            get().setUser(data.user);
        } catch (error) {
            if (error instanceof Error) {
                const error = "Error fetching users";
                set({ error });
                toast.error(error, { duration: 4000 });
            }
        } finally {
            set({ loading: false });
        }
    },
}));

export const useMessagesStore = create<MessagesStore>()((set, get) => ({
    messages: {},
    currentConversationId: "",
    loading: false,
    error: "",
    fetchMessages: async (conversation_id: string) => {
        if (conversation_id in get().messages) return;
        set({ loading: true });
        try {
            const data = await api.messages(conversation_id);
            set({
                messages: {
                    [conversation_id]: data.messages,
                    ...get().messages,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                const error = "Error fetching messages";
                set({ error });
                toast.error(error, { duration: 4000 });
            }
        } finally {
            set({ loading: false });
        }
    },
    setMessages: (message: Message) => {
        set({ loading: true });
        set({
            messages: {
                ...get().messages,
                [get().currentConversationId]: [
                    ...get().messages[get().currentConversationId],
                    message,
                ],
            },
        });
        set({ loading: false });
    },
    setCurrentConversationId: (conversation_id: string) => {
        set({ currentConversationId: conversation_id });
    },
}));
