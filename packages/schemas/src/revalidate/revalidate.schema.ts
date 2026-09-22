import z from "zod";

import { objectIdSchema } from "../shared/object-id.schema";

export const revalidateSchema = z
	.array(z.templateLiteral([z.literal("/courses/"), objectIdSchema]))
	.min(1);

export type RevalidateSchema = z.infer<typeof revalidateSchema>;
