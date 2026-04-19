import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { NavLink } from "react-router"
import { useForm } from "@tanstack/react-form"
import Facebook from "~/assets/img/facebook.svg"
import Google from "~/assets/img/google.svg"
import type { SubmitEventHandler } from "react"

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: ({ value }) => {
            if (value.password !== value.confirmPassword) console.log("Error")
            console.log(value)
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
                    <CardTitle className="text-xl">Create your account</CardTitle>
                    <CardDescription>Sign up with your Facebook or Google account</CardDescription>
                </CardHeader>
                <CardContent>
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
                                name="username"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Full Name"
                                                autoComplete="name"
                                                required
                                            />
                                        </Field>
                                    )
                                }}
                            ></form.Field>
                            <form.Field
                                name="email"
                                children={(field) => {
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input
                                                type="email"
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="email@example.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </Field>
                                    )
                                }}
                            ></form.Field>
                            <Field>
                                <Field className="grid gap-4 sm:grid-cols-2">
                                    <form.Field
                                        name="password"
                                        children={(field) => {
                                            return (
                                                <Field>
                                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                    <Input
                                                        type="password"
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        autoComplete="new-password"
                                                        required
                                                    />
                                                </Field>
                                            )
                                        }}
                                    ></form.Field>

                                    <form.Field
                                        name="confirmPassword"
                                        children={(field) => {
                                            return (
                                                <Field>
                                                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                                    <Input
                                                        type="password"
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        autoComplete="current-password"
                                                        required
                                                    />
                                                </Field>
                                            )
                                        }}
                                    ></form.Field>
                                </Field>
                                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                            </Field>
                            <Field>
                                <Button type="submit">Create Account</Button>
                                <FieldDescription className="text-center">
                                    Already have an account? <NavLink to="/login">Sign in</NavLink>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
           
        </div>
    )
}
