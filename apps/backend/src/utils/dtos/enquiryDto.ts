import type { EnquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";

import type { TEnquiry } from "@/models/enquiry.model";

export function enquiryDto(doc: TEnquiry) {
	const { _id, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
	} as EnquiryBaseSchema;
}
