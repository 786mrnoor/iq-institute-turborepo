import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type UseFormSetError, useForm } from "react-hook-form";

import { Button, ButtonGroup } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input } from "@repo/ui/form-controls";

import {
	type FormTopicData,
	type FormTopicInput,
	formTopicSchema,
} from "./topic.schema";

type TopicFormProps = {
	onSubmit: (
		data: FormTopicData,
		setError: UseFormSetError<FormTopicData>,
	) => Promise<unknown>;
	defaultValues: FormTopicInput;
};

function TopicForm({ onSubmit, defaultValues }: TopicFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({
		defaultValues,
		resolver: zodResolver(formTopicSchema),
	});

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(defaultValues);
		}
	}, [isSubmitSuccessful, reset, defaultValues]);

	return (
		<form
			onSubmit={handleSubmit((data) =>
				onSubmit(data, setError).catch((e) => console.log(e)),
			)}
			className="flex w-full flex-col items-end gap-3"
		>
			<FieldGroup>
				<FieldLabel htmlFor="title">Title</FieldLabel>
				<Input
					id="title"
					placeholder="Course Title"
					{...register("title")}
					isInvalid={!!errors.title?.message}
				/>
				<FieldError>{errors.title?.message}</FieldError>
				<FieldError>{errors.root?.message}</FieldError>
			</FieldGroup>

			<ButtonGroup>
				<Button type="submit" disabled={isSubmitting}>
					Submit
				</Button>

				<Button
					type="button"
					onClick={() => reset(defaultValues)}
					color="danger"
					disabled={isSubmitting}
				>
					Reset
				</Button>
			</ButtonGroup>
		</form>
	);
}

export { TopicForm };
