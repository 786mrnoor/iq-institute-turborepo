import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type UseFormSetError, useForm } from "react-hook-form";

import { Button, ButtonGroup } from "@repo/ui/button";
import { FieldError } from "@repo/ui/field";

import { BasicDetails } from "./components/BasicDetails";
import { ContactDetails } from "./components/ContactDetails";
import {
	type StudentFormData,
	type StudentFormInput,
	studentFormSchema,
} from "./student.schema";

type StudentFormProps = {
	onSubmit: (
		data: StudentFormData,
		setError: UseFormSetError<StudentFormInput>,
	) => Promise<unknown>;
	defaultValues: StudentFormInput;
};

function StudentForm({ onSubmit, defaultValues }: StudentFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({
		defaultValues,
		resolver: zodResolver(studentFormSchema),
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
			className="flex w-full flex-col gap-3"
		>
			<BasicDetails register={register} errors={errors} />
			<ContactDetails register={register} errors={errors} />

			<FieldError>{errors?.root?.message}</FieldError>

			<ButtonGroup className="w-full">
				<Button
					color="success"
					type="submit"
					className="flex-1"
					disabled={isSubmitting}
				>
					Submit
				</Button>

				<Button
					type="button"
					className="flex-1"
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

export { StudentForm };
