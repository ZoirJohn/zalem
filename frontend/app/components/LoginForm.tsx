import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { Link } from "react-router"
import Facebook from "~/assets/img/facebook.svg"
import Google from "~/assets/img/google.svg"
import * as zod from "zod"
import { useForm } from "@tanstack/react-form"
import type { SubmitEventHandler } from "react"

const userSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(1, { message: "Password is required" }),
})

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: ({ value }) => {
            console.log("Login action:", value)
        },
        validators: {
            onChangeAsync: userSchema,
            onChangeAsyncDebounceMs: 500,
            onSubmit: userSchema,
        },
    })

    const submit: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>Login with your Facebook or Google account</CardDescription>
                </CardHeader>
                <CardContent className="max-sm:px-4">
                    <form onSubmit={submit}>
                        <FieldGroup className="gap-6">
                            <Field>
                                <Button variant="outline" type="button">
                                    <img src={Facebook} alt="Facebook logo" className="size-6" />
                                    Login with Facebook
                                </Button>
                                <Button variant="outline" type="button">
                                    <img src={Google} alt="Google logo" className="size-4" />
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <form.Field
                                name="email"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="email@example.com"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                autoComplete="email"
                                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                                            />
                                            {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                            )}
                                        </Field>
                                    )
                                }}
                            ></form.Field>

                            <form.Field
                                name="password"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <a
                                                    href="#"
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                >
                                                    Forgot your password?
                                                </a>
                                            </div>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="password"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                autoComplete="current-password"
                                                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                                            />
                                            {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                            )}
                                        </Field>
                                    )
                                }}
                            ></form.Field>

                            <Field>
                                <Button type="submit">Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
