import clsx from "clsx";

type DialogContentProps = {
	children: React.ReactNode;
	className?: string;
};

function DialogContent({ children, className }: DialogContentProps) {
	return <main className={clsx("p-4 space-y-4", className)}>{children}</main>;
}

export { DialogContent };
