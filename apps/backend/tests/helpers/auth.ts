import bcrypt from "bcryptjs";
import request from "supertest";

import { ROLES } from "@repo/schemas/user-roles";

import app from "@/app";
import { User } from "@/models/user.model";

export async function createTestUser() {
	const password = "TestPassword123!";

	const passwordHash = bcrypt.hashSync(password, 10);

	const user = await User.create({
		name: "Test Admin",
		email: "test@example.com",
		passwordHash,
		role: ROLES.ADMIN,
	});

	return {
		user,
		email: user.email,
		password,
	};
}

export async function createAuthenticatedAgent() {
	const { user, password } = await createTestUser();

	const agent = request.agent(app);

	const response = await agent.post("/api/auth/login").send({
		email: user.email,
		password,
	});

	if (response.status !== 200) {
		throw new Error(`Test login failed: ${response.status}`);
	}

	return {
		agent,
		user,
	};
}
