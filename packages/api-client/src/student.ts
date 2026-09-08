import { paginationSchema } from "@repo/schemas/shared/pagination";
import type { AddStudentInput } from "@repo/schemas/students/add.student";
import {
	type StudentBaseSchema,
	studentBaseSchema,
} from "@repo/schemas/students/base.student";
import type { GetStudentsSchema } from "@repo/schemas/students/get.students";
import type {
	UpdateStudentInput,
	UpdateStudentSchema,
} from "@repo/schemas/students/update.student";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.js";
import z from "zod";

const BASE_PATH = "/api/students";

export const addStudentApi = (data: AddStudentInput["body"]) =>
	customFetch(studentBaseSchema, {
		path: BASE_PATH,
		method: "POST",
		body: data,
	});

export const getStudentsApi = (filters: GetStudentsSchema["query"]) =>
	customFetch(
		z.object({ students: studentBaseSchema.array(), meta: paginationSchema }),
		{
			path: BASE_PATH,
			query: filters,
			method: "GET",
		},
	);

export const getStudentByIdApi = (id: StudentBaseSchema["id"]) =>
	customFetch(studentBaseSchema, {
		path: [BASE_PATH, id],
		method: "GET",
	});

export const updateStudentApi = (
	data: Pick<UpdateStudentInput, "body"> & Pick<UpdateStudentSchema, "params">,
) =>
	customFetch(studentBaseSchema, {
		path: [BASE_PATH, data.params.id],
		method: "PATCH",
		body: data.body,
	});

export const deleteStudentByIdApi = (id: StudentBaseSchema["id"]) =>
	customFetch(z.null(), {
		path: [BASE_PATH, id],
		method: "DELETE",
	});
