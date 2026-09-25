import cookieParser from "cookie-parser";
import express from "express";

import { connectDB } from "./config/db";
import { getHealthController } from "./controllers/health";
import { globalErrorHandler } from "./middleware/error.middleware";
import { authRouter } from "./routes/auth.routes";
import { batchRouter } from "./routes/batch.routes";
import { courseRouter } from "./routes/course.routes";
import { enquiryRouter } from "./routes/enquiry.routes";
import { studentRouter } from "./routes/student.routes";
import { topicRouter } from "./routes/topic.routes";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", getHealthController);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/topics", topicRouter);
app.use("/api/courses", courseRouter);
app.use("/api/students", studentRouter);
app.use("/api/enquiries", enquiryRouter);
app.use("/api/batches", batchRouter);

app.all("/*path", (_req, res) =>
	res.status(404).json({ message: "Not Found" }),
);

app.use(globalErrorHandler);

const PORT = process.env.BACKEND_PORT || 5000;

connectDB();
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
