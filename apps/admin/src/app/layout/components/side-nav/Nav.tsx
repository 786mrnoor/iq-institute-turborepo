import {
	BookOpen,
	GraduationCap,
	MessageCircleQuestionMark,
	School,
	TagsIcon,
	UsersIcon,
} from "lucide-react";

import navBg from "@/assets/images/icon.jpg";
import { AppLink } from "@/components/link/AppLink";
import { HeaderLink } from "./HeaderLink";

type NavProps = {
	onNavigate: () => void;
};

function Nav({ onNavigate }: NavProps) {
	return (
		<nav className="px-3 space-y-2 h-full overflow-auto scrollbar-thin">
			<div className="pt-3 sticky top-0 bg-white dark:bg-neutral-900">
				<AppLink to="/admin" className="w-fit">
					<img
						src={navBg}
						alt="nav-bg"
						className="w-30 aspect-square object-cover object-center rounded-full"
					/>
				</AppLink>
			</div>
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
		</nav>
	);
}

export { Nav };
