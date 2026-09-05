import { Button, ButtonGroup } from "../../button";
import { Dialog, DialogContent, DialogHeader } from "../../dialog";

type ConfirmModalProps = {
	title: string;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	isPending: boolean;
	confirmText?: string;
	cancelText?: string;
};

function ConfirmModal({
	title,
	message,
	onConfirm,
	onCancel,
	isPending,
	confirmText = "Confirm",
	cancelText = "Cancel",
}: ConfirmModalProps) {
	return (
		<Dialog show={true} onClose={() => onCancel()}>
			<DialogHeader>
				<h2 className="text-xl font-semibold text-red">{title}</h2>
			</DialogHeader>
			<DialogContent>
				<p>{message}</p>
				<ButtonGroup className="mt-5 justify-end">
					<Button disabled={isPending} onClick={() => onCancel()}>
						{cancelText}
					</Button>

					<Button
						disabled={isPending}
						onClick={() => onConfirm()}
						color="danger"
					>
						{confirmText}
					</Button>
				</ButtonGroup>
			</DialogContent>
		</Dialog>
	);
}

export { ConfirmModal };
