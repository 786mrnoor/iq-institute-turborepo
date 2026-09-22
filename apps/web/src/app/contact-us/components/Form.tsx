"use client";

import { useSearchParams } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

import { createEnquiryApi } from "@repo/api-client/enquiry.ts";
import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { applyBackendErrors } from "@repo/utils/apply-backend-errors.ts";

import { EnquiryForm } from "./EnquiryForm";
import type { EnquiryFormData, EnquiryFormInput } from "./enquiry.schema";

type FormProps = {
	courses: CourseBaseSchema[];
};

const DEFAULT_VALUES: EnquiryFormInput = {
	course: "",
	name: "",
	mobile: "",
	address: "",
};

function Form({ courses }: FormProps) {
	const searchParams = useSearchParams();
	const course = searchParams.get("course") || "";

	async function onSubmit(
		data: EnquiryFormData,
		setError: UseFormSetError<EnquiryFormInput>,
	) {
		try {
			await createEnquiryApi(data);
			toast.success("Enquiry send successfull");
		} catch (error: unknown) {
			if (error instanceof Error) {
				applyBackendErrors(error, setError);
			}
		}
	}

	return (
		<EnquiryForm
			courses={courses}
			onSubmit={onSubmit}
			defaultValues={{ ...DEFAULT_VALUES, course }}
		/>
	);
}

export { Form };
