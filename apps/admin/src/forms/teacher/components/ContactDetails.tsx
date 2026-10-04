import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Textarea } from "@repo/ui/form-controls";

import type { TeacherFormInput } from "../teacher.schema";

type ContactDetailsProps = {
	register: UseFormRegister<TeacherFormInput>;
	errors: FieldErrors<TeacherFormInput>;
};

function ContactDetails({ register, errors }: ContactDetailsProps) {
	return (
		<>
			<FieldGroup>
				<FieldLabel htmlFor="mobile">Teacher&apos;s Mobile No.</FieldLabel>
				<Input
					id="mobile"
					placeholder="Enter teacher's mobile no."
					isInvalid={!!errors.mobile?.message}
					{...register("mobile")}
				/>
				<FieldError>{errors.mobile?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel optional htmlFor="email">
					Teacher&apos;s Email id
				</FieldLabel>
				<Input
					id="email"
					placeholder="Enter teacher's email id"
					isInvalid={!!errors.email?.message}
					{...register("email")}
				/>
				<FieldError>{errors.email?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="address">Teacher&apos;s Address</FieldLabel>
				<Textarea
					id="address"
					autoHeight
					className="max-h-50 min-h-20"
					placeholder="Enter teacher's address"
					isInvalid={!!errors.address?.message}
					{...register("address")}
				/>
				<FieldError>{errors.address?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="joinedAt">Joining Date</FieldLabel>
				<Input
					type="date"
					id="joinedAt"
					placeholder="Enter teacher's registration date"
					isInvalid={!!errors.joinedAt?.message}
					{...register("joinedAt")}
				/>
				<FieldError>{errors.joinedAt?.message}</FieldError>
			</FieldGroup>
		</>
	);
}

export { ContactDetails };
