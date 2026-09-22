import type { CreateTopicSchema } from "@repo/schemas/topics/create.topic";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Topic } from "@/models/topic.model";
import { topicDto } from "@/utils/dtos/topicDto";

async function addTopicService({
	input,
}: AuthControllerContext<CreateTopicSchema>) {
	try {
		const topic = input.body;

		const newTopic = new Topic(topic);
		await newTopic.save();
		return response(201, topicDto(newTopic.toObject()));
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

export { addTopicService };
