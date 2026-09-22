import { MapPin, Phone } from "lucide-react";

function ContactInfo() {
	return (
		<section className="row-start-2 w-full space-y-5 rounded-lg border border-gray-300 p-5 shadow-lg md:row-start-auto">
			<h2 className="border-b border-gray-300 py-5 text-2xl font-bold">
				Barabanki
			</h2>
			<h3 className="rounded-sm bg-primary px-3 py-1.5 text-white">Beriya</h3>

			<div className="grid grid-cols-[auto_1fr] gap-4 text-gray-900">
				<MapPin className="mt-1" />
				<div>
					<h4 className="mb-1 font-bold">Address</h4>
					<p>Village Beriya Post Budhera Tehsil Ramnagar District Barabanki.</p>
				</div>
			</div>

			<div className="grid grid-cols-[auto_1fr] gap-4 text-gray-900">
				<Phone className="mt-1" />
				<div>
					<h4 className="mb-1 font-bold">Mobile</h4>
					<p>+91 80095 95494</p>
				</div>
			</div>
		</section>
	);
}

export { ContactInfo };
