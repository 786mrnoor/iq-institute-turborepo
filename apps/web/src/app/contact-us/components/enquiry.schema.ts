import type z from "zod";

import { enquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";

export const enquiryFormSchema = enquiryBaseSchema.pick({
	course: true,
	name: true,
	mobile: true,
	address: true,
});

export type EnquiryFormData = z.infer<typeof enquiryFormSchema>;
export type EnquiryFormInput = z.input<typeof enquiryFormSchema>;
