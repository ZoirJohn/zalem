import type { ReactNode } from "react";

export function ProtectedRoute({ children, shouldUserExist, redirectTo }: { children: ReactNode; shouldUserExist: "Y" | "N"; redirectTo: string }) {
	return <>{children}</>;
}
