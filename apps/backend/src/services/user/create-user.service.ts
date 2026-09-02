import type { CreateUserSchema } from "@repo/schemas/users/create.user";
import { AppError } from "@repo/utils/app-error.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { User } from "@/models/user.model";

async function createUserService({
	input,
	user,
}: AuthControllerContext<CreateUserSchema>) {
	const data = input.body;

	try {
		if (user.role !== "super-admin" && data.role === "super-admin") {
			throw new AppError(401, "You cannot create a super-admin");
		}

		const { password, ...userData } = data;

		const hash = bcrypt.hashSync(password, 10);
		const newUser = new User({ ...userData, passwordHash: hash });
		await newUser.save();

		return response(201, { message: "User created Successfully" });
	} catch (error) {
		if (error instanceof mongoose.mongo.MongoServerError) {
			throw new AppError(409, "email is already in use.", {
				path: "email",
				message: "email is already in use.",
			});
		}
		throw error;
	}
}

export { createUserService };
