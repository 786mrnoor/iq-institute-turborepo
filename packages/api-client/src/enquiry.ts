import z from "zod";

import { enquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";
import type { CreateEnquirySchema } from "@repo/schemas/enquiry/create.enquiry";
import type { GetEnquiriesSchema } from "@repo/schemas/enquiry/get.enquiries";
import type { UpdateEnquiryStatusSchema } from "@repo/schemas/enquiry/update.enquiry.status";
import { paginationSchema } from "@repo/schemas/shared/pagination";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.ts";

export const createEnquiryApi = (data: CreateEnquirySchema["body"]) =>
	customFetch(z.null(), {
		path: "/api/enquiries",
		method: "POST",
		body: data,
	});

export const getEnquiriesApi = (query: GetEnquiriesSchema["query"]) =>
	customFetch(
		z.object({ enquiries: enquiryBaseSchema.array(), meta: paginationSchema }),
		{
			path: "/api/enquiries",
			query,
			method: "GET",
		},
	);

export const updateEnquiryStatusApi = (
	data: Omit<UpdateEnquiryStatusSchema, "query">,
) =>
	customFetch(z.null(), {
		path: `/api/enquiries/${data.params.id}`,
		method: "PATCH",
		body: data.body,
	});
