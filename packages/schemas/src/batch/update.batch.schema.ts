import z from "zod";
import type { InferRequestInput, InferRequestShape } from "../request.types";
import { batchBaseSchema } from "./base.batch.schema";
import { createBatchSchema } from "./create.batch.schema";

export const updateBatchSchema = {
	params: z.object({
		id: batchBaseSchema.shape.id,
	}),
	body: z.object({ ...createBatchSchema.body.shape }),
};

export type UpdateBatchSchema = InferRequestShape<typeof updateBatchSchema>;
export type UpdateBatchInput = InferRequestInput<typeof updateBatchSchema>;
