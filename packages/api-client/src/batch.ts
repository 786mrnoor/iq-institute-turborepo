import z from "zod";

import {
	type BatchBaseSchema,
	batchBaseSchema,
} from "@repo/schemas/batch/base.batch";
import type { CreateBatchSchema } from "@repo/schemas/batch/create.batch";
import type { UpdateBatchSchema } from "@repo/schemas/batch/update.batch";
import { paginationSchema } from "@repo/schemas/shared/pagination";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.js";

const BATCH_API_PATH = "/api/batches";

export const createBatchApi = (data: CreateBatchSchema["body"]) =>
	customFetch(batchBaseSchema, {
		path: BATCH_API_PATH,
		method: "POST",
		body: data,
	});

export const getBatchesApi = () =>
	customFetch(
		z.object({ batches: batchBaseSchema.array(), meta: paginationSchema }),
		{
			path: BATCH_API_PATH,
			method: "GET",
		},
	);

export const getBatchByIdApi = (id: BatchBaseSchema["id"]) =>
	customFetch(batchBaseSchema, {
		path: [BATCH_API_PATH, id],
		method: "GET",
	});

export const updateBatchApi = (data: Omit<UpdateBatchSchema, "query">) =>
	customFetch(batchBaseSchema, {
		path: [BATCH_API_PATH, data.params.id],
		method: "PATCH",
		body: data.body,
	});

export const deleteBatchApi = (id: BatchBaseSchema["id"]) =>
	customFetch(z.null(), {
		path: [BATCH_API_PATH, id],
		method: "DELETE",
	});
