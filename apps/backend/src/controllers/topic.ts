import { createTopicSchema } from "@repo/schemas/topics/create.topic";
import { deleteTopicSchema } from "@repo/schemas/topics/delete.topic";
import { updateTopicSchema } from "@repo/schemas/topics/update.topic";
import { createController } from "@/lib/controller";
import { addTopicService } from "@/services/topic/add-topic.service";
import { deleteTopicService } from "@/services/topic/delete-topic.service";
import { getTopicService } from "@/services/topic/get-topics.service";
import { updateTopicService } from "@/services/topic/update-topic.service";

export const addTopicController = createController({
	schema: createTopicSchema,
	requireAuth: true,
	handler: addTopicService,
});

export const getTopicsController = createController({
	schema: {},
	requireAuth: true,
	handler: getTopicService,
});

export const updateTopicController = createController({
	schema: updateTopicSchema,
	requireAuth: true,
	handler: updateTopicService,
});

export const deleteTopicController = createController({
	schema: deleteTopicSchema,
	requireAuth: true,
	handler: deleteTopicService,
});
