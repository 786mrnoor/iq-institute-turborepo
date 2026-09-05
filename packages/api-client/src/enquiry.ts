import type { CreateEnquirySchema } from "@repo/schemas/enquiry/create.enquiry";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.ts";
import z from "zod";

export const createEnquiryApi = (data: CreateEnquirySchema["body"]) =>
	customFetch(z.null(), {
		path: "/api/enquiries",
		method: "POST",
		body: data,
	});
