import type { ReactNode } from "react"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = true
  if (!user) return <Navigate to="/" />
  return <>{children}</>
}
