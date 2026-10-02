import z from "zod";

import type { InferRequestShape } from "../request.types";
import { teacherBaseSchema } from "./base.teacher.schema";

export const getTeachersSchema = {
	query: z.object({
		teacherId: teacherBaseSchema.shape.teacherId.optional(),
		adharNo: teacherBaseSchema.shape.adharNo.optional(),
		status: teacherBaseSchema.shape.status.optional(),
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(10),
	}),
};

export type GetTeachersSchema = InferRequestShape<typeof getTeachersSchema>;
