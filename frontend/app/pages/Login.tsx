import { Link } from "react-router"
import { LoginForm } from "~/components/LoginForm"
import { Logo } from "~/components/Logo"

export default function LoginPage() {
    return (
        <div className="min-h-dvh flex flex-col items-center justify-center bg-muted p-2 sm:p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2 sm:gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo />
                </Link>
                <LoginForm />
            </div>
        </div>
    )
}
