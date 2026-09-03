import { useMemo } from "react";

import { PaginationButton } from "./components/PaginationButton";

type PaginationProps = {
	onChange: (page: number) => void;
	limit: number;
	total: number;
	page: number;
};

function Pagination({ onChange, limit, total, page }: PaginationProps) {
	const pageNumbers = useMemo(() => {
		const paginationNumbers = [];

		for (let i = 1; i <= Math.ceil(total / limit); i++) {
			paginationNumbers.push(i);
		}

		return paginationNumbers;
	}, [total, limit]);

	return (
		<ul className="isolate flex flex-wrap justify-center">
			<li>
				<PaginationButton
					onClick={() => onChange(page - 1)}
					aria-label="Previous"
					className="rounded-l-md"
					disabled={page <= 1}
				>
					<span aria-hidden="true">&laquo;</span>
				</PaginationButton>
			</li>

			{pageNumbers.map((pageNumber) => (
				<li key={pageNumber}>
					<PaginationButton
						onClick={() => onChange(pageNumber)}
						className={
							page === pageNumber
								? "z-1 border-primary bg-primary text-white"
								: ""
						}
					>
						{pageNumber}
					</PaginationButton>
				</li>
			))}

			<li className="page-item">
				<PaginationButton
					className="rounded-r-md"
					onClick={() => onChange(page + 1)}
					disabled={page >= pageNumbers.length}
				>
					<span aria-hidden="true">&raquo;</span>
				</PaginationButton>
			</li>
		</ul>
	);
}

export { Pagination };
