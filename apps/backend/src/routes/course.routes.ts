import { Router } from "express";
import {
	addCourseController,
	deleteCourseController,
	getCourseController,
	getCoursesController,
	updateCourseController,
} from "@/controllers/course";

export const courseRouter = Router();

courseRouter
	.post("/", addCourseController)
	.get("/", getCoursesController)
	.get("/:id", getCourseController)
	.patch("/:id", updateCourseController)
	.delete("/:id", deleteCourseController);
