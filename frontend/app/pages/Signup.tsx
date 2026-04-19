import { SignupForm } from "~/components/SignupForm"
import { Logo } from "~/components/Logo"
import { Link } from "react-router"

export default function SignupPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-2 sm:p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2 sm:gap-6">
                <Link to="/" className="flex items-center self-center font-medium">
                    <Logo />
                </Link>
                <SignupForm />
            </div>
        </div>
    )
}
