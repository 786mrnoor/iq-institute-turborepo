"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type UseFormSetError, useForm } from "react-hook-form";

import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { Button } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Select, Textarea } from "@repo/ui/form-controls";

import {
	type EnquiryFormData,
	type EnquiryFormInput,
	enquiryFormSchema,
} from "./enquiry.schema";

type EnquiryFormProps = {
	courses: CourseBaseSchema[];
	onSubmit: (
		data: EnquiryFormData,
		setError: UseFormSetError<EnquiryFormInput>,
	) => Promise<unknown>;
	defaultValues: EnquiryFormInput;
};

function EnquiryForm({ courses, onSubmit, defaultValues }: EnquiryFormProps) {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm({
		defaultValues,
		resolver: zodResolver(enquiryFormSchema),
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
			className="flex w-full flex-col gap-3 rounded-lg border border-gray-300 p-5 shadow-lg"
		>
			<h2 className="border-b border-gray-300 py-5 text-2xl font-bold">
				Enquiry Form
			</h2>
			<FieldGroup>
				<FieldLabel htmlFor="course">Course</FieldLabel>
				<Select isInvalid={!!errors.course?.message} {...register("course")}>
					<option value="">Select a course</option>
					{courses.map((c) => (
						<option key={c.id} value={c.title}>
							{c.title}
						</option>
					))}
				</Select>
				<FieldError>{errors.course?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="name">Name</FieldLabel>
				<Input
					id="name"
					placeholder="Enter Your Name"
					isInvalid={!!errors.name?.message}
					{...register("name")}
				/>
				<FieldError>{errors.name?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="mobile">Mobile No.</FieldLabel>
				<Input
					id="mobile"
					placeholder="Enter Your Mobile No."
					isInvalid={!!errors.mobile?.message}
					{...register("mobile")}
				/>
				<FieldError>{errors.mobile?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="address">Address</FieldLabel>
				<Textarea
					id="address"
					autoHeight
					className="max-h-50 min-h-20"
					placeholder="Enter Your Address"
					isInvalid={!!errors.address?.message}
					{...register("address")}
				/>
				<FieldError>{errors.address?.message}</FieldError>
			</FieldGroup>

			<FieldError>{errors?.root?.message}</FieldError>

			<Button type="submit" className="flex-1" disabled={isSubmitting}>
				Send
			</Button>
		</form>
	);
}

export { EnquiryForm };
