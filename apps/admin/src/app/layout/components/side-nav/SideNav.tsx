import clsx from "clsx";
import { LogOut, XIcon } from "lucide-react";

import { HeaderLink } from "./HeaderLink";
import { Nav } from "./Nav";
import { ThemeToggler } from "./ThemeToggler";

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
				"fixed h-full w-full z-2 top-0 left-0 bg-black/20 md:w-auto overflow-hidden",
				showNav ? "" : "hidden md:flex",
			)}
		>
			<div className="relative w-50 lg:w-60 h-full grid grid-cols-1 grid-rows-[1fr_auto] gap-3 border-r border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-x-hidden starting:-translate-x-full transition-all duration-400">
				<button
					type="button"
					className="absolute right-3 cursor-pointer p-2 rounded-sm hover:bg-gray-300 hover:dark:bg-neutral-700 md:hidden"
					onClick={() => setShowNav(false)}
				>
					<XIcon />
				</button>

				<Nav onNavigate={() => setShowNav(false)} />

				<div className="px-3 pb-3 space-y-2">
					<hr className="border-gray-300 dark:border-neutral-700" />

					<ThemeToggler />

					<HeaderLink
						to="void"
						icon={<LogOut />}
						className="hover:bg-red-200 hover:text-red"
					>
						Logout
					</HeaderLink>
				</div>
			</div>
		</aside>
	);
}

export { SideNav };
