import z from "zod";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { addTeacherSchema } from "./add.teacher.schema";
import { teacherBaseSchema } from "./base.teacher.schema";

export const updateTeacherSchema = {
	params: z.object({
		id: teacherBaseSchema.shape.id,
	}),
	body: z.object({ ...addTeacherSchema.body.shape }),
};

export type UpdateTeacherSchema = InferRequestShape<typeof updateTeacherSchema>;
export type UpdateTeacherInput = InferRequestInput<typeof updateTeacherSchema>;
