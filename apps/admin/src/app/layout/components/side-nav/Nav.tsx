import {
	BookOpen,
	GraduationCap,
	LogOut,
	MessageCircleQuestionMark,
	School,
	TagsIcon,
	UsersIcon,
} from "lucide-react";

import { HeaderLink } from "./HeaderLink";
import { ThemeToggler } from "./ThemeToggler";

type NavProps = {
	onNavigate: () => void;
};

function Nav({ onNavigate }: NavProps) {
	return (
		<nav className="flex flex-col gap-2 mt-8 h-full">
			<HeaderLink to="/admin/topics" icon={<TagsIcon />} onClick={onNavigate}>
				Topics
			</HeaderLink>
			<HeaderLink to="/admin/courses" icon={<BookOpen />} onClick={onNavigate}>
				Courses
			</HeaderLink>
			<HeaderLink
				to="/admin/students"
				icon={<GraduationCap />}
				onClick={onNavigate}
			>
				Students
			</HeaderLink>
			<HeaderLink to="/admin/batches" icon={<School />} onClick={onNavigate}>
				Batches
			</HeaderLink>
			<HeaderLink
				to="/admin/enquiries"
				icon={<MessageCircleQuestionMark />}
				onClick={onNavigate}
			>
				Enquiries
			</HeaderLink>
			<HeaderLink
				to="/admin/teachers"
				icon={<UsersIcon />}
				onClick={onNavigate}
			>
				Teachers
			</HeaderLink>
			<HeaderLink to="/admin/users" icon={<UsersIcon />} onClick={onNavigate}>
				Users
			</HeaderLink>

			<hr className="mt-auto border-gray-300 dark:border-neutral-700" />

			<ThemeToggler />

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
