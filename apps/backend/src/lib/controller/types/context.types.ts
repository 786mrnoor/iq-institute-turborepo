import type { AuthUser } from "@repo/schemas/auth/auth.user";
import type { Request, Response } from "express";
import type {
	InferRequestShape,
	RequestZodShape,
} from "@/middleware/validate.middleware";

export type AuthControllerContext<TData extends RequestZodShape> = {
	input: InferRequestShape<TData>;
	user: AuthUser;
	req: Request;
	res: Response;
};

export type PublicControllerContext<TData extends RequestZodShape> = {
	input: InferRequestShape<TData>;
	user: null;
	req: Request;
	res: Response;
};
