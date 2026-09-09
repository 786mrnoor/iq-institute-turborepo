import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { createTopicSchema } from "@repo/schemas/topics/create.topic";
import { deleteTopicSchema } from "@repo/schemas/topics/delete.topic";
import { updateTopicSchema } from "@repo/schemas/topics/update.topic";
import { createController } from "@/lib/controller";
import { PERMISSIONS } from "@/lib/permissions/permissions";
import { Course } from "@/models/course.model";
import { revalidateCourse } from "@/services/course/revalidate-course";
import { addTopicService } from "@/services/topic/add-topic.service";
import { deleteTopicService } from "@/services/topic/delete-topic.service";
import { getTopicService } from "@/services/topic/get-topics.service";
import { updateTopicService } from "@/services/topic/update-topic.service";

export const addTopicController = createController({
	schema: createTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_CREATE,
	handler: addTopicService,
});

export const getTopicsController = createController({
	schema: {},
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_READ,
	handler: getTopicService,
});

export const updateTopicController = createController({
	schema: updateTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_UPDATE,
	async handler(ctx) {
		const result = await updateTopicService(ctx);

		const courses = await Course.find({
			topics: result.data.id,
			deletedAt: null,
		})
			.select("_id")
			.lean()
			.exec();

		const paths = courses.map((c) => String(c._id));

		if (paths.length > 0) {
			revalidateCourse(paths as CourseBaseSchema["id"][]);
		}

		return result;
	},
});

export const deleteTopicController = createController({
	schema: deleteTopicSchema,
	requireAuth: true,
	permission: PERMISSIONS.TOPIC_DELETE,
	handler: deleteTopicService,
});
