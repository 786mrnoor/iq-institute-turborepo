import { mutationOptions, queryOptions } from "@tanstack/react-query";

import {
	activeTeacherApi,
	addTeacherApi,
	deleteTeacherByIdApi,
	getTeacherByIdApi,
	getTeachersApi,
	leftTeacherApi,
	updateTeacherApi,
} from "@repo/api-client/teacher.ts";
import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import type { GetTeachersSchema } from "@repo/schemas/teachers/get.teachers";

export const teacherKeys = {
	all: ["teachers"] as const,
	lists: () => [...teacherKeys.all, "list"] as const,
	list: (filters: GetTeachersSchema["query"]) =>
		[...teacherKeys.lists(), filters] as const,
	details: () => [...teacherKeys.all, "detail"] as const,
	detail: (id: TeacherBaseSchema["id"]) =>
		[...teacherKeys.details(), id] as const,
};

export const teacherQueries = {
	list: (filters: Parameters<typeof getTeachersApi>[0]) =>
		queryOptions({
			queryKey: teacherKeys.list(filters),
			queryFn: () => getTeachersApi(filters),
		}),

	detail: (id: Parameters<typeof getTeacherByIdApi>[0]) =>
		queryOptions({
			queryKey: teacherKeys.detail(id),
			queryFn: () => getTeacherByIdApi(id),
		}),
};

export const teacherMutations = {
	add: mutationOptions({
		mutationFn: (data: Parameters<typeof addTeacherApi>[0]) =>
			addTeacherApi(data),
		onSuccess: (_, __, ___, { client }) => {
			client.invalidateQueries({ queryKey: teacherKeys.lists() });
		},
	}),

	update: mutationOptions({
		mutationFn: (data: Parameters<typeof updateTeacherApi>[0]) =>
			updateTeacherApi(data),
		onSuccess(teacher, _, __, { client }) {
			client.invalidateQueries({ queryKey: teacherKeys.lists() });
			client.invalidateQueries({ queryKey: teacherKeys.detail(teacher.id) });
		},
	}),

	delete: mutationOptions({
		mutationFn: (id: Parameters<typeof deleteTeacherByIdApi>[0]) =>
			deleteTeacherByIdApi(id),
		onSuccess: async (_, id, ___, { client }) => {
			await client.invalidateQueries({ queryKey: teacherKeys.lists() });
			client.invalidateQueries({ queryKey: teacherKeys.detail(id) });
		},
	}),

	left: mutationOptions({
		mutationFn: (data: Parameters<typeof leftTeacherApi>[0]) =>
			leftTeacherApi(data),
		onSuccess: async (teacher, _, __, { client }) => {
			await client.invalidateQueries({ queryKey: teacherKeys.lists() });
			client.invalidateQueries({ queryKey: teacherKeys.detail(teacher.id) });
		},
	}),

	active: mutationOptions({
		mutationFn: (data: Parameters<typeof activeTeacherApi>[0]) =>
			activeTeacherApi(data),
		onSuccess: async (teacher, _, __, { client }) => {
			await client.invalidateQueries({ queryKey: teacherKeys.lists() });
			client.invalidateQueries({ queryKey: teacherKeys.detail(teacher.id) });
		},
	}),
};
