import { createEnquirySchema } from "@repo/schemas/enquiry/create.enquiry";
import { getEnquiriesSchema } from "@repo/schemas/enquiry/get.enquiries";
import { updateEnquiryStatusSchema } from "@repo/schemas/enquiry/update.enquiry.status";
import { createController } from "@/lib/controller";
import { createEnquiryService } from "@/services/enquiry/create-enquiry.service";
import { getEnquiriesService } from "@/services/enquiry/get-enquiries.service";
import { updateEnquiryStatusService } from "@/services/enquiry/update-enquiry-status.service";

export const addEnquiryController = createController({
	schema: createEnquirySchema,
	requireAuth: false,
	handler: createEnquiryService,
});

export const getEnquirysController = createController({
	schema: getEnquiriesSchema,
	requireAuth: true,
	handler: getEnquiriesService,
});

export const updateEnquiryController = createController({
	schema: updateEnquiryStatusSchema,
	requireAuth: true,
	handler: updateEnquiryStatusService,
});
