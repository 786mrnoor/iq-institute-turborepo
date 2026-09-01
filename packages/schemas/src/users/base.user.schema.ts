import z from "zod";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";
import { ROLES } from "./user-roles";

export const USER_STATUS = ["active", "inactive", "suspended"] as const;

const userIdSchema = objectIdSchema.brand("UserId");
export const userBaseSchema = z
	.object({
		id: userIdSchema,

		name: z
			.string("Please enter your name")
			.trim()
			.toUpperCase()
			.min(3, "Name must be at least 3 characters long"),

		email: z.email("Invalid email address").trim().toLowerCase(),
		role: z.enum(ROLES),
		status: z.enum(USER_STATUS).default("active"),
		lastLoginAt: z.date().optional(),
		passwordChangedAt: z.date().optional(),
		passwordChangedBy: userIdSchema.optional(),
		createdBy: userIdSchema.optional(),
	})
	.safeExtend(timestampSchema);

export type UserBaseSchema = z.infer<typeof userBaseSchema>;
