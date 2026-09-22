import type React from "react";

type NotFoundProps = {
	children: React.ReactNode;
};

function NotFound({ children }: NotFoundProps) {
	return (
		<div className="w-9/10 max-w-150 space-y-5 my-12 mx-auto text-center">
			<div>
				<h1 className="text-cyan-600 text-[18vw] font-bold">404</h1>
				<h3 className="text-xl uppercase">OOPS! PAGE NOT FOUND</h3>
				<p className="text-lg text-gray-400">
					Sorry, the page you are looking for does not exist or was removed.
				</p>
				{children}
			</div>
		</div>
	);
}

export { NotFound };
