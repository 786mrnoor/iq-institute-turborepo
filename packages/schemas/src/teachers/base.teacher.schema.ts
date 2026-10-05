import z from "zod";

import { indianMobileSchema } from "../shared/indian-mobile.schema";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";

export const teacherBaseSchema = z
	.object({
		id: objectIdSchema.brand("teacherId"),
		teacherId: z
			.string("Teacher Id is required")
			.regex(/^TCH-[0-9A-Z]{6}$/, "Invalid teacher ID format"),
		name: z
			.string("Teacher name is required")
			.trim()
			.min(3, "Teacher name must contain at least 3 characters")
			.max(100, "Teacher name cannot exceed 100 characters")
			.toUpperCase(),

		dob: z.coerce.date({
			message: "Invalid date of birth",
		}),
		gender: z.enum(["male", "female"]),

		adharNo: z
			.string()
			.regex(/^[0-9]+$/, {
				message: "Aadhaar number must contain only numbers.",
			})
			.length(12, {
				message: "Aadhaar number must be exactly 12 characters long.",
			}),

		mobile: indianMobileSchema,
		email: z.email("Invalid email address").trim().toLowerCase().optional(),
		address: z
			.string("Address is required")
			.trim()
			.min(5, "Address must contain at least 5 characters")
			.max(500, "Address cannot exceed 500 characters"),

		joinedAt: z.coerce.date(),
		leftAt: z.coerce.date().nullish(),

		deletedAt: z.coerce.date().nullish(),
	})
	.extend(timestampSchema);

export type TeacherBaseSchema = z.infer<typeof teacherBaseSchema>;
