import type { EnquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";

import { EnquiryCard } from "./EnquiryCard";

type EnquiriesTableProps = {
	enquiries: EnquiryBaseSchema[];
};

function EnquiriesTable({ enquiries }: EnquiriesTableProps) {
	return (
		<div className="overflow-auto bg-white mb-3 p-2 md:p-4 border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
			<table
				border={1}
				className="mb-4 w-full border border-gray-300 dark:border-neutral-700"
			>
				<thead className="bg-black text-white">
					<tr className="*:border *:border-gray-300 *:p-2 dark:*:border-neutral-700">
						<th>Name</th>
						<th>Mobile</th>
						<th>Address</th>
						<th>Course</th>
						<th>Status</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{enquiries?.map((enquiry) => (
						<EnquiryCard key={enquiry.id} enquiry={enquiry} />
					))}
				</tbody>
			</table>
		</div>
	);
}

export { EnquiriesTable };
