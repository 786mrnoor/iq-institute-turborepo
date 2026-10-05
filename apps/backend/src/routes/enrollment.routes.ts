import { Router } from "express";

import {
	addEnrollmentController,
	deleteEnrollmentByIdController,
	getEnrollmentByIdController,
	getEnrollmentsController,
	updateEnrollmentController,
} from "@/controllers/enrollment";

export const enrollmentRouter = Router();

enrollmentRouter
	.post("/", addEnrollmentController)
	.get("/", getEnrollmentsController)
	.get("/:id", getEnrollmentByIdController)
	.patch("/:id", updateEnrollmentController)
	.delete("/:id", deleteEnrollmentByIdController);
