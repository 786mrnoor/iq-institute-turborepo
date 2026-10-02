import z from "zod";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { teacherBaseSchema } from "./base.teacher.schema";

export const leftTeacherSchema = {
	params: z.object({
		id: teacherBaseSchema.shape.id,
	}),
	body: z.object({
		leftAt: z.coerce.date(),
	}),
};

export type LeftTeacherSchema = InferRequestShape<typeof leftTeacherSchema>;
export type LeftTeacherInput = InferRequestInput<typeof leftTeacherSchema>;
