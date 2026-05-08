import { useEffect, useState, type ReactNode } from "react"
import API_REQUEST from "../server/api"
import { Navigate } from "react-router"
import type { User } from "~/types"

export default function Authenticated({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        API_REQUEST.me()
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <>Loading...</>
    }
    if (!user?.id) {
        return <Navigate replace to="/login" />
    }
    return <>{children}</>
}
