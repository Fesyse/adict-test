import { PostCard } from "@/components/posts/post-card";
import { PostCardLoading } from "@/components/posts/post-card-loading";
import { PostsFilters } from "@/components/posts/posts-filters";
import { usePosts } from "@/hooks/use-posts";
import { parseNumberFromSearchParams } from "@/lib/utils";
import { useSearchParams } from "react-router";

export const PostsPage = () => {
	const [searchParams] = useSearchParams();
	const { data: posts, isLoading } = usePosts();

	const page = parseNumberFromSearchParams(searchParams.get("page"), 0);
	const limit = parseNumberFromSearchParams(searchParams.get("limit"), 10);

	const paginatedPosts = posts?.slice(page * limit, page * limit + limit);

	return (
		<div className="min-h-screen py-20 max-w-lg mx-auto">
			<PostsFilters className="mb-8" />
			<ul className="flex flex-col gap-6">
				{paginatedPosts?.length && !isLoading ? (
					paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
				) : posts?.length === 0 ? (
					<p className="text-center text-muted-foreground">No posts found</p>
				) : (
					Array.from({ length: limit }).map((_, index) => (
						<PostCardLoading key={index} />
					))
				)}
			</ul>
		</div>
	);
};
