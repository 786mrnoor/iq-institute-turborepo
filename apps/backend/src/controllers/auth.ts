import { loginSchema } from "@repo/schemas/auth/login";

import { createController } from "@/lib/controller";
import { loginService } from "@/services/auth/login.service";

export const loginController = createController({
	schema: loginSchema,
	requireAuth: false,
	handler: loginService,
});
