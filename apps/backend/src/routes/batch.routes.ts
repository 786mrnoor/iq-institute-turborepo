import { Router } from "express";

import {
	addBatchController,
	deleteBatchController,
	getBatchController,
	getBatchesController,
	updateBatchController,
} from "@/controllers/batch";

export const batchRouter = Router();

batchRouter
	.post("/", addBatchController)
	.get("/", getBatchesController)
	.get("/:id", getBatchController)
	.patch("/:id", updateBatchController)
	.delete("/:id", deleteBatchController);
