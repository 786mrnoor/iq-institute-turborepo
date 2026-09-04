import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import type { TTopic } from "@/models/topic.model";

export function topicDto(doc: TTopic): TopicBaseSchema {
	const { _id, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
	} as TopicBaseSchema;
}
