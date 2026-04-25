import type { ReactNode } from "react"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const user = false
    if (!user) return <Navigate to="/login" replace />
    return <>{children}</>
}
