import z from "zod";
import type { InferRequestShape } from "../request.types";
import { enquiryBaseSchema } from "./base.enquiry.schema";

export const getEnquiriesSchema = {
	query: z
		.object({
			status: enquiryBaseSchema.shape.status.unwrap().optional(),
			fromDate: z.coerce.date("Enter a valid date"),
			toDate: z.coerce.date("Enter a valid date"),
			page: z.coerce.number().default(1),
			limit: z.coerce.number().default(10),
		})
		.refine((data) => data.fromDate <= data.toDate, {
			message: "To date must be after From date",
			path: ["toDate"],
		}),
};

export type GetEnquiriesSchema = InferRequestShape<typeof getEnquiriesSchema>;
