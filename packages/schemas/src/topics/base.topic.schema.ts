import z from "zod";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";

export const topicBaseSchema = z
	.object({
		id: objectIdSchema.brand("topicId"),

		title: z
			.string("Title is required.")
			.trim()
			.min(3, "Title must be at least 3 characters long"),

		deletedAt: z.coerce.date().nullish(),
	})
	.extend(timestampSchema);

export type TopicBaseSchema = z.infer<typeof topicBaseSchema>;
