import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Pagination } from "@repo/ui/pagination";

import { enquiriesQueries } from "@/queries/enquiry";
import type { EnquiryFilterFormData } from "./enquiry-filter-form/schema";
import { EnquiriesTable } from "./enquiry-table/EnquiriesTable";

type EnquiryListingProps = {
	filter: EnquiryFilterFormData;
};

function EnquiryListing({ filter }: EnquiryListingProps) {
	const [page, setPage] = useState(1);
	const [previousFilter, setPreviousFilter] = useState(filter);

	if (filter !== previousFilter) {
		setPreviousFilter(filter);
		setPage(1);
	}

	const { data } = useSuspenseQuery(
		enquiriesQueries.list({ ...previousFilter, page, limit: 10 }),
	);

	if (!data || data?.enquiries?.length === 0)
		return <p className="text-center text-lg mt-5">No Enqiries Found</p>;

	const { enquiries, meta } = data;

	return (
		<>
			<p className="mt-5 w-max bg-primary px-8 py-1 text-lg text-white">
				Total Enquiries: {meta?.totalCount}
			</p>

			<EnquiriesTable enquiries={enquiries} />

			<Pagination
				page={meta.page}
				total={meta.totalCount}
				limit={meta.limit}
				onChange={setPage}
			/>
		</>
	);
}

export { EnquiryListing };
