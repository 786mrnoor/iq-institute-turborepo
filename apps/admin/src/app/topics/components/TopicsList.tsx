import { useSuspenseQuery } from "@tanstack/react-query";
import { topicsQueries } from "@/queries/topics";
import { TopicCard } from "./TopicCard";

function TopicsList() {
	const { data: topics } = useSuspenseQuery(topicsQueries.all);

	if (topics?.length === 0)
		return <p className="text-center text-lg">No Topics Found</p>;

	return (
		<ul className="mx-auto rounded-md">
			{topics?.map((topic) => (
				<TopicCard key={topic.id} topic={topic} />
			))}
		</ul>
	);
}

export { TopicsList };
