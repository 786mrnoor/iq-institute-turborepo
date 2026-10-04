import type React from "react";
import { useState } from "react";

import {
	ActiveTabContext,
	ActiveTabDispatchContext,
} from "./context/tabs.context";

type TabsProps = {
	children: React.ReactNode;
	defaultValue?: string;
	onChange?: (value: null | string) => void;
	className?: string;
};

function Tabs<T extends string = string>({
	children,
	defaultValue,
	onChange,
	className,
}: TabsProps) {
	const [activeTab, setActiveTab] = useState<null | string>(
		defaultValue || null,
	);

	function onTrigger(value: null | string) {
		setActiveTab(value);
		onChange?.(value);
	}

	return (
		<div className={className}>
			<ActiveTabContext value={activeTab}>
				<ActiveTabDispatchContext value={onTrigger}>
					{children}
				</ActiveTabDispatchContext>
			</ActiveTabContext>
		</div>
	);
}

export { Tabs };
