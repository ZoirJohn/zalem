import { useContext,  type ReactNode } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "~/context/AuthContext"

export default function Authenticated({
    children,
    shouldUserExist,
    redirectTo,
}: {
    children: ReactNode
    shouldUserExist: "Y" | "N"
    redirectTo: string
}) {
    const { user,  } = useContext(AuthContext)

    const condition = shouldUserExist == "Y" ? !user?.id : user?.id
    if (condition) {
        return <Navigate replace to={redirectTo} />
    }
    return <>{children}</>
}
