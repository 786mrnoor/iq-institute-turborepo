import { Router } from "express";
import {
	addTopicController,
	getTopicsController,
	updateTopicController,
} from "@/controllers/topic";

export const topicRouter = Router();

topicRouter
	.post("/", addTopicController)
	.get("/", getTopicsController)
	.patch("/:id", updateTopicController);
