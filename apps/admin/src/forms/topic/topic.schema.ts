import type z from "zod";

import { topicBaseSchema } from "@repo/schemas/topics/base.topic";

export const formTopicSchema = topicBaseSchema.pick({
	title: true,
});

export type FormTopicData = z.infer<typeof formTopicSchema>;
export type FormTopicInput = z.input<typeof formTopicSchema>;
