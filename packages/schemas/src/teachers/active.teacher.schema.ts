import z from "zod";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { teacherBaseSchema } from "./base.teacher.schema";

export const activeTeacherSchema = {
	params: z.object({
		id: teacherBaseSchema.shape.id,
	}),
};

export type ActiveTeacherSchema = InferRequestShape<typeof activeTeacherSchema>;
export type ActiveTeacherInput = InferRequestInput<typeof activeTeacherSchema>;
