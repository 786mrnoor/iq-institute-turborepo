import z from "zod";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { addStudentSchema } from "./add.student.schema";
import { studentBaseSchema } from "./base.student.schema";

export const updateStudentSchema = {
	params: studentBaseSchema.pick({ id: true }),
	body: z.object({ ...addStudentSchema.body.shape }),
};

export type UpdateStudentSchema = InferRequestShape<typeof updateStudentSchema>;
export type UpdateStudentInput = InferRequestInput<typeof updateStudentSchema>;
