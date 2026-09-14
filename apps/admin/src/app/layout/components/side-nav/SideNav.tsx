import { XIcon } from "@repo/ui/icons/XIcon.js";
import clsx from "clsx";
import navBg from "@/assets/images/icon.jpg";
import { AppLink } from "@/components/link/AppLink";
import { Nav } from "./Nav";

type SideNavProps = {
	showNav: boolean;
	setShowNav: (state: boolean) => void;
};

function SideNav({ showNav, setShowNav }: SideNavProps) {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: reason
		<aside
			onClick={(e) => e.target === e.currentTarget && setShowNav(false)}
			className={clsx(
				"fixed h-full w-full z-2 top-0 left-0 bg-black/20 md:w-auto ",
				showNav ? "" : "hidden md:flex",
			)}
		>
			<div className="relative w-50 lg:w-60 h-full flex flex-col border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-x-hidden p-3 starting:-translate-x-full transition-all duration-400">
				<button
					type="button"
					className="absolute right-3 cursor-pointer p-2 rounded-sm dark:text-neutral-200 hover:bg-gray-300 hover:dark:bg-neutral-700 md:hidden"
					onClick={() => setShowNav(false)}
				>
					<XIcon />
				</button>

				<AppLink to="/admin" className="w-fit">
					<img
						src={navBg}
						alt="nav-bg"
						className="w-30 aspect-square object-cover object-center rounded-full"
					/>
				</AppLink>

				<Nav onNavigate={() => setShowNav(false)} />
			</div>
		</aside>
	);
}

export { SideNav };
