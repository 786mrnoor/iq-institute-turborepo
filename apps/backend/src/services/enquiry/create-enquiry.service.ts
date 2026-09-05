import type { CreateEnquirySchema } from "@repo/schemas/enquiry/create.enquiry";
import { response } from "@/lib/controller";
import type { PublicControllerContext } from "@/lib/controller/types";
import { Enquiry } from "@/models/enquiry.model";

async function createEnquiryService({
	input,
}: PublicControllerContext<CreateEnquirySchema>) {
	const newEnquiry = new Enquiry(input.body);
	await newEnquiry.save();

	return response(201, null);
}

export { createEnquiryService };
