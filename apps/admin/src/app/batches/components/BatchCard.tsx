import { EllipsisVertical } from "lucide-react";

import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";
import { Dropdown, DropdownToggleButton } from "@repo/ui/dropdown";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";

import { AppLink } from "@/components/link/AppLink";
import { BatchDropdownMenu } from "./BatchDropdownMenu";

type BatchCardProps = {
	batch: BatchBaseSchema;
};

function BatchCard({ batch }: BatchCardProps) {
	return (
		<li className="flex items-center justify-between border bg-white rounded-md border-gray-300 px-4 py-2 dark:bg-neutral-800 dark:border-neutral-700">
			<div>
				<p className="font-semibold text-primary">
					<AppLink to={`/admin/batches/${batch.id}`}>{batch.name}</AppLink>
				</p>
				<span className="text-xs dark:text-neutral-300">
					{formatDateTime(batch.createdAt)}
				</span>
			</div>
			<Dropdown>
				<DropdownToggleButton>
					<EllipsisVertical />
				</DropdownToggleButton>
				<BatchDropdownMenu id={batch.id} />
			</Dropdown>
		</li>
	);
}

export { BatchCard };
