import { create } from "zustand"
import API_REQUEST from "~/server/api"
import type { ChatUser } from "~/types"

interface UsersStore {
    users: ChatUser[]
    loading: boolean
    fetched: boolean
    fetchUsers: () => Promise<void>
}

export const useUsersStore = create<UsersStore>((set, get) => ({
    users: [],
    loading: false,
    fetched: false,
    selectedUser: null,

    fetchUsers: async () => {
        if (get().fetched) return
        set({ loading: true })
        try {
            const data = await API_REQUEST.users()
            set({ users: data.users, fetched: true })
        } finally {
            set({ loading: false })
        }
    },
}))
