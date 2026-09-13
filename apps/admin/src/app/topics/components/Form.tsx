import { Button } from "@repo/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@repo/ui/dialog";
import { ErrorScreen } from "@repo/ui/error-screen";
import { QueryLoader } from "@repo/ui/query-loder";
import { Suspense, useState } from "react";
import { CreateTopicForm } from "@/forms/topic/CreateTopicForm";
import { EditTopicForm } from "@/forms/topic/EditTopicForm";
import { useEditId, useSetEditId } from "../context/EditContext";

function Form() {
	const editId = useEditId();
	const setEditId = useSetEditId();

	const [showDialog, setShowDialog] = useState(false);

	function handleClose() {
		setShowDialog(false);
		setEditId(null);
	}

	return (
		<>
			<Button onClick={() => setShowDialog(true)}>Add New Topic</Button>

			<Dialog
				show={showDialog || !!editId}
				onClose={handleClose}
				closedBy={editId ? "closerequest" : "any"}
			>
				<DialogHeader>
					<h2 className="text-lg font-medium dark:text-neutral-200">
						{editId ? "Edit" : "Add"} Topic
					</h2>
				</DialogHeader>
				<DialogContent>
					{editId ? (
						<ErrorScreen title="Error Loading Topics">
							<Suspense fallback={<QueryLoader>Loading topics...</QueryLoader>}>
								<EditTopicForm editId={editId} onUpdated={handleClose} />
							</Suspense>
						</ErrorScreen>
					) : (
						<CreateTopicForm onCreated={handleClose} />
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

export { Form };
