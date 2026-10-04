type AppRoutes =
	| "users"
	| "users/create"
	| "topics"
	| "courses"
	| `courses/${string}`
	| "courses/add"
	| `courses/edit/${string}`
	| "students"
	| "students/add"
	| "batches"
	| `batches/${string}`
	| `batches/edit/${string}`
	| "enquiries"
	| "teachers";

export type AdminAppRoutes = "/admin" | `/admin/${AppRoutes}`;
