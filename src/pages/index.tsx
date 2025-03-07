import { PostCard } from "@/components/post-card";
import { usePosts } from "@/hooks/use-posts";
import { useSearchParams } from "react-router";

function parseNumberFromSearchParams(
	value: string | null,
	defaultValue = 0
): number {
	if (!value) return defaultValue;
	const parsedValue = parseInt(value);

	if (isNaN(parsedValue)) return defaultValue;

	return parsedValue;
}

export const PostsPage = () => {
	const [searchParams] = useSearchParams();

	const page = parseNumberFromSearchParams(searchParams.get("page"), 0);
	const limit = parseNumberFromSearchParams(searchParams.get("limit"), 10);

	const { data: posts, isLoading } = usePosts({ page, limit });

	return (
		<div className="min-h-screen py-20 max-w-lg mx-auto">
			<ul className="flex flex-col gap-6">
				{posts && !isLoading ? (
					posts.map((post) => <PostCard key={post.id} post={post} />)
				) : (
					<div>Loading...</div>
				)}
			</ul>
		</div>
	);
};
