import type { GetEnquiriesSchema } from "@repo/schemas/enquiry/get.enquiries";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Enquiry } from "@/models/enquiry.model";
import { enquiryDto } from "@/utils/dtos/enquiryDto";

async function getEnquiriesService({
	input,
}: AuthControllerContext<GetEnquiriesSchema>) {
	const { status, fromDate, toDate, page, limit } = input.query;

	const filter = {
		...(status && { status }),
		createdAt: {
			$gte: fromDate,
			$lte: toDate,
		},
	};

	const skip = (page - 1) * limit;

	const totalCount = await Enquiry.countDocuments(filter);
	const enquiries = await Enquiry.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec();

	return response(200, {
		enquiries: enquiries.map((e) => enquiryDto(e)),
		meta: { page, limit, totalCount },
	});
}

export { getEnquiriesService };
