import { useActiveTab } from "../context/tabs.context";

type TabPanelProps = {
	children: React.ReactNode;
	value: string;
	className?: string;
	keepMounted?: boolean;
};

function TabPanel({
	children,
	value,
	className,
	keepMounted = false,
}: TabPanelProps) {
	const activeTab = useActiveTab();
	const isActive = activeTab === value;

	if (!keepMounted && !isActive) return null;

	return <div className={!isActive ? "hidden" : className}>{children}</div>;
}

export { TabPanel };
