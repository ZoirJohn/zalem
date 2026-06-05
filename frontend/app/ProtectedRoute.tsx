import type { ReactNode } from "react";
import { useCurrentUserStore } from "./store/store";
import { Navigate } from "react-router";

export function ProtectedRoute({ children, shouldUserExist, redirectTo }: { children: ReactNode; shouldUserExist: "Y" | "N"; redirectTo: string }) {
    const { user } = useCurrentUserStore();
    if (shouldUserExist === "Y" ? !user : user) {
        return <Navigate to={redirectTo} />;
    }
    return <>{children}</>;
}
