import { zodResolver } from "@hookform/resolvers/zod";
import { DURATION_UNITS } from "@repo/schemas/course/base.course";
import { Button, ButtonGroup } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { FieldError, FieldGroup, FieldLabel, InputGroup } from "@repo/ui/field";
import { Input, Select, Textarea } from "@repo/ui/form-controls";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense, useEffect } from "react";
import { type UseFormSetError, useForm } from "react-hook-form";
import {
	type CourseFormData,
	type CourseFormInput,
	courseFormSchema,
} from "./course.schema";
import { TopicsFileds } from "./TopicsFields";

type CourseFormProps = {
	onSubmit: (
		data: CourseFormData,
		setError: UseFormSetError<CourseFormInput>,
	) => Promise<unknown>;
	defaultValues: CourseFormInput;
};

function CourseForm({ onSubmit, defaultValues }: CourseFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		control,
	} = useForm({
		defaultValues,
		resolver: zodResolver(courseFormSchema),
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
			<FieldGroup>
				<FieldLabel htmlFor="title">Title</FieldLabel>
				<Input
					autoFocus
					id="title"
					placeholder="Course Title"
					isInvalid={!!errors.title?.message}
					{...register("title")}
				/>
				<FieldError>{errors.title?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="duration">Course Duration</FieldLabel>
				<InputGroup>
					<Input
						id="duration"
						placeholder="Enter course duration"
						isInvalid={!!errors.duration?.value?.message}
						{...register("duration.value")}
					/>
					<Select
						isInvalid={!!errors.duration?.unit?.message}
						className="max-w-fit capitalize"
						{...register("duration.unit")}
					>
						{DURATION_UNITS.map((u) => (
							<option key={u} value={u}>
								{u}
							</option>
						))}
					</Select>
				</InputGroup>
				<FieldError>
					{errors.duration?.value?.message || errors?.duration?.unit?.message}
				</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="eligibility">Course Eligibility</FieldLabel>
				<Input
					id="eligibility"
					placeholder="Enter course eligibility"
					isInvalid={!!errors.eligibility?.message}
					{...register("eligibility")}
				/>
				<FieldError>{errors.eligibility?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="description">Course description</FieldLabel>
				<Textarea
					id="description"
					autoHeight
					className="max-h-50 min-h-20"
					placeholder="Enter course description"
					isInvalid={!!errors.description?.message}
					{...register("description")}
				/>
				<FieldError>{errors.description?.message}</FieldError>
			</FieldGroup>

			<ErrorScreen title="Error Loading Topics">
				<Suspense fallback={<QueryLoader>Loading topics...</QueryLoader>}>
					<TopicsFileds control={control} register={register} errors={errors} />
				</Suspense>
			</ErrorScreen>

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

export { CourseForm };
