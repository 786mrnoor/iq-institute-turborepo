import type { InferRequestShape } from "@repo/schemas/request-types";
import { topicBaseSchema } from "@repo/schemas/topics/base.topic";

export const updateTopicSchema = {
	params: topicBaseSchema.pick({ id: true }),
	body: topicBaseSchema.pick({ title: true }),
};

export type UpdateTopicSchema = InferRequestShape<typeof updateTopicSchema>;
