import z from "zod";

import { topicBaseSchema } from "@repo/schemas/topics/base.topic";
import type { CreateTopicSchema } from "@repo/schemas/topics/create.topic";
import type { DeleteTopicSchema } from "@repo/schemas/topics/delete.topic";
import type { UpdateTopicSchema } from "@repo/schemas/topics/update.topic";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.ts";

export const createTopicApi = (data: CreateTopicSchema["body"]) =>
	customFetch(topicBaseSchema, {
		path: "/api/topics",
		method: "POST",
		body: data,
	});

export const getTopicsApi = () =>
	customFetch(topicBaseSchema.array(), {
		path: "/api/topics",
		method: "GET",
	});

export const updateTopicApi = (data: Omit<UpdateTopicSchema, "query">) =>
	customFetch(topicBaseSchema, {
		path: `/api/topics/${data.params.id}`,
		method: "PATCH",
		body: data.body,
	});

export const deleteTopicApi = (id: DeleteTopicSchema["params"]["id"]) =>
	customFetch(z.object({ message: z.string() }), {
		path: `/api/topics/${id}`,
		method: "DELETE",
	});
