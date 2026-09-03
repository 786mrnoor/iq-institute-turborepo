import type { AuthUser } from "@repo/schemas/auth/auth.user";
import type { Request, Response } from "express";

export type AuthControllerContext<TData> = {
	input: TData;
	user: AuthUser;
	req: Request;
	res: Response;
};

export type PublicControllerContext<TData> = {
	input: TData;
	user: null;
	req: Request;
	res: Response;
};
