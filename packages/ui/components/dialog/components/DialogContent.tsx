type DialogContentProps = {
	children: React.ReactNode;
};

function DialogContent({ children }: DialogContentProps) {
	return <main className="p-4">{children}</main>;
}

export { DialogContent };
