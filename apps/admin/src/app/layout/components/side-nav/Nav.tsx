import { BookOpen } from "@repo/ui/icons/BookOpen.tsx";
import { GraduationCap } from "@repo/ui/icons/GraduationCap.tsx";
import { LogOut } from "@repo/ui/icons/LogOut.tsx";
import { MessageCircleQuestionMark } from "@repo/ui/icons/MessageCircleQuestionMark.tsx";
import { TagsIcon } from "@repo/ui/icons/TagsIcon.tsx";
import { UsersIcon } from "@repo/ui/icons/UsersIcon.tsx";
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
			<HeaderLink
				to="/admin/enquiries"
				icon={<MessageCircleQuestionMark />}
				onClick={onNavigate}
			>
				Enquiries
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
