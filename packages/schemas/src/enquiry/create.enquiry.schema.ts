import type { InferRequestShape } from "../request.types";
import { enquiryBaseSchema } from "./base.enquiry.schema";

export const createEnquirySchema = {
	body: enquiryBaseSchema.pick({
		course: true,
		name: true,
		mobile: true,
		address: true,
	}),
};

export type CreateEnquirySchema = InferRequestShape<typeof createEnquirySchema>;
