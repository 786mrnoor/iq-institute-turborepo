import { Router } from "express";
import {
	addStudentController,
	deleteStudentByIdController,
	getStudentByIdController,
	getStudentsController,
	updateStudentController,
} from "@/controllers/student";

export const studentRouter = Router();

studentRouter
	.post("/", addStudentController)
	.get("/", getStudentsController)
	.get("/:id", getStudentByIdController)
	.patch("/:id", updateStudentController)
	.delete("/:id", deleteStudentByIdController);
