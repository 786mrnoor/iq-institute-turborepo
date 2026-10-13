import { Router } from "express";

import {
	loginController,
	logoutController,
	meController,
} from "@/controllers/auth";

export const authRouter = Router();

authRouter
	.post("/login", loginController)
	.get("/me", meController)
	.post("/logout", logoutController);
