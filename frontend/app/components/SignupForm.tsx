import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { NavLink } from "react-router"
import { useForm } from "@tanstack/react-form"
import { type SubmitEventHandler } from "react"
import { toast } from "sonner"
import API_REQUEST from "~/server/api"
import Facebook from "~/assets/img/facebook.svg"
import Google from "~/assets/img/google.svg"
import * as zod from "zod"

const userSchema = zod
    .object({
        username: zod.string().min(1, { message: "Full name is required" }),
        email: zod.string().min(1, { message: "Email is required" }).email(),
        password: zod
            .string()
            .min(1, { message: "Password is required" })
            .min(7, { message: "Must be at least 7 characters" })
            .max(32)
            .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
            .regex(/[a-z]/, { message: "Must contain a lowercase letter" })
            .regex(/[0-9]/, { message: "Must contain a number" })
            .regex(/[^A-Za-z0-9]/, { message: "Must contain a special character" }),
        confirmPassword: zod.string().min(1, { message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: async ({ value: { email, username, password } }) => {
            try {
                await API_REQUEST.register(email, password, username)
                toast.success("Account created successfully", { duration: 4000 })
            } catch (error) {
                toast.error("Failed to create account", { duration: 4000 })
            }
        },
        validators: {
            onChangeAsync: userSchema,
            onChangeAsyncDebounceMs: 1000,
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
            <Card className="border-claude-hairline bg-claude-canvas text-claude-ink">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription className="text-claude-body">
                        Sign up with your Facebook or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent className="max-sm:px-4">
                    <form onSubmit={submit}>
                        <FieldGroup className="gap-6">
                            <Field>
                                <Button variant="outline" type="button" className="border-claude-hairline">
                                    <img src={Facebook} alt="Facebook logo" className="size-6" />
                                    Login with Facebook
                                </Button>
                                <Button variant="outline" type="button" className="border-claude-hairline">
                                    <img src={Google} alt="Google logo" className="size-4" />
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="text-claude-muted *:data-[slot=field-separator-content]:bg-claude-canvas">
                                Or continue with
                            </FieldSeparator>
                            <form.Field
                                name="username"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="text-claude-body-strong">
                                                Full name
                                            </FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Full name"
                                                autoComplete="name"
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
                                name="email"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="text-claude-body-strong">
                                                Email
                                            </FieldLabel>
                                            <Input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="email@example.com"
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
                            <Field className="grid gap-4 sm:grid-cols-2">
                                <form.Field
                                    name="password"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <FieldLabel htmlFor={field.name} className="text-claude-body-strong">
                                                    Password
                                                </FieldLabel>
                                                <Input
                                                    type="password"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    autoComplete="new-password"
                                                    aria-invalid={
                                                        field.state.meta.isTouched && !field.state.meta.isValid
                                                    }
                                                />
                                                {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                    <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                                )}
                                            </Field>
                                        )
                                    }}
                                ></form.Field>

                                <form.Field
                                    name="confirmPassword"
                                    children={(field) => {
                                        return (
                                            <Field>
                                                <FieldLabel htmlFor={field.name} className="text-claude-body-strong">
                                                    Confirm Password
                                                </FieldLabel>
                                                <Input
                                                    type="password"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    autoComplete="new-password"
                                                    aria-invalid={
                                                        field.state.meta.isTouched && !field.state.meta.isValid
                                                    }
                                                />
                                                {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                    <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>
                                                )}
                                            </Field>
                                        )
                                    }}
                                ></form.Field>
                            </Field>
                            <form.Subscribe
                                selector={(state) => [state]}
                                children={([state]) => {
                                    return (
                                        <Field>
                                            <Button
                                                type="submit"
                                                className="bg-claude-primary text-white hover:bg-claude-primary-active"
                                            >
                                                Create Account
                                            </Button>
                                            <FieldDescription className="text-center text-claude-body">
                                                Already have an account?{" "}
                                                <NavLink
                                                    className="text-claude-primary hover:text-claude-primary-active"
                                                    to="/login"
                                                >
                                                    Sign in
                                                </NavLink>
                                            </FieldDescription>
                                        </Field>
                                    )
                                }}
                            ></form.Subscribe>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
