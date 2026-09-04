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
		<li className="flex items-center justify-between border border-gray-300 px-4 py-2 not-first:border-t-0 first:rounded-t-md last:rounded-b-md last:border-b">
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
