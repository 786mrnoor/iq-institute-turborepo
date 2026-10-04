import type React from "react";

import { Button } from "../../button";
import { useActiveTab, useSetActiveTab } from "../context/tabs.context";

type TabProps = {
	value: string;
	children: React.ReactNode;
	className?: string;
};

function Tab({ value, children, className }: TabProps) {
	const activeTab = useActiveTab();
	const setActive = useSetActiveTab();

	const active = activeTab === value;

	return (
		<Button
			color={active ? "success" : "transparent"}
			onClick={() => setActive(value)}
			className={className}
		>
			{children}
		</Button>
	);
}

export { Tab };
