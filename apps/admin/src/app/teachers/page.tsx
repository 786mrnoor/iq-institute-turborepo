import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@repo/ui/button";
import { Tab, TabPanel, Tabs, TabsList } from "@repo/ui/tabs";

import { SearchTeacherByAdhar } from "./components/search-teacher/SearchTeacherByAdhar";
import { SearchTeacherById } from "./components/search-teacher/SearchTeacherById";
import { TeacherListing } from "./components/TeacherListing";

function TeachersPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState({ teacherId: "", adharNo: "" });

	return (
		<main className="mx-auto my-5 w-96/100 space-y-5">
			<Button onClick={() => navigate("/admin/teachers/add")}>
				Add a Teacher
			</Button>

			<Tabs defaultValue="active" className="space-y-5">
				<TabsList>
					<Tab value="active">Active</Tab>
					<Tab value="left">Left</Tab>
					<Tab value="teacherId">Teacher ID</Tab>
					<Tab value="adharNo">Adhar No.</Tab>
				</TabsList>

				<TabPanel value="active">
					<TeacherListing filter={{ status: "active" }} />
				</TabPanel>

				<TabPanel value="left">
					<TeacherListing filter={{ status: "left" }} />
				</TabPanel>

				<TabPanel value="teacherId" keepMounted>
					<SearchTeacherById
						onSubmit={(teacherId) => setSearch({ ...search, teacherId })}
					/>
					{search.teacherId && (
						<TeacherListing filter={{ teacherId: search.teacherId }} />
					)}
				</TabPanel>

				<TabPanel value="adharNo" className="mt-2" keepMounted>
					<SearchTeacherByAdhar
						onSubmit={(adharNo) => setSearch({ ...search, adharNo })}
					/>
					{search.adharNo && (
						<TeacherListing filter={{ adharNo: search.adharNo }} />
					)}
				</TabPanel>
			</Tabs>
		</main>
	);
}

export { TeachersPage };
