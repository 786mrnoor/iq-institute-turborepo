import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggleButton,
} from "@repo/ui/dropdown";
import { Check } from "@repo/ui/icons/Check.tsx";
import { ChevronDown } from "@repo/ui/icons/ChevronDown.tsx";
import { SunMoon } from "@repo/ui/icons/SunMoon.tsx";
import { useTheme } from "@repo/utils/hooks/useTheme.ts";
import type { Theme } from "@repo/utils/theme.js";
import clsx from "clsx";

function ThemeToggler() {
	const { theme, setTheme } = useTheme();

	const options: Theme[] = ["system", "dark", "light"];

	return (
		<Dropdown>
			<DropdownToggleButton className="nav-link w-full p-2">
				<SunMoon /> Theme <ChevronDown className="ml-auto" />
			</DropdownToggleButton>
			<DropdownMenu side="top">
				{options.map((t) => (
					<DropdownItem
						key={t}
						onClick={() => setTheme(t)}
						className={clsx(
							"capitalize",
							theme === t && "bg-primary/20 flex justify-between items-center",
						)}
					>
						{t}
						{theme === t && <Check />}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
}

export { ThemeToggler };
