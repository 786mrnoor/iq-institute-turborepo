import type { DeleteTopicSchema } from "@repo/schemas/topics/delete.topic";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Topic } from "@/models/topic.model";

async function deleteTopicService({
	input,
}: AuthControllerContext<DeleteTopicSchema>) {
	const id = input.params.id;

	const result = await Topic.updateOne(
		{ _id: id },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(200, { message: "topic deleted successfully" });
	}

	throw new AppError(404, "Topic could not be deleted successfully");
}

export { deleteTopicService };
