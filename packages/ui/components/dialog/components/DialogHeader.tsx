import { XIcon } from "lucide-react";
import { useDialogClose } from "../context/dialog.context";

type DialogHeaderProps = {
	children: React.ReactNode;
};

function DialogHeader({ children }: DialogHeaderProps) {
	const onClose = useDialogClose();

	return (
		<header className="sticky top-0 left-0 border-b border-gray-300 p-4 dark:border-neutral-700">
			<button
				type="button"
				onClick={() => onClose()}
				className="absolute top-2 right-2 cursor-pointer rounded-xs outline-none focus:ring-2 focus:ring-primary/50"
			>
				<XIcon />
			</button>
			{children}
		</header>
	);
}

export { DialogHeader };
