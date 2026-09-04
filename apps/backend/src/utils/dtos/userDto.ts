import type { UserBaseSchema } from "@repo/schemas/users/base.user";
import type { TUser } from "@/models/user.model";

export function userDto(doc: TUser): UserBaseSchema {
	const {
		_id,
		__v,
		passwordHash: _,
		passwordChangedBy,
		createdBy,
		...rest
	} = doc;

	return {
		...rest,
		id: String(_id),
		passwordChangedBy: passwordChangedBy && String(passwordChangedBy),
		createdBy: createdBy && String(createdBy),
	} as UserBaseSchema;
}
