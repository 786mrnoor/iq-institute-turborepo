import type { AuthUser } from "@repo/schemas/auth/auth.user";
import type {
	InferRequestShape,
	RequestZodShape,
} from "@/middleware/validate.middleware";

export type AuthControllerContext<TData extends RequestZodShape> = {
	input: InferRequestShape<TData>;
	user: AuthUser;
};

export type PublicControllerContext<TData extends RequestZodShape> = {
	input: InferRequestShape<TData>;
	user: null;
};
