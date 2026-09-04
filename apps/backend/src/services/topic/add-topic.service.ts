import type { CreateTopicSchema } from "@repo/schemas/topics/create.topic";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Topic } from "@/models/topic.model";

async function addTopicService({
	input,
}: AuthControllerContext<CreateTopicSchema>) {
	try {
		const topic = input.body;

		const newTopic = new Topic(topic);
		await newTopic.save();
		return response(201, newTopic);
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"code" in error &&
			error.code === 11000
		) {
			throw new AppError(409, "topic is already in use.", {
				path: "title",
				message: "topic is already in use.",
			});
		}
		throw error;
	}
}

export { addTopicService };
