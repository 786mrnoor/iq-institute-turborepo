import { createTopicSchema } from "@repo/schemas/topics/create.topic";
import { deleteTopicSchema } from "@repo/schemas/topics/delete.topic";
import { updateTopicSchema } from "@repo/schemas/topics/update.topic";

import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addTopicService } from "@/services/topic/add-topic.service";
import { deleteTopicService } from "@/services/topic/delete-topic.service";
import { getTopicService } from "@/services/topic/get-topics.service";
import { updateTopicService } from "@/services/topic/update-topic.service";

export const addTopicController = createController({
	schema: createTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_CREATE,
	handler: addTopicService,
});

export const getTopicsController = createController({
	schema: {},
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_READ,
	handler: getTopicService,
});

export const updateTopicController = createController({
	schema: updateTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_UPDATE,
	handler: updateTopicService,
});

export const deleteTopicController = createController({
	schema: deleteTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_DELETE,
	handler: deleteTopicService,
});
