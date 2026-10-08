import { Topic } from "@/models/topic.model";

export async function createTopic(title: string = "JavaScript") {
	const topic = await Topic.create({
		title,
	});

	return topic.toObject();
}
