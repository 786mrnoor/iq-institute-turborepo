import bcrypt from "bcryptjs";

import type { AuthUser } from "@repo/schemas/auth/auth.user";
import type { LoginData } from "@repo/schemas/auth/login";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { PublicControllerContext } from "@/lib/controller/types";
import { createSession } from "@/lib/session";
import { User } from "@/models/user.model";

async function loginService({
	input,
	res,
}: PublicControllerContext<LoginData>) {
	const { email, password } = input.body;

	const user = await User.findOne({ email })
		.select("_id name email role status passwordHash")
		.lean()
		.exec();
	if (!user) {
		throw new AppError(401, "Invalid username or password");
	}

	if (user.status !== "active") {
		throw new AppError(403, "Your account is not active or suspended");
	}

	const isAuth = bcrypt.compareSync(password, user.passwordHash);
	if (!isAuth) {
		throw new AppError(401, "Invalid username or password");
	}

	await createSession(
		{
			id: user._id.toString() as AuthUser["id"],
			name: user.name,
			email: user.email,
			role: user.role,
		},
		res,
	);

	return response(200, { message: "Logged in Successfully" });
}

export { loginService };
