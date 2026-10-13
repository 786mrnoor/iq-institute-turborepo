import { loginSchema } from "@repo/schemas/auth/login";

import { createController, response } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { loginService } from "@/services/auth/login.service";
import { logoutService } from "@/services/auth/logout.service";

export const loginController = createController({
	schema: loginSchema,
	requireAuth: false,
	handler: loginService,
});

export const meController = createController({
	schema: {},
	requireAuth: true,
	permission: PERMISSIONS.AUTH_ME,
	handler: async ({ user }) => response(200, user),
});

export const logoutController = createController({
	schema: {},
	requireAuth: false,
	handler: ({ res }) => logoutService(res),
});
