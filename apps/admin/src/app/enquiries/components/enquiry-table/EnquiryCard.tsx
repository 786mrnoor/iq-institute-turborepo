import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import type { EnquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";
import { Button } from "@repo/ui/button";
import { Select } from "@repo/ui/form-controls";
import { TableCell, TableRow } from "@repo/ui/table";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";

import { enquirysMutations } from "@/queries/enquiry";

type EnquiryCardProps = {
	enquiry: EnquiryBaseSchema;
};

function EnquiryCard({ enquiry }: EnquiryCardProps) {
	const [enquiryStatus, setEnquiryStatus] = useState(enquiry.status);

	const { mutateAsync, isPending } = useMutation(enquirysMutations.update);

	async function onUpdate() {
		try {
			await mutateAsync({
				params: { id: enquiry.id },
				body: { status: enquiryStatus },
			});
			toast.success("Enquiry Status Updated Successfully");
		} catch (error) {
			if (error instanceof Error) toast.error(error.message);
			setEnquiryStatus(enquiry.status);
		}
	}

	return (
		<TableRow>
			<TableCell>
				{enquiry.name} <br />
				<span className="text-xs">{formatDateTime(enquiry.createdAt)}</span>
			</TableCell>
			<TableCell>{enquiry.mobile}</TableCell>
			<TableCell>{enquiry.address}</TableCell>
			<TableCell>{enquiry.course}</TableCell>
			<TableCell>{enquiry.status}</TableCell>
			<TableCell>
				<Select
					name="status"
					value={enquiryStatus}
					onChange={(e) =>
						setEnquiryStatus(e.target.value as EnquiryBaseSchema["status"])
					}
					className="min-w-max"
					size="small"
					disabled={isPending}
				>
					<option value="pending">Pending</option>
					<option value="reviewed">Reviewed</option>
					<option value="contacted">Contacted</option>
				</Select>
				<Button
					type="button"
					size="small"
					disabled={isPending}
					onClick={onUpdate}
				>
					Update
				</Button>
			</TableCell>
		</TableRow>
	);
}

export { EnquiryCard };
