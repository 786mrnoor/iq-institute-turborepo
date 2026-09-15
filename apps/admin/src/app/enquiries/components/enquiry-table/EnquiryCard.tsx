import type { EnquiryBaseSchema } from "@repo/schemas/enquiry/base.enquiry";
import { Button } from "@repo/ui/button";
import { Select } from "@repo/ui/form-controls";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
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
		<tr className="*:border *:border-gray-300 *:p-2 odd:bg-gray-100 dark:*:border-neutral-700 dark:odd:bg-neutral-900">
			<td>
				{enquiry.name} <br />
				<span className="text-xs">{formatDateTime(enquiry.createdAt)}</span>
			</td>
			<td>{enquiry.mobile}</td>
			<td>{enquiry.address}</td>
			<td>{enquiry.course}</td>
			<td>{enquiry.status}</td>
			<td>
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
			</td>
		</tr>
	);
}

export { EnquiryCard };
