type DialogContentProps = {
	children: React.ReactNode;
};

function DialogContent({ children }: DialogContentProps) {
	return <main className="p-4 dark:bg-neutral-900">{children}</main>;
}

export { DialogContent };
