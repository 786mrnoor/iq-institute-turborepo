import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Input, Textarea } from "@repo/ui/form-controls";

import type { StudentFormInput } from "../student.schema";

type ContactDetailsProps = {
	register: UseFormRegister<StudentFormInput>;
	errors: FieldErrors<StudentFormInput>;
};

function ContactDetails({ register, errors }: ContactDetailsProps) {
	return (
		<>
			<FieldGroup>
				<FieldLabel htmlFor="mobile">Student&apos;s Mobile No.</FieldLabel>
				<Input
					id="mobile"
					placeholder="Enter student mobile no."
					isInvalid={!!errors.mobile?.message}
					{...register("mobile")}
				/>
				<FieldError>{errors.mobile?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel optional htmlFor="email">
					Student&apos;s Email id
				</FieldLabel>
				<Input
					id="email"
					placeholder="Enter student email id"
					isInvalid={!!errors.email?.message}
					{...register("email")}
				/>
				<FieldError>{errors.email?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="address">Student&apos;s Address</FieldLabel>
				<Textarea
					id="address"
					autoHeight
					className="max-h-50 min-h-20"
					placeholder="Enter student mother name"
					isInvalid={!!errors.address?.message}
					{...register("address")}
				/>
				<FieldError>{errors.address?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="registeredAt">Registration Date</FieldLabel>
				<Input
					type="date"
					id="registeredAt"
					placeholder="Enter student registration date"
					isInvalid={!!errors.registeredAt?.message}
					{...register("registeredAt")}
				/>
				<FieldError>{errors.registeredAt?.message}</FieldError>
			</FieldGroup>
		</>
	);
}

export { ContactDetails };
