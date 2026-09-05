import type { InferRequestShape } from "../request.types";
import { enquiryBaseSchema } from "./base.enquiry.schema";

export const updateEnquiryStatusSchema = {
	params: enquiryBaseSchema.pick({
		id: true,
	}),
	body: enquiryBaseSchema.pick({
		status: true,
	}),
};

export type UpdateEnquiryStatusSchema = InferRequestShape<
	typeof updateEnquiryStatusSchema
>;
