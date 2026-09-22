import z from "zod";

import type { InferRequestShape } from "../request.types";
import { batchBaseSchema } from "./base.batch.schema";

export const getBatchesSchema = {
	query: z.object({
		status: batchBaseSchema.shape.status,
		page: z.coerce.number().int().positive().min(1).default(1),
		limit: z.coerce.number().int().positive().min(10).default(10),
	}),
};

export type GetBatchesSchema = InferRequestShape<typeof getBatchesSchema>;
