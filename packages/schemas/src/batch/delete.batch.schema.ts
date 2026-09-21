import z from "zod";
import type { InferRequestShape } from "../request.types";
import { batchBaseSchema } from "./base.batch.schema";

export const deleteBatchSchema = {
	params: z.object({
		id: batchBaseSchema.shape.id,
	}),
};

export type DeleteBatchSchema = InferRequestShape<typeof deleteBatchSchema>;
