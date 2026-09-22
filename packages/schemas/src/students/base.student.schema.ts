import z from "zod";

import { indianMobileSchema } from "../shared/indian-mobile.schema";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";

export const studentBaseSchema = z
	.object({
		id: objectIdSchema.brand("studentId"),
		studentId: z
			.string("Student Id is required")
			.regex(/^STU-\d{4}-[0-9A-Z]{6}$/, "Invalid student ID format"),
		name: z
			.string("Student name is required")
			.trim()
			.min(3, "Student name must contain at least 3 characters")
			.max(100, "Student name cannot exceed 100 characters")
			.toUpperCase(),

		dob: z.coerce.date({
			message: "Invalid date of birth",
		}),
		gender: z.enum(["male", "female"]),
		fatherName: z
			.string("Father's name is required")
			.trim()
			.min(3, "Father's name must contain at least 3 characters")
			.max(100, "Father's name cannot exceed 100 characters")
			.toUpperCase(),
		motherName: z
			.string("Mother's name is required")
			.trim()
			.min(3, "Mother's name must contain at least 3 characters")
			.max(100, "Mother's name cannot exceed 100 characters")
			.toUpperCase(),

		adharNo: z
			.string()
			.regex(/^[0-9]+$/, {
				message: "Aadhaar number must contain only numbers.",
			})
			.length(12, {
				message: "Aadhaar number must be exactly 12 characters long.",
			})
			.optional(),

		apaarId: z
			.string()
			.regex(/^[0-9]+$/, { message: "APAAR ID must contain only numbers." })
			.length(12, { message: "APAAR ID must be exactly 12 characters long." })
			.optional(),

		mobile: indianMobileSchema,

		email: z.email("Invalid email address").trim().toLowerCase().optional(),

		address: z
			.string("Address is required")
			.trim()
			.min(5, "Address must contain at least 5 characters")
			.max(500, "Address cannot exceed 500 characters"),

		deletedAt: z.date().nullish(),
	})
	.extend(timestampSchema);

export type StudentBaseSchema = z.infer<typeof studentBaseSchema>;
