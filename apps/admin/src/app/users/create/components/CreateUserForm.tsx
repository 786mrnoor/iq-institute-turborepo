import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CreateUserSchema,
	createUserSchema,
} from "@repo/schemas/users/create.user";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Select } from "@repo/ui/form-controls";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.ts";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userMutations } from "@/queries/users";
import { DEFAULT_VALUES } from "./form-data";

function CreateUserForm() {
	const { mutateAsync } = useMutation(userMutations.create);

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(createUserSchema.body),
	});

	async function onSubmit(data: CreateUserSchema["body"]) {
		try {
			await mutateAsync(data);
			toast.success("User Created Successfully");
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message);
				applyBackendErrors(error, setError);
			}
		}
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(DEFAULT_VALUES);
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col items-center gap-3"
		>
			<FieldGroup>
				<FieldLabel htmlFor="role">Select User Role</FieldLabel>
				<Select id="role" {...register("role")} className="capitalize">
					{Object.values(createUserSchema.body.shape.role.enum).map((r) => (
						<option key={r} value={r}>
							{r}
						</option>
					))}
				</Select>
				<FieldError>{errors.role?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="name">Name</FieldLabel>
				<Input autoFocus id="name" {...register("name")} />
				<FieldError>{errors.name?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Input id="email" {...register("email")} />
				<FieldError>{errors.email?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="password">Password</FieldLabel>
				<Input id="password" {...register("password")} />
				<FieldError>{errors.password?.message}</FieldError>
				<FieldError>{errors.root?.message}</FieldError>
			</FieldGroup>

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				Create User
			</Button>
		</form>
	);
}

export { CreateUserForm };
