import { mutationOptions, queryOptions } from "@tanstack/react-query";

import {
	createBatchApi,
	deleteBatchApi,
	getBatchByIdApi,
	getBatchesApi,
	updateBatchApi,
} from "@repo/api-client/batch.ts";
import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";

export const batchesKeys = {
	all: ["batches"] as const,

	lists: () => [...batchesKeys.all, "list"] as const,
	list: () => [...batchesKeys.lists()] as const,

	details: () => [...batchesKeys.all, "detail"] as const,
	detail: (id: string) => [...batchesKeys.details(), id] as const,
};

export const batchesQueries = {
	list: queryOptions({
		queryKey: batchesKeys.list(),
		queryFn: () => getBatchesApi(),
	}),

	detail: (id: BatchBaseSchema["id"]) =>
		queryOptions({
			queryKey: batchesKeys.detail(id),
			queryFn: () => getBatchByIdApi(id),
		}),
};

export const batchesMutations = {
	add: mutationOptions({
		mutationFn: createBatchApi,
		onSuccess(_, __, ___, { client }) {
			client.invalidateQueries({ queryKey: batchesKeys.lists() });
		},
	}),

	update: mutationOptions({
		mutationFn: updateBatchApi,
		onSuccess(newBatch, _, __, { client }) {
			client.invalidateQueries({ queryKey: batchesKeys.lists() });
			client.invalidateQueries({ queryKey: batchesKeys.detail(newBatch.id) });
		},
	}),

	delete: mutationOptions({
		mutationFn: deleteBatchApi,
		onSuccess(_, id, __, { client }) {
			client.invalidateQueries({ queryKey: batchesKeys.lists() });
			client.invalidateQueries({ queryKey: batchesKeys.detail(id) });
		},
	}),
};
