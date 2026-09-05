import type { CourseBaseSchema } from "@repo/schemas/course/base.course";
import { Dropdown, DropdownToggleButton } from "@repo/ui/dropdown";
import { Dots } from "@repo/ui/icons/Dots.js";
import { formatDateTime } from "@repo/utils/date/format/date-time.js";
import { AppLink } from "@/components/link/AppLink";
import { CourseDropdownMenu } from "./CourseDropdownMenu";

type CourseCardProps = {
	course: CourseBaseSchema;
};

function CourseCard({ course }: CourseCardProps) {
	return (
		<li className="flex items-center justify-between border border-gray-300 px-4 py-2 not-first:border-t-0 first:rounded-t-md last:rounded-b-md last:border-b">
			<div>
				<p className="font-semibold text-primary">
					<AppLink to={`/admin/courses/${course.id}`}>{course.title}</AppLink>
				</p>
				<span className="text-xs">{formatDateTime(course.createdAt)}</span>
			</div>
			<Dropdown>
				<DropdownToggleButton>
					<Dots />
				</DropdownToggleButton>
				<CourseDropdownMenu id={course.id} />
			</Dropdown>
		</li>
	);
}

export { CourseCard };
