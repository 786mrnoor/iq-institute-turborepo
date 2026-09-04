import { applyBackendErrors } from "@repo/utils/apply-backend-errors.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { topicsMutations } from "@/queries/topics";
import { TopicForm } from "./TopicForm";
import type { FormTopicData } from "./topic.schema";

type CreateTopicFormProps = {
	onCreated: () => void;
};

const DEFAULT_VALUES: FormTopicData = {
	title: "",
};

function CreateTopicForm({ onCreated }: CreateTopicFormProps) {
	const { mutateAsync } = useMutation(topicsMutations.add);

	function onSuccess() {
		toast.success("Topic Added Successfully");
		onCreated();
	}

	return (
		<TopicForm
			defaultValues={DEFAULT_VALUES}
			onSubmit={(data, setError) =>
				mutateAsync(data, {
					onSuccess,
					onError: (error) => applyBackendErrors(error, setError),
				})
			}
		/>
	);
}

export { CreateTopicForm };
