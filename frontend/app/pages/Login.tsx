import { LoginForm } from "~/features/Login/LoginForm"
import Protected from "~/components/Protected"
import API_REQUEST from "~/server/api"

export default function LoginPage() {
    const loginWithGoogle = () => {
        API_REQUEST.loginWithGoogle()
    }

    const loginWithFacebook = () => {
        API_REQUEST.loginWithFacebook()
    }

    return (
        <Protected shouldUserExist="N" redirectTo="/chat">
            <div className="flex min-h-dvh flex-col items-center justify-center bg-muted p-2 sm:p-6 md:p-10">
                <div className="sm:gap-6relative flex w-full max-w-sm flex-col gap-2">
                    <LoginForm loginWithFacebook={loginWithFacebook} loginWithGoogle={loginWithGoogle} />
                </div>
            </div>
        </Protected>
    )
}
