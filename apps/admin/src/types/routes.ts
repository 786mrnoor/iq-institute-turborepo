export type AdminAppRoutes =
	| "/admin"
	| "/admin/users"
	| "/admin/users/create"
	| "/admin/topics"
	| "/admin/courses"
	| `/admin/courses/${string}`
	| "/admin/courses/add"
	| `/admin/courses/edit/${string}`
	| "/admin/students"
	| "/admin/students/add"
	| "/admin/batches"
	| `/admin/batches/${string}`
	| `/admin/batches/edit/${string}`
	| "/admin/enquiries";
