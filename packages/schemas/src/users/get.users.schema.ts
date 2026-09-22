import z from "zod";

import type { InferRequestShape } from "../request.types";
import { userBaseSchema } from "./base.user.schema";

const getUsersBody = z
	.object({
		role: userBaseSchema.shape.role.optional(),
		status: userBaseSchema.shape.status.optional(),
		fromDate: z.coerce.date("Enter a valid date"),
		toDate: z.coerce.date("Enter a valid date"),
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(10),
	})
	.refine((data) => data.fromDate <= data.toDate, {
		message: "To date must be after From date",
		path: ["toDate"],
	});
export const getUsersSchema = {
	query: getUsersBody,
};

export type GetUsersSchema = InferRequestShape<typeof getUsersSchema>;
