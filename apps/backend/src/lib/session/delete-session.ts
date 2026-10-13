import type { Response } from "express";

import { SESSION_KEY } from "./shared";

async function deleteSession(res: Response) {
	res.clearCookie(SESSION_KEY);
}

export { deleteSession };
