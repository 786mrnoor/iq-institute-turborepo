import type { InferRequestShape } from "../request.types";
import { topicBaseSchema } from "./base.topic.schema";

export const deleteTopicSchema = {
	params: topicBaseSchema.pick({ id: true }),
};

export type DeleteTopicSchema = InferRequestShape<typeof deleteTopicSchema>;
