import z from "zod";

import { indianMobileSchema } from "../shared/indian-mobile.schema";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";

export const enquiryBaseSchema = z
	.object({
		id: objectIdSchema.brand("enquiryId"),

		course: z
			.string("Course is required.")
			.trim()
			.min(3, "Course must be selected"),
		name: z
			.string("Name is required")
			.trim()
			.min(3, "Name must be at least 3 characters long"),
		mobile: indianMobileSchema,
		address: z
			.string("Address is required")
			.trim()
			.min(5, "Address must be at least 5 characters long"),
		status: z.enum(["pending", "reviewed", "contacted"]).default("pending"),
	})
	.extend(timestampSchema);

export type EnquiryBaseSchema = z.infer<typeof enquiryBaseSchema>;
