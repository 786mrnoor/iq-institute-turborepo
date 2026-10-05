import { createEnrollmentSchema } from "@repo/schemas/enrollments/create.enrollment";
import { deleteEnrollmentSchema } from "@repo/schemas/enrollments/delete.enrollment";
import { getEnrollmentSchema } from "@repo/schemas/enrollments/get.enrollment";
import { getEnrollmentsSchema } from "@repo/schemas/enrollments/get.enrollments";
import { updateEnrollmentSchema } from "@repo/schemas/enrollments/update.enrollment";

import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addEnrollmentService } from "@/services/enrollment/add-enrollment.service";
import { deleteEnrollmentService } from "@/services/enrollment/delete-enrollment.service";
import { getEnrollmentService } from "@/services/enrollment/get-enrollment.service";
import { getEnrollmentsService } from "@/services/enrollment/get-enrollments.service";
import { updateEnrollmentService } from "@/services/enrollment/update-enrollment.service";

export const addEnrollmentController = createController({
	schema: createEnrollmentSchema,
	requireAuth: true,
	permission: PERMISSIONS.ENROLLMENT_CREATE,
	handler: ({ input }) => addEnrollmentService(input.body),
});

export const getEnrollmentsController = createController({
	schema: getEnrollmentsSchema,
	requireAuth: true,
	permission: PERMISSIONS.ENROLLMENT_READ,
	handler: ({ input }) => getEnrollmentsService(input.query),
});

export const getEnrollmentByIdController = createController({
	schema: getEnrollmentSchema,
	requireAuth: true,
	permission: PERMISSIONS.ENROLLMENT_READ,
	handler: ({ input }) => getEnrollmentService(input.params.id),
});

export const updateEnrollmentController = createController({
	schema: updateEnrollmentSchema,
	requireAuth: true,
	permission: PERMISSIONS.ENROLLMENT_UPDATE,
	handler: ({ input }) => updateEnrollmentService(input.params.id, input.body),
});

export const deleteEnrollmentByIdController = createController({
	schema: deleteEnrollmentSchema,
	requireAuth: true,
	permission: PERMISSIONS.ENROLLMENT_DELETE,
	handler: ({ input }) => deleteEnrollmentService(input.params.id),
});
