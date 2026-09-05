import {
	getEnquiriesApi,
	updateEnquiryStatusApi,
} from "@repo/api-client/enquiry.ts";
import type { GetEnquiriesSchema } from "@repo/schemas/enquiry/get.enquiries";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const enquiriesKeys = {
	all: ["enquirys"] as const,
	lists: () => [...enquiriesKeys.all, "list"] as const,
	list: (filters: GetEnquiriesSchema["query"]) =>
		[...enquiriesKeys.lists(), filters] as const,
};

export const enquiriesQueries = {
	list: (query: GetEnquiriesSchema["query"]) =>
		queryOptions({
			queryKey: enquiriesKeys.list(query),
			queryFn: () => getEnquiriesApi(query),
		}),
};

export const enquirysMutations = {
	update: mutationOptions({
		mutationFn: updateEnquiryStatusApi,
		onSuccess(_, __, ___, { client }) {
			client.invalidateQueries({ queryKey: enquiriesKeys.lists() });
		},
	}),
};
