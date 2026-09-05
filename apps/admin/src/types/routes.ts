export type AdminAppRoutes =
	| "/admin"
	| "/admin/users"
	| "/admin/users/create"
	| "/admin/topics"
	| "/admin/courses"
	| `/admin/courses/${string}`
	| "/admin/courses/add"
	| `/admin/courses/edit/${string}`
	| "/admin/enquiries";
