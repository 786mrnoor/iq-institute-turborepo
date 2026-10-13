import type { Response } from "express";

import { response } from "@/lib/controller";
import { deleteSession } from "@/lib/session/delete-session";

async function logoutService(res: Response) {
	deleteSession(res);

	return response(200, { message: "Logged out successfully" });
}

export { logoutService };
