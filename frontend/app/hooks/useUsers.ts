import { useEffect } from "react"
import { useUsersStore } from "~/server/store"

export function useUsers() {
    const { users, loading, fetchUsers } = useUsersStore()

    useEffect(() => {
        fetchUsers()
    }, [])

    return { users, loading }
}
