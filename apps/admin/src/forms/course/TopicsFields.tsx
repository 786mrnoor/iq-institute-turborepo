import { Button, ButtonGroup } from "@repo/ui/button";
import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Select } from "@repo/ui/form-controls";
import { ArrowUp } from "@repo/ui/icons/ArrowUp.tsx";
import { Trash } from "@repo/ui/icons/Trash.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	type Control,
	type FieldErrors,
	type UseFormRegister,
	useFieldArray,
} from "react-hook-form";
import { topicsQueries } from "@/queries/topics";
import type { CourseFormData, CourseFormInput } from "./course.schema";

type TopicsFiledsProps = {
	control: Control<CourseFormInput, unknown, CourseFormData>;
	register: UseFormRegister<CourseFormInput>;
	errors: FieldErrors<CourseFormInput>;
};

function TopicsFileds({ control, register, errors }: TopicsFiledsProps) {
	const { fields, append, remove, swap } = useFieldArray({
		control,
		name: "topics",
	});

	const { data: topics } = useSuspenseQuery(topicsQueries.all);

	return (
		<div className="mb-3 w-full space-y-3">
			<FieldLabel className="block">Select Topics</FieldLabel>
			{fields.map((item, index) => {
				const error = errors?.topics?.[index]?.topicId?.message;
				return (
					<FieldGroup key={item.id}>
						<FieldGroup orientation="horizontal">
							<Select
								id="topics"
								{...register(`topics.${index}.topicId`)}
								isInvalid={!!error}
							>
								<option value="">Select Topic</option>
								{topics?.map((topic) => (
									<option key={topic.id} value={topic.id}>
										{topic.title}
									</option>
								))}
							</Select>
							<ButtonGroup>
								<Button
									size="small"
									type="button"
									onClick={() => swap(index, index - 1)}
									disabled={index === 0}
								>
									<ArrowUp />
								</Button>
								<Button
									size="small"
									type="button"
									color="danger"
									onClick={() => remove(index)}
									disabled={fields.length === 1}
								>
									<Trash />
								</Button>
								<Button
									size="small"
									type="button"
									onClick={() => swap(index, index + 1)}
									disabled={index === fields.length - 1}
								>
									<ArrowUp className="rotate-180" />
								</Button>
							</ButtonGroup>
						</FieldGroup>
						<FieldError>
							{error === "Invalid ObjectId" ? "Please Select A Topic" : error}
						</FieldError>
					</FieldGroup>
				);
			})}
			<FieldError>{errors?.topics?.message}</FieldError>

			<Button type="button" onClick={() => append({ topicId: "" })}>
				Add Topic
			</Button>
		</div>
	);
}

export { TopicsFileds };
