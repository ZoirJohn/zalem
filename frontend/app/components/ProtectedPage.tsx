import { useEffect, type ReactNode } from "react"
// import { Navigate } from "react-router"
import API_REQUEST from "../server/api"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    useEffect(() => {
        API_REQUEST.me()
            .then((data) => console.log(data))
    }, [])
    // if (!user) return <Navigate to="/login" replace />
    return <>{children}</>
}
