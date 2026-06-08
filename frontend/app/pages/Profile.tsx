import { ProtectedRoute } from "~/ProtectedRoute";

export default function Profile() {
    return <ProtectedRoute redirectTo="/login" shouldUserExist="Y">
        <section>
            
        </section>
    </ProtectedRoute>
}