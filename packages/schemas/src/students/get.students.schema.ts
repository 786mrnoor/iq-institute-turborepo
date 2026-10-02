import z from "zod";

import type { InferRequestShape } from "../request.types";
import { studentBaseSchema } from "./base.student.schema";

export const getStudentsSchema = {
	query: z
		.object({
			fromDate: z.coerce.date("Enter a valid date"),
			toDate: z.coerce.date("Enter a valid date"),
			adharNo: studentBaseSchema.shape.adharNo.optional(),
			apaarId: studentBaseSchema.shape.apaarId,
			page: z.coerce.number().default(1),
			limit: z.coerce.number().default(10),
		})
		.refine((data) => data.fromDate <= data.toDate, {
			message: "To date must be after From date",
			path: ["toDate"],
		}),
};

export type GetStudentsSchema = InferRequestShape<typeof getStudentsSchema>;
