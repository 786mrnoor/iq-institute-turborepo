import type { UpdateTopicSchema } from "@repo/schemas/topics/update.topic";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Topic } from "@/models/topic.model";
import { topicDto } from "@/utils/dtos/topicDto";

async function updateTopicService({
	input,
}: AuthControllerContext<UpdateTopicSchema>) {
	try {
		const topic = input.body;
		const id = input.params.id;

		const newTopic = await Topic.findByIdAndUpdate(id, topic, {
			returnDocument: "after",
			runValidators: true,
		});
		if (!newTopic) {
			throw new AppError(404, "Topic could not be found.");
		}

		return response(200, topicDto(newTopic.toObject()));
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === 11000
		) {
			throw new AppError(409, "topic is already in use.", {
				path: "title",
				message: "Please enter a different topic title",
			});
		}
		throw error;
	}
}

export { updateTopicService };
