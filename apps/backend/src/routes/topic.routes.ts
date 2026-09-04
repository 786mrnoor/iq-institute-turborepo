import { Router } from "express";
import { addTopicController } from "@/controllers/topic";

export const topicRouter = Router();

topicRouter.post("/", addTopicController);
