import {
	type CourseBaseSchema,
	courseBaseSchema,
} from "@repo/schemas/course/base.course";
import type { CreateCourseSchema } from "@repo/schemas/course/create.course";
import type { DeleteCourseSchema } from "@repo/schemas/course/delete.course";
import type { UpdateCourseSchema } from "@repo/schemas/course/update.course";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.js";
import z from "zod";

export const createCourseApi = (data: CreateCourseSchema["body"]) =>
	customFetch(courseBaseSchema, {
		path: "/api/courses",
		method: "POST",
		body: data,
	});

export const getCoursesApi = () =>
	customFetch(courseBaseSchema.array(), {
		path: "/api/courses",
		method: "GET",
	});

export const getCourseByIdApi = (id: CourseBaseSchema["id"]) =>
	customFetch(courseBaseSchema, {
		path: `/api/courses/${id}`,
		method: "GET",
	});

export const updateCourseApi = (data: Omit<UpdateCourseSchema, "query">) =>
	customFetch(courseBaseSchema, {
		path: `/api/courses/${data.params.id}`,
		method: "PATCH",
		body: data.body,
	});

export const deleteCourseApi = (id: DeleteCourseSchema["params"]["id"]) =>
	customFetch(z.null(), {
		path: `/api/courses/${id}`,
		method: "DELETE",
	});
