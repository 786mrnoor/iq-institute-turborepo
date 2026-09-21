import { createBatchSchema } from "@repo/schemas/batch/create.batch";
import { deleteBatchSchema } from "@repo/schemas/batch/delete.batch";
import { getBatchSchema } from "@repo/schemas/batch/get.batch";
import { getBatchesSchema } from "@repo/schemas/batch/get.batches";
import { updateBatchSchema } from "@repo/schemas/batch/update.batch";
import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { addBatchService } from "@/services/batch/add-batch.service";
import { deleteBatchService } from "@/services/batch/delete-batch.service";
import { getBatchService } from "@/services/batch/get-batch.service";
import { getBatchesService } from "@/services/batch/get-batches.service";
import { updateBatchService } from "@/services/batch/update-batch.service";

export const addBatchController = createController({
	schema: createBatchSchema,
	requireAuth: true,
	permission: PERMISSIONS.BATCH_CREATE,
	handler: addBatchService,
});

export const getBatchesController = createController({
	schema: getBatchesSchema,
	requireAuth: true,
	permission: PERMISSIONS.BATCH_READ,
	handler: getBatchesService,
});

export const getBatchController = createController({
	schema: getBatchSchema,
	requireAuth: true,
	permission: PERMISSIONS.BATCH_READ,
	handler: getBatchService,
});

export const updateBatchController = createController({
	schema: updateBatchSchema,
	requireAuth: true,
	permission: PERMISSIONS.BATCH_UPDATE,
	handler: updateBatchService,
});

export const deleteBatchController = createController({
	schema: deleteBatchSchema,
	requireAuth: true,
	permission: PERMISSIONS.BATCH_DELETE,
	handler: deleteBatchService,
});
