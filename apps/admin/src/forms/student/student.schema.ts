import z from "zod";

import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { studentBaseSchema } from "@repo/schemas/students/base.student";
import { checkYearsAgo } from "@repo/utils/date/check-years-ago.js";

export const studentFormSchema = z.object({
	...studentBaseSchema.pick({
		name: true,
		gender: true,
		fatherName: true,
		motherName: true,
		adharNo: true,
		mobile: true,
		address: true,
	}).shape,
	dob: z.iso
		.date("Enter a valid date")
		.refine((dob) => checkYearsAgo(5, new Date(dob)), {
			error: "Date of birth must be at least 5 years ago",
		}),
	apaarId: emptyStringToUndefined(studentBaseSchema.shape.apaarId),
	email: emptyStringToUndefined(studentBaseSchema.shape.email),
	registeredAt: z.iso
		.date("Enter a valid date")
		.transform((date) => new Date(date)),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
export type StudentFormInput = z.input<typeof studentFormSchema>;
