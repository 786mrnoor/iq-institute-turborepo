"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginApi } from "@repo/api-client/auth.ts";
import { type LoginData, loginSchema } from "@repo/schemas/auth/login";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.ts";

function LoginForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isLoading },
	} = useForm({
		resolver: zodResolver(loginSchema.body),
	});

	async function onSubmit(data: LoginData["body"]) {
		try {
			await loginApi(data);
			toast.success("Logged in Successfully");
			window.location.href = "/admin/students";
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				applyBackendErrors(error, setError);
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col items-center gap-3"
		>
			<FieldGroup>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Input id="email" {...register("email")} />
				<FieldError>{errors.email?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="password">Password</FieldLabel>
				<Input type="password" id="password" {...register("password")} />
				<FieldError>{errors.password?.message}</FieldError>
				<FieldError>{errors.root?.message}</FieldError>
			</FieldGroup>

			<Button type="submit" className="w-full" disabled={isLoading}>
				Login
			</Button>
		</form>
	);
}

export { LoginForm };
