import type { UpdateEnquiryStatusSchema } from "@repo/schemas/enquiry/update.enquiry.status";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Enquiry } from "@/models/enquiry.model";

async function updateEnquiryStatusService({
	input,
}: AuthControllerContext<UpdateEnquiryStatusSchema>) {
	const id = input.params.id;
	const status = input.body.status;

	const result = await Enquiry.updateOne({ _id: id }, { status });

	if (result.modifiedCount === 1) {
		return response(200, null);
	}

	throw new AppError(400, "Enquiry status could not be updated successfully");
}

export { updateEnquiryStatusService };
