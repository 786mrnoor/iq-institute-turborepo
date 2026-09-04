import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Topic } from "@/models/topic.model";
import { topicDto } from "@/utils/dtos/topicDto";

async function getTopicService(_ctx: AuthControllerContext) {
	const topics = await Topic.find({ deletedAt: null }).lean().exec();

	return response(
		200,
		topics.map((t) => topicDto(t)),
	);
}

export { getTopicService };
