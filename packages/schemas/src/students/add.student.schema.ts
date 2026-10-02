import z from "zod";

import { checkYearsAgo } from "@repo/utils/date/check-years-ago.ts";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { studentBaseSchema } from "./base.student.schema";

const addStudentBody = z.object({
	...studentBaseSchema.pick({
		name: true,
		gender: true,
		fatherName: true,
		motherName: true,
		adharNo: true,
		apaarId: true,
		mobile: true,
		email: true,
		address: true,
		registeredAt: true,
	}).shape,
	dob: z.iso
		.date("Enter a valid date (e.g., 2000-01-31)")
		.transform((dob) => new Date(dob)) // UTC time because it's date-only
		.refine((dob) => checkYearsAgo(5, dob), {
			error: "Date of birth must be at least 5 years ago",
		}),
});

export const addStudentSchema = {
	body: addStudentBody,
};

export type AddStudentSchema = InferRequestShape<typeof addStudentSchema>;
export type AddStudentInput = InferRequestInput<typeof addStudentSchema>;
