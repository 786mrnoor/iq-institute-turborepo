import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Checkable, Input } from "@repo/ui/form-controls";

import type { TeacherFormInput } from "../teacher.schema";

type BasicDetailsProps = {
	register: UseFormRegister<TeacherFormInput>;
	errors: FieldErrors<TeacherFormInput>;
};

function BasicDetails({ register, errors }: BasicDetailsProps) {
	return (
		<>
			<FieldGroup>
				<FieldLabel htmlFor="name">Teacher Name</FieldLabel>
				<Input
					autoFocus
					id="name"
					placeholder="Enter teacher name"
					isInvalid={!!errors.name?.message}
					{...register("name")}
				/>
				<FieldError>{errors.name?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="dob">Teacher&apos;s date of birth</FieldLabel>
				<Input
					id="dob"
					type="date"
					placeholder="Enter Teacher's date of birth"
					isInvalid={!!errors.dob?.message}
					{...register("dob")}
				/>
				<FieldError>{errors.dob?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="gender">Teacher&apos;s Gender</FieldLabel>
				<FieldGroup orientation="horizontal">
					<Checkable
						id="male"
						value="male"
						type="radio"
						isInvalid={!!errors.gender?.message}
						{...register("gender")}
					>
						Male
					</Checkable>
					<Checkable
						id="female"
						value="female"
						type="radio"
						isInvalid={!!errors.gender?.message}
						{...register("gender")}
					>
						Female
					</Checkable>
				</FieldGroup>
				<FieldError>{errors.gender?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="adharNo">Teacher&apos;s Adhar Number</FieldLabel>
				<Input
					id="adharNo"
					placeholder="Enter teacher's Adhar No."
					isInvalid={!!errors.adharNo?.message}
					{...register("adharNo")}
				/>
				<FieldError>{errors.adharNo?.message}</FieldError>
			</FieldGroup>
		</>
	);
}

export { BasicDetails };
