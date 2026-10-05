import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect } from "react";
import { type UseFormSetError, useForm } from "react-hook-form";

import { BATCH_STATUS } from "@repo/schemas/batch/base.batch";
import { Button, ButtonGroup } from "@repo/ui/button";
import { ErrorScreen } from "@repo/ui/error-screen";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Select } from "@repo/ui/form-controls";
import { SkeletonFieldGroup } from "@repo/ui/skeleton";

import {
	type BatchFormData,
	type BatchFormInput,
	batchFormSchema,
} from "./batch.schema";
import { CourseField } from "./components/CourseField";
import { TeacherField } from "./components/TeacherField";

type BatchFormProps = {
	onSubmit: (
		data: BatchFormData,
		setError: UseFormSetError<BatchFormInput>,
	) => Promise<unknown>;
	defaultValues: BatchFormInput;
};

function BatchForm({ onSubmit, defaultValues }: BatchFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({
		defaultValues,
		resolver: zodResolver(batchFormSchema),
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
			<ErrorScreen title="Error loading courses">
				<Suspense fallback={<SkeletonFieldGroup />}>
					<CourseField register={register} error={errors.courseId?.message} />
				</Suspense>
			</ErrorScreen>

			<ErrorScreen title="Error loading teachers">
				<Suspense fallback={<SkeletonFieldGroup />}>
					<TeacherField register={register} error={errors.teacherId?.message} />
				</Suspense>
			</ErrorScreen>

			<FieldGroup>
				<FieldLabel htmlFor="name">Batch name</FieldLabel>
				<Input
					id="name"
					placeholder="Enter Student Name"
					isInvalid={!!errors.name?.message}
					{...register("name")}
				/>
				<FieldError>{errors.name?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="code">Batch code</FieldLabel>
				<Input
					id="code"
					placeholder="Enter Batch Code"
					isInvalid={!!errors.code?.message}
					{...register("code")}
				/>
				<FieldError>{errors.code?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="startDate">Batch start date</FieldLabel>
				<Input
					id="startDate"
					type="date"
					isInvalid={!!errors.startDate?.message}
					{...register("startDate")}
				/>
				<FieldError>{errors.startDate?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="endDate">Batch end date</FieldLabel>
				<Input
					id="endDate"
					type="date"
					isInvalid={!!errors.endDate?.message}
					{...register("endDate")}
				/>
				<FieldError>{errors.endDate?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="capacity">Batch capacity</FieldLabel>
				<Input
					id="capacity"
					placeholder="Enter Batch Capacity"
					isInvalid={!!errors.capacity?.message}
					{...register("capacity")}
				/>
				<FieldError>{errors.capacity?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="startTime">Batch start time</FieldLabel>
				<Input
					id="startTime"
					type="time"
					isInvalid={!!errors.schedule?.startTime?.message}
					{...register("schedule.startTime")}
				/>
				<FieldError>{errors.schedule?.startTime?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="endTime">Batch end time</FieldLabel>
				<Input
					id="endTime"
					type="time"
					isInvalid={!!errors.schedule?.endTime?.message}
					{...register("schedule.endTime")}
				/>
				<FieldError>{errors.schedule?.endTime?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="status">Batch status</FieldLabel>
				<Select
					id="status"
					isInvalid={!!errors.status?.message}
					{...register("status")}
					className="capitalize"
				>
					{BATCH_STATUS.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</Select>
				<FieldError>{errors.status?.message}</FieldError>
			</FieldGroup>

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

export { BatchForm };
