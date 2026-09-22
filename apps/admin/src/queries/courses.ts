import { mutationOptions, queryOptions } from "@tanstack/react-query";

import {
	createCourseApi,
	deleteCourseApi,
	getCourseByIdApi,
	getCoursesApi,
	updateCourseApi,
} from "@repo/api-client/courses.ts";
import type { CourseBaseSchema } from "@repo/schemas/course/base.course";

export const coursesKeys = {
	all: ["courses"] as const,
	details: () => [...coursesKeys.all, "detail"] as const,
	detail: (id: string) => [...coursesKeys.details(), id] as const,
};

export const coursesQueries = {
	all: queryOptions({
		queryKey: coursesKeys.all,
		queryFn: () => getCoursesApi(),
	}),

	detail: (id: CourseBaseSchema["id"]) =>
		queryOptions({
			queryKey: coursesKeys.detail(id),
			queryFn: () => getCourseByIdApi(id),
		}),
};

export const coursesMutations = {
	add: mutationOptions({
		mutationFn: createCourseApi,
		onSuccess(newCourse, _, __, { client }) {
			client.setQueryData<CourseBaseSchema[]>(coursesKeys.all, (old = []) => [
				...old,
				newCourse,
			]);

			client.invalidateQueries({ queryKey: coursesKeys.all, exact: true });
		},
	}),

	update: mutationOptions({
		mutationFn: updateCourseApi,
		onSuccess(newCourse, _, __, { client }) {
			client.setQueryData<CourseBaseSchema[]>(coursesKeys.all, (old = []) =>
				old.map((t) => (t.id === newCourse.id ? newCourse : t)),
			);
			client.invalidateQueries({ queryKey: coursesKeys.all, exact: true });
			client.invalidateQueries({
				queryKey: coursesKeys.detail(newCourse.id),
				exact: true,
			});
		},
	}),

	delete: mutationOptions({
		mutationFn: deleteCourseApi,
		onSuccess(_, id, __, { client }) {
			client.setQueryData<CourseBaseSchema[]>(coursesKeys.all, (old = []) =>
				old.filter((t) => t.id !== id),
			);
			client.invalidateQueries({ queryKey: coursesKeys.all });
			client.invalidateQueries({
				queryKey: coursesKeys.detail(id),
				exact: true,
			});
		},
	}),
};
