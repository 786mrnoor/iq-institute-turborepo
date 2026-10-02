import z from "zod";

import type { InferRequestShape } from "../request.types";
import { teacherBaseSchema } from "./base.teacher.schema";

export const deleteTeacherSchema = {
	params: z.object({
		id: teacherBaseSchema.shape.id,
	}),
};

export type DeleteTeacherSchema = InferRequestShape<typeof deleteTeacherSchema>;
