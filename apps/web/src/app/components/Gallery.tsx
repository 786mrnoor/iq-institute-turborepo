import { GalleryImage } from "./GalleryImage";
import { images } from "./images-data";

function Gallery() {
	return (
		<section className="m-auto w-[96%] max-w-7xl columns-1 gap-x-5 text-center sm:columns-2 md:columns-3 lg:columns-4 space-y-5">
			{images.map((image, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: can not use other element
				<GalleryImage key={i} {...image} />
			))}
		</section>
	);
}

export { Gallery };
