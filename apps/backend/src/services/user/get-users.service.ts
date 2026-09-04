import type { GetUsersSchema } from "@repo/schemas/users/get.users";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { User } from "@/models/user.model";
import { userDto } from "@/utils/dtos/userDto";

async function getUsersService({
	input,
}: AuthControllerContext<GetUsersSchema>) {
	const { role, status, fromDate, toDate, page, limit } = input.query;

	const filter = {
		...(role && { role }),
		...(status && { status }),
		createdAt: {
			$gte: fromDate,
			$lte: toDate,
		},
	};

	const skip = (page - 1) * limit;

	const totalCount = await User.countDocuments(filter);
	const users = await User.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec();

	return response(200, {
		users: users.map((user) => userDto(user)),
		meta: { page, limit, totalCount },
	});
}

export { getUsersService };
