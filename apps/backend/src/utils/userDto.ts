import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import type { TUser } from "@/models/user.model";

export function userDto(doc: TUser): UserBaseSchema {
	const {
		_id,
		__v,
		passwordHash: _,
		studentId,
		passwordChangedBy,
		createdBy,
		...rest
	} = doc;

	return {
		...rest,
		id: String(_id) as UserBaseSchema["id"],
		studentId: String(studentId),
		passwordChangedBy: String(
			passwordChangedBy,
		) as UserBaseSchema["passwordChangedBy"],
		createdBy: String(createdBy) as UserBaseSchema["createdBy"],
	} as UserBaseSchema;
}
