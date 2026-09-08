import z from "zod";
import type { InferRequestShape } from "../request.types";
import { addStudentSchema } from "./add.student.schema";
import { studentBaseSchema } from "./base.student.schema";

export const updateStudentSchema = {
	params: studentBaseSchema.pick({ id: true }),
	body: z.object({ ...addStudentSchema.body.shape }),
};

export type UpdateStudentSchema = InferRequestShape<typeof updateStudentSchema>;
