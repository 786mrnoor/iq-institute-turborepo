import z from "zod";

import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { studentBaseSchema } from "@repo/schemas/students/base.student";

export const studentFormSchema = z.object({
	...studentBaseSchema.pick({
		name: true,
		gender: true,
		fatherName: true,
		motherName: true,
		mobile: true,
		address: true,
	}).shape,
	dob: z.iso.date("Enter a valid date"),
	apaarId: emptyStringToUndefined(studentBaseSchema.shape.apaarId),
	adharNo: emptyStringToUndefined(studentBaseSchema.shape.adharNo),
	email: emptyStringToUndefined(studentBaseSchema.shape.email),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
export type StudentFormInput = z.input<typeof studentFormSchema>;
