import { ErrorScreen } from "@repo/ui/error-screen";
import { Heading } from "@repo/ui/heading";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense, useState } from "react";
import { EnquiryListing } from "./components/EnquiryListing";
import { EnquiryFilterForm } from "./components/enquiry-filter-form/EnquiryFilterForm";
import type { EnquiryFilterFormData } from "./components/enquiry-filter-form/schema";

function EnquiriesPage() {
	const [filter, setFilter] = useState<EnquiryFilterFormData | null>(null);

	function onSubmit(data: EnquiryFilterFormData) {
		const toDate = data.toDate;
		toDate.setHours(23, 59, 59, 999);

		setFilter({
			...data,
			toDate: toDate,
		});
	}

	return (
		<main className="mx-auto my-5 w-96/100 rounded-lg border border-gray-300 p-5 shadow-lg">
			<Heading>Enquiries</Heading>
			<EnquiryFilterForm onSubmit={onSubmit} />

			<ErrorScreen title="Error Loading Courses">
				<Suspense fallback={<QueryLoader>Loading Enquiries ...</QueryLoader>}>
					{filter && <EnquiryListing filter={filter} />}
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EnquiriesPage };
