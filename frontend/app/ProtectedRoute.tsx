import { type ReactNode } from "react"
import { Navigate } from "react-router"
import { useCurrentUserStore } from "~/services/store"

export function ProtectedRoute({
    children,
    shouldUserExist,
    redirectTo,
}: {
    children: ReactNode
    shouldUserExist: "Y" | "N"
    redirectTo: string
}) {
    const { user } = useCurrentUserStore()

    const condition = shouldUserExist == "Y" ? !user?.id : user?.id
    if (condition) {
        return <Navigate replace to={redirectTo} />
    }
    return <>{children}</>
}
