import { Suspense } from "react";

import { getCoursesApi } from "@repo/api-client/courses.ts";

import { ContactInfo } from "./components/ContactInfo";
import { Form } from "./components/Form";

async function ContactUsPage() {
	const courses = await getCoursesApi(process.env.NEXT_BACKEND_URL);

	return (
		<main className="m-auto grid w-94/100 max-w-300 grid-cols-1 gap-5 py-5 md:w-9/10 md:grid-cols-[350px_1fr] md:px-5">
			<ContactInfo />
			<Suspense>
				<Form courses={courses} />
			</Suspense>

			<iframe
				title="institute location"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2512.6348295447983!2d81.2923594524889!3d27.049045761170103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399965aa13ccb65f%3A0x85da19f471542083!2sJan%20Seva%20Kendra%20Beriya!5e0!3m2!1sen!2sin!4v1786779807909!5m2!1sen!2sin"
				width="600"
				className="col-span-2 aspect-video max-h-100 w-full border-0"
				allowFullScreen
				loading="lazy"
				referrerPolicy="strict-origin-when-cross-origin"
			></iframe>
		</main>
	);
}

export default ContactUsPage;
