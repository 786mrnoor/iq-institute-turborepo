"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginData, loginSchema } from "@repo/schemas/auth/login";
import { Button } from "@repo/ui/button";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(data: LoginData) {
		try {
			console.log(data);
			toast.success("Logged in Successfully");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
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
