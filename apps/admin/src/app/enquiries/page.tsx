import { Suspense, useState } from "react";

import { ErrorScreen } from "@repo/ui/error-screen";
import { SkeletonTable } from "@repo/ui/skeleton";

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
		<main className="mx-auto my-5 w-96/100">
			<EnquiryFilterForm onSubmit={onSubmit} />

			<ErrorScreen title="Error Loading Courses">
				<Suspense fallback={<SkeletonTable className="mt-5" />}>
					{filter && <EnquiryListing filter={filter} />}
				</Suspense>
			</ErrorScreen>
		</main>
	);
}

export { EnquiriesPage };
