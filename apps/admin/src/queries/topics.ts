import {
	createTopicApi,
	getTopicsApi,
	updateTopicApi,
} from "@repo/api-client/topic.ts";
import type { TopicBaseSchema } from "@repo/schemas/topics/base.topic";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
export const topicsKeys = {
	all: ["topics"] as const,
};

export const topicsQueries = {
	all: queryOptions({
		queryKey: topicsKeys.all,
		queryFn: getTopicsApi,
	}),
};

export const topicsMutations = {
	add: mutationOptions({
		mutationFn: createTopicApi,
		onSuccess(newTopic, _, __, { client }) {
			client.setQueryData<TopicBaseSchema[]>(topicsKeys.all, (old = []) => [
				...old,
				newTopic,
			]);
			client.invalidateQueries({ queryKey: topicsKeys.all });
		},
	}),

	update: mutationOptions({
		mutationFn: updateTopicApi,
		onSuccess(newTopic, _, __, { client }) {
			client.setQueryData<TopicBaseSchema[]>(topicsKeys.all, (old = []) =>
				old.map((t) => (t.id === newTopic.id ? newTopic : t)),
			);
			client.invalidateQueries({ queryKey: topicsKeys.all });
		},
	}),
};
