import { create } from "zustand";
import { toast } from "sonner";

interface UsersStore {
	users: ChatUser[];
	loading: boolean;
	error: string;
	fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersStore>()((set, get) => ({
	users: [],
	loading: false,
	error: "",
	selectedUser: null,

	fetchUsers: async () => {
		if (get().users.length) return;
		set({ loading: true });
		try {
			const data = await API_REQUEST.users();
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

interface CurrentUserStore {
	user: User | null;
}

export const useCurrentUserStore = create<CurrentUserStore>()((_, __) => ({
	user: null,
}));
