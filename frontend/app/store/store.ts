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

    fetchCurrentUser: async () => {
        if (get().user) return;
        set({ loading: true });
        try {
            const data = await api.me();
            set({ user: data.user });
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
    messages: [],
    loading: false,
    error: "",
    fetchMessages: async (receiverId: string) => {
        set({ loading: true });
        try {
            const data = await api.messages(receiverId);
            set({ messages: data.messages });
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
        set({ messages: [message, ...get().messages] });
        set({ loading: false });
    },
}));
