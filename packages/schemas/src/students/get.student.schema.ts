import type { InferRequestShape } from "../request.types";
import { studentBaseSchema } from "./base.student.schema";

export const getStudentSchema = {
	params: studentBaseSchema.pick({ id: true }),
};

export type GetStudentSchema = InferRequestShape<typeof getStudentSchema>;
