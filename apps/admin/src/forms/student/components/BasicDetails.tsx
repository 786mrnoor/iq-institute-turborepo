import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { FieldError, FieldGroup, FieldLabel } from "@repo/ui/field";
import { Checkable, Input } from "@repo/ui/form-controls";

import type { StudentFormInput } from "../student.schema";

type BasicDetailsProps = {
	register: UseFormRegister<StudentFormInput>;
	errors: FieldErrors<StudentFormInput>;
};

function BasicDetails({ register, errors }: BasicDetailsProps) {
	return (
		<>
			<FieldGroup>
				<FieldLabel htmlFor="name">Student Name</FieldLabel>
				<Input
					autoFocus
					id="name"
					placeholder="Enter student name"
					isInvalid={!!errors.name?.message}
					{...register("name")}
				/>
				<FieldError>{errors.name?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="dob">Student&apos;s date of birth</FieldLabel>
				<Input
					id="dob"
					type="date"
					placeholder="Enter Student date of birth"
					isInvalid={!!errors.dob?.message}
					{...register("dob")}
				/>
				<FieldError>{errors.dob?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="gender">Student&apos;s Gender</FieldLabel>
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
				<FieldLabel htmlFor="fatherName">Student&apos;s Father Name</FieldLabel>
				<Input
					id="fatherName"
					placeholder="Enter student father name"
					isInvalid={!!errors.fatherName?.message}
					{...register("fatherName")}
				/>
				<FieldError>{errors.fatherName?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel htmlFor="motherName">Student&apos;s Mother Name</FieldLabel>
				<Input
					id="motherName"
					placeholder="Enter student mother name"
					isInvalid={!!errors.motherName?.message}
					{...register("motherName")}
				/>
				<FieldError>{errors.motherName?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel optional htmlFor="adharNo">
					Student&apos;s Adhar Number
				</FieldLabel>
				<Input
					id="adharNo"
					placeholder="Enter student Adhar No."
					isInvalid={!!errors.adharNo?.message}
					{...register("adharNo")}
				/>
				<FieldError>{errors.adharNo?.message}</FieldError>
			</FieldGroup>

			<FieldGroup>
				<FieldLabel optional htmlFor="apaarId">
					Student&apos;s APAAR ID
				</FieldLabel>
				<Input
					id="apaarId"
					placeholder="Enter student APAAR ID"
					isInvalid={!!errors.apaarId?.message}
					{...register("apaarId")}
				/>
				<FieldError>{errors.apaarId?.message}</FieldError>
			</FieldGroup>
		</>
	);
}

export { BasicDetails };
