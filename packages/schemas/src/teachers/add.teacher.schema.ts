import z from "zod";

import { checkYearsAgo } from "@repo/utils/date/check-years-ago.ts";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { teacherBaseSchema } from "./base.teacher.schema";

const addTeacherBody = z.object({
	name: teacherBaseSchema.shape.name,
	gender: teacherBaseSchema.shape.gender,
	adharNo: teacherBaseSchema.shape.adharNo,
	mobile: teacherBaseSchema.shape.mobile,
	email: teacherBaseSchema.shape.email,
	address: teacherBaseSchema.shape.address,
	joinedAt: teacherBaseSchema.shape.joinedAt,

	dob: z.iso
		.date("Enter a valid date (e.g., 2000-01-31)")
		.transform((dob) => new Date(dob)) // UTC time because it's date-only
		.refine((dob) => checkYearsAgo(10, dob), {
			error: "Date of birth must be at least 10 years ago",
		}),
});

export const addTeacherSchema = {
	body: addTeacherBody,
};

export type AddTeacherSchema = InferRequestShape<typeof addTeacherSchema>;
export type AddTeacherInput = InferRequestInput<typeof addTeacherSchema>;
