import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { AppError } from "@repo/utils/app-error.js";
import { Topic } from "@/models/topic.model";

async function checkTopics(topicIds: TopicBaseSchema["id"][]) {
	// Find existing topics
	const existingTopics = await Topic.find({
		_id: { $in: topicIds },
		deletedAt: null,
	}).select("_id");

	// Compare counts
	if (existingTopics.length !== topicIds.length) {
		throw new AppError(404, "One or more topics do not exist");
	}
}

export { checkTopics };
