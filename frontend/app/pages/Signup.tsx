import { SignupForm } from "~/features/Signup/SignupForm"

export default function SignupPage() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-muted p-2 sm:p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-2 sm:gap-6">
                <SignupForm />
            </div>
        </div>
    )
}
