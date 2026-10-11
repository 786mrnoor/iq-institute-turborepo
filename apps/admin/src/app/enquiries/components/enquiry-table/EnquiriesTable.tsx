import type { EnquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@repo/ui/table";

import { EnquiryCard } from "./EnquiryCard";

type EnquiriesTableProps = {
	enquiries: EnquiryBaseSchema[];
};

function EnquiriesTable({ enquiries }: EnquiriesTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Mobile</TableHead>
					<TableHead>Address</TableHead>
					<TableHead>Course</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Update</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{enquiries?.map((enquiry) => (
					<EnquiryCard key={enquiry.id} enquiry={enquiry} />
				))}
			</TableBody>
		</Table>
	);
}

export { EnquiriesTable };
