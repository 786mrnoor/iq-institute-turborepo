import z from "zod";

import { paginationSchema } from "@repo/schemas/shared/pagination";
import type { ActiveTeacherSchema } from "@repo/schemas/teachers/active.teacher";
import type { AddTeacherInput } from "@repo/schemas/teachers/add.teacher";
import {
	type TeacherBaseSchema,
	teacherBaseSchema,
} from "@repo/schemas/teachers/base.teacher";
import type { GetTeachersSchema } from "@repo/schemas/teachers/get.teachers";
import type { LeftTeacherSchema } from "@repo/schemas/teachers/left.teacher";
import type {
	UpdateTeacherInput,
	UpdateTeacherSchema,
} from "@repo/schemas/teachers/update.teacher";
import { customFetch } from "@repo/utils/custom-fetch/custom-fetch.js";

const BASE_PATH = "/api/teachers";

export const addTeacherApi = (data: AddTeacherInput["body"]) =>
	customFetch(teacherBaseSchema, {
		path: BASE_PATH,
		method: "POST",
		body: data,
	});

export const getTeachersApi = (filters: GetTeachersSchema["query"]) =>
	customFetch(
		z.object({ teachers: teacherBaseSchema.array(), meta: paginationSchema }),
		{
			path: BASE_PATH,
			query: filters,
			method: "GET",
		},
	);

export const getTeacherByIdApi = (id: TeacherBaseSchema["id"]) =>
	customFetch(teacherBaseSchema, {
		path: [BASE_PATH, id],
		method: "GET",
	});

export const updateTeacherApi = (
	data: Pick<UpdateTeacherInput, "body"> & Pick<UpdateTeacherSchema, "params">,
) =>
	customFetch(teacherBaseSchema, {
		path: [BASE_PATH, data.params.id],
		method: "PATCH",
		body: data.body,
	});

export const deleteTeacherByIdApi = (id: TeacherBaseSchema["id"]) =>
	customFetch(z.null(), {
		path: [BASE_PATH, id],
		method: "DELETE",
	});

export const leftTeacherApi = (
	data: Pick<LeftTeacherSchema, "body" | "params">,
) =>
	customFetch(teacherBaseSchema, {
		path: [BASE_PATH, data.params.id, "left"],
		method: "PATCH",
		body: data.body,
	});

export const activeTeacherApi = (data: Pick<ActiveTeacherSchema, "params">) =>
	customFetch(teacherBaseSchema, {
		path: [BASE_PATH, data.params.id, "active"],
		method: "PATCH",
	});
