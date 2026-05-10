import { useEffect, useState } from "react"
import API_REQUEST from "~/server/api"
import type { ChatUser, User } from "~/types"

export function useUsers() {
    const [users, setUsers] = useState<ChatUser[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        API_REQUEST.users()
            .then((data) => {
                setUsers(data.users)
				console.log(data.users);
            })
            .catch((error) => {})
            .finally(() => {
                setLoading(false)
            })
    }, [])
    return { users, loading }
}
