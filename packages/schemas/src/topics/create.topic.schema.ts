import type { InferRequestShape } from "../request.types";
import { topicBaseSchema } from "./base.topic.schema";

const createTopicBody = topicBaseSchema.pick({
	title: true,
});

export const createTopicSchema = {
	body: createTopicBody,
};

export type CreateTopicSchema = InferRequestShape<typeof createTopicSchema>;
