import { createUserSchema } from "@repo/schemas/users/create.user";
import { createController } from "@/lib/controller";
import { createUserService } from "@/services/user/create-user.service";

export const createUserController = createController({
	schema: createUserSchema,
	requireAuth: true,
	handler: createUserService,
});
