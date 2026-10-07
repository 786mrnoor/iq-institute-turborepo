import { Topic } from "@/models/topic.model";

export async function createTopic() {
	const topic = await Topic.create({
		title: "JavaScript",
	});

	return topic.toObject();
}
