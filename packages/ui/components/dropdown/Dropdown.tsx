import { DropownProvider } from "./context/dropown.provider";

function Dropdown({ children }: { children: React.ReactNode }) {
	return (
		<DropownProvider>
			<div className="relative">{children}</div>
		</DropownProvider>
	);
}

export { Dropdown };
