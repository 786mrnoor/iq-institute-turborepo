import { Router } from "express";

import {
	addEnquiryController,
	getEnquirysController,
	updateEnquiryController,
} from "@/controllers/enquiry";

export const enquiryRouter = Router();

enquiryRouter
	.post("/", addEnquiryController)
	.get("/", getEnquirysController)
	.patch("/:id", updateEnquiryController);
