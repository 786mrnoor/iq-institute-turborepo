import { createTopicSchema } from "@repo/schemas/topics/create.topic";
import { createController } from "@/lib/controller";
import { addTopicService } from "@/services/topic/add-topic.service";

export const addTopicController = createController({
	schema: createTopicSchema,
	requireAuth: true,
	handler: addTopicService,
});
