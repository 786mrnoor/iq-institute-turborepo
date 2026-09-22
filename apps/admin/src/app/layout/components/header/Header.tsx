import { CircleUserRound, Menu } from "lucide-react";
import { useLocation } from "react-router";

import type { AdminAppRoutes } from "@/types/routes";

const HEADING: Record<AdminAppRoutes, string> = {
	"/admin": "Dashboard",
	"/admin/topics": "Topics",
	"/admin/courses": "Courses",
	"/admin/courses/add": "Add a new course",
	"/admin/students": "Students",
	"/admin/students/add": "Add a new student",
	"/admin/users/create": "Create User",
	"/admin/enquiries": "Enquiries",
	"/admin/users": "Users",
};

type HeaderProps = {
	onOpen: () => void;
};
function Header({ onOpen }: HeaderProps) {
	const { pathname } = useLocation();

	let heading = HEADING[pathname as AdminAppRoutes];
	if (!heading) {
		if (pathname.startsWith("/admin/courses/edit")) {
			heading = "Update the course";
		} else if (pathname.startsWith("/admin/courses")) {
			heading = "Course";
		} else if (pathname.startsWith("/admin/students/edit")) {
			heading = "Update the student";
		}
	}

	return (
		<header className="sticky top-0 left-50 right-0 p-2 sm:p-3 z-1 bg-white flex items-center gap-1 md:gap-3 border-b border-gray-300 mb-5 dark:bg-neutral-900 dark:border-neutral-700">
			<button
				type="button"
				className="md:hidden p-2 rounded-sm cursor-pointer hover:bg-gray-300 hover:dark:bg-neutral-700"
				onClick={() => onOpen()}
			>
				<Menu className="md:size-8" />
			</button>

			<h1 className="mr-auto text-xl md:text-3xl font-semibold text-primary whitespace-pre text-ellipsis overflow-hidden">
				{heading}
			</h1>

			<div className="hidden md:block">
				<p>User Name</p>
				<p className="text-sm text-end">Super Admin</p>
			</div>
			<button
				type="button"
				className="p-1 text-primary cursor-pointer rounded-full"
			>
				<CircleUserRound className="size-10" />
			</button>
		</header>
	);
}

export { Header };
