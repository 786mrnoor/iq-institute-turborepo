import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { Dropdown, DropdownToggleButton } from "@repo/ui/dropdown";
import { Dots } from "@repo/ui/icons/Dots.tsx";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";
import { TopicDropdownMenu } from "./TopicDropdownMenu";

type TopicCardProps = {
	topic: TopicBaseSchema;
};

function TopicCard({ topic }: TopicCardProps) {
	return (
		<li className="flex items-center justify-between bg-white rounded-md px-4 py-2 border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700">
			<div>
				<p className="font-semibold">{topic.title}</p>
				<span className="text-xs">{formatDateTime(topic.createdAt)}</span>
			</div>

			<Dropdown>
				<DropdownToggleButton>
					<Dots />
				</DropdownToggleButton>
				<TopicDropdownMenu id={topic.id} />
			</Dropdown>
		</li>
	);
}

export { TopicCard };
