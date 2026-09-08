import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import type { TStudent } from "@/models/student.model";

export function studentDto(doc: TStudent) {
	const { _id, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
	} as StudentBaseSchema;
}
