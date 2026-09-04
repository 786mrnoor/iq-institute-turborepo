import type { AuthUser } from "@repo/schemas/auth/auth.user";
import type { RequestShape } from "@repo/schemas/request-types";
import type { Request, Response } from "express";

export type AuthControllerContext<
	TData extends RequestShape = RequestShape<undefined>,
> = {
	input: TData;
	user: AuthUser;
	req: Request;
	res: Response;
};

export type PublicControllerContext<
	TData extends RequestShape = RequestShape<undefined>,
> = {
	input: TData;
	user: null;
	req: Request;
	res: Response;
};
