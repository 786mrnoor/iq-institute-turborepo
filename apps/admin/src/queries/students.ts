import {
	addStudentApi,
	deleteStudentByIdApi,
	getStudentByIdApi,
	getStudentsApi,
	updateStudentApi,
} from "@repo/api-client/student.ts";
import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import type { GetStudentsSchema } from "@repo/schemas/students/get.students";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const studentKeys = {
	all: ["students"] as const,
	lists: () => [...studentKeys.all, "list"] as const,
	list: (filters: GetStudentsSchema["query"]) =>
		[...studentKeys.lists(), filters] as const,
	details: () => [...studentKeys.all, "detail"] as const,
	detail: (id: StudentBaseSchema["id"]) =>
		[...studentKeys.details(), id] as const,
};

export const studentQueries = {
	list: (filters: Parameters<typeof getStudentsApi>[0]) =>
		queryOptions({
			queryKey: studentKeys.list(filters),
			queryFn: () => getStudentsApi(filters),
		}),

	detail: (id: Parameters<typeof getStudentByIdApi>[0]) =>
		queryOptions({
			queryKey: studentKeys.detail(id),
			queryFn: () => getStudentByIdApi(id),
		}),
};

export const studentMutations = {
	add: mutationOptions({
		mutationFn: (data: Parameters<typeof addStudentApi>[0]) =>
			addStudentApi(data),
		onSuccess: (_, __, ___, { client }) => {
			client.invalidateQueries({ queryKey: studentKeys.lists() });
		},
	}),

	update: mutationOptions({
		mutationFn: (data: Parameters<typeof updateStudentApi>[0]) =>
			updateStudentApi(data),
		onSuccess(student, _, __, { client }) {
			client.invalidateQueries({ queryKey: studentKeys.lists() });
			client.invalidateQueries({ queryKey: studentKeys.detail(student.id) });
		},
	}),

	delete: mutationOptions({
		mutationFn: (id: Parameters<typeof deleteStudentByIdApi>[0]) =>
			deleteStudentByIdApi(id),
		onSuccess: async (_, _id, ___, { client }) => {
			await client.invalidateQueries({ queryKey: studentKeys.lists() });
		},
	}),
};
