import z from "zod";
import type { InferRequestShape } from "../request.types";
import { batchBaseSchema } from "./base.batch.schema";

export const getBatchSchema = {
	params: z.object({
		id: batchBaseSchema.shape.id,
	}),
};

export type GetBatchSchema = InferRequestShape<typeof getBatchSchema>;
