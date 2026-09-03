import { createUserSchema } from "@repo/schemas/users/create.user";
import { getUsersSchema } from "@repo/schemas/users/get.users";
import { createController } from "@/lib/controller";
import { createUserService } from "@/services/user/create-user.service";
import { getUsersService } from "@/services/user/get-users.service";

export const createUserController = createController({
	schema: createUserSchema,
	requireAuth: true,
	handler: createUserService,
});

export const getUsersController = createController({
	schema: getUsersSchema,
	requireAuth: true,
	handler: getUsersService,
});
