import type { InferRequestShape } from "../request.types";
import { studentBaseSchema } from "./base.student.schema";

export const deleteStudentSchema = {
	params: studentBaseSchema.pick({ id: true }),
};

export type DeleteStudentSchema = InferRequestShape<typeof deleteStudentSchema>;
