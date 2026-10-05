import { Router } from "express";

import {
	activeTeacherController,
	addTeacherController,
	deleteTeacherByIdController,
	getTeacherByIdController,
	getTeachersController,
	leftTeacherController,
	updateTeacherController,
} from "@/controllers/teacher";

export const teacherRouter = Router();

teacherRouter
	.post("/", addTeacherController)
	.get("/", getTeachersController)
	.get("/:id", getTeacherByIdController)
	.patch("/:id", updateTeacherController)
	.delete("/:id", deleteTeacherByIdController)
	.patch("/:id/left", leftTeacherController)
	.patch("/:id/active", activeTeacherController);
