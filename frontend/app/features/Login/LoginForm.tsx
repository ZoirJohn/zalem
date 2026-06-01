import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { api } from "~/services/api";
import Facebook from "~/assets/img/facebook.svg";
import Google from "~/assets/img/google.svg";
import * as zod from "zod";

const userSchema = zod.object({
	email: zod.string().min(1, { message: "Email is required" }).email(),
	password: zod.string().min(1, { message: "Password is required" }),
});

interface LoginForm {
	loginWithFacebook: () => void;
	loginWithGoogle: () => void;
}

export function LoginForm({ loginWithFacebook, loginWithGoogle }: LoginForm) {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value: { email, password } }: { value: { email: string; password: string } }) => {
			try {
				await api.login(email, password);
				toast.success("Login successful", { duration: 4000 });
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message, { duration: 4000 });
				}
			}
		},
		validators: {
			onChangeAsync: userSchema,
			onChangeAsyncDebounceMs: 500,
			onSubmit: userSchema,
		},
	});

	return (
		<Card className="border-claude-hairline bg-claude-canvas text-claude-ink">
			<CardHeader className="text-center">
				<CardTitle className="text-xl">Welcome back</CardTitle>
				<CardDescription className="text-claude-body">Login with your Facebook or Google account</CardDescription>
			</CardHeader>
			<CardContent className="max-sm:px-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<FieldGroup className="gap-6">
						<Field>
							<Button variant="outline" type="button" onClick={loginWithFacebook} className="border-claude-hairline">
								<img src={Facebook} alt="Facebook logo" className="size-6" />
								Login with Facebook
							</Button>
							<Button variant="outline" type="button" onClick={loginWithGoogle} className="border-claude-hairline">
								<img src={Google} alt="Google logo" className="size-4" />
								Login with Google
							</Button>
						</Field>
						<FieldSeparator className="text-claude-muted *:data-[slot=field-separator-content]:bg-claude-canvas">Or continue with</FieldSeparator>

						<form.Field
							name="email"
							children={(field) => {
								return (
									<Field>
										<FieldLabel htmlFor={field.name} className="text-claude-body-strong">
											Email
										</FieldLabel>
										<Input id={field.name} name={field.name} type="email" placeholder="email@example.com" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} autoComplete="email" aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid} data-testid="email-field" />
										{field.state.meta.isTouched && !field.state.meta.isValid && <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>}
									</Field>
								);
							}}
						></form.Field>

						<form.Field
							name="password"
							children={(field) => {
								return (
									<Field>
										<div className="flex items-center">
											<FieldLabel htmlFor={field.name} className="text-claude-body-strong">
												Password
											</FieldLabel>
											<a href="#" className="ml-auto text-sm text-claude-muted underline-offset-4 hover:text-claude-ink hover:underline">
												Forgot your password?
											</a>
										</div>
										<Input id={field.name} name={field.name} type="password" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} autoComplete="current-password" aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid} data-testid="password-field" />
										{field.state.meta.isTouched && !field.state.meta.isValid && <FieldError>{field.state.meta.errors?.[0]?.message}</FieldError>}
									</Field>
								);
							}}
						></form.Field>

						<Field>
							<Button type="submit" role="button" name="login-button" data-testid="login-button" className="bg-claude-primary text-white hover:bg-claude-primary-active">
								Login
							</Button>
							<FieldDescription className="text-center text-claude-body">
								Don&apos;t have an account?{" "}
								<Link className="text-claude-primary hover:text-claude-primary-active" to="/signup">
									Sign up
								</Link>
							</FieldDescription>
							<Link to="/" className="mt-2 inline-flex items-center justify-center gap-2 text-sm text-claude-muted hover:text-claude-ink">
								<span aria-hidden="true">←</span>
								Back to home
							</Link>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
}
