import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";

export type GalleryImageProps = {
	src: StaticImageData;
	alt: string;
	spanAll?: boolean;
};

function GalleryImage({ src, alt, spanAll }: GalleryImageProps) {
	return (
		<Image
			src={src}
			alt={alt}
			className={clsx(
				"break-inside-avoid overflow-hidden rounded-lg border border-gray-300",
				"w-full shadow-[0_2px_5px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-102",
				spanAll && "[column-span:all]",
			)}
		/>
	);
}

export { GalleryImage };
