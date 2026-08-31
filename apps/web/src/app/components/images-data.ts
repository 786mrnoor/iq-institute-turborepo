import img1 from "@/assets/images/1.jpeg";
import img2 from "@/assets/images/2.jpeg";
import img3 from "@/assets/images/3.jpeg";
import img4 from "@/assets/images/4.jpeg";
import img5 from "@/assets/images/5.jpeg";
import img6 from "@/assets/images/6.jpeg";
import img7 from "@/assets/images/7.jpeg";
import type { GalleryImageProps } from "./GalleryImage";

export const images: GalleryImageProps[] = [
	{ src: img3, alt: "img-3", spanAll: true },
	{ src: img1, alt: "img-1" },
	{ src: img7, alt: "img-7" },
	{ src: img2, alt: "img-2" },
	{ src: img4, alt: "img-4" },
	{ src: img6, alt: "img-6", spanAll: true },
	{ src: img5, alt: "img-5" },
];
