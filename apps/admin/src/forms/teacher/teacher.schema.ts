import z from "zod";

import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { teacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { checkYearsAgo } from "@repo/utils/date/check-years-ago.js";

export const teacherFormSchema = z.object({
	...teacherBaseSchema.pick({
		name: true,
		gender: true,
		adharNo: true,
		mobile: true,
		address: true,
	}).shape,
	dob: z.iso
		.date("Enter a valid date")
		.refine((dob) => checkYearsAgo(10, new Date(dob)), {
			error: "Date of birth must be at least 10 years ago",
		}),
	email: emptyStringToUndefined(teacherBaseSchema.shape.email),
	joinedAt: z.iso
		.date("Enter a valid date")
		.transform((date) => new Date(date)),
});

export type TeacherFormData = z.infer<typeof teacherFormSchema>;
export type TeacherFormInput = z.input<typeof teacherFormSchema>;
