import { BookOpen } from "@repo/ui/icons/BookOpen.tsx";
import { GraduationCap } from "@repo/ui/icons/GraduationCap.tsx";
import { LogOut } from "@repo/ui/icons/LogOut.tsx";
import { MessageCircleQuestionMark } from "@repo/ui/icons/MessageCircleQuestionMark.tsx";
import { TagsIcon } from "@repo/ui/icons/TagsIcon.tsx";
import { UsersIcon } from "@repo/ui/icons/UsersIcon.tsx";
import { HeaderLink } from "./HeaderLink";

function Nav() {
	return (
		<nav className="flex flex-col gap-2 mt-8 h-full">
			<HeaderLink to="/admin/topics" icon={<TagsIcon />}>
				Topics
			</HeaderLink>
			<HeaderLink to="/admin/courses" icon={<BookOpen />}>
				Courses
			</HeaderLink>
			<HeaderLink to="/admin/students" icon={<GraduationCap />}>
				Students
			</HeaderLink>
			<HeaderLink to="/admin/enquiries" icon={<MessageCircleQuestionMark />}>
				Enquiries
			</HeaderLink>
			<HeaderLink to="/admin/users" icon={<UsersIcon />}>
				Users
			</HeaderLink>

			<hr className="mt-auto border-gray-300" />
			<HeaderLink
				to="void"
				icon={<LogOut />}
				className="hover:bg-red-200 hover:text-red"
			>
				Logout
			</HeaderLink>
		</nav>
	);
}

export { Nav };
