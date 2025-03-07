import { PostCard } from "@/components/posts/post-card";
import { PostCardLoading } from "@/components/posts/post-card-loading";
import { PostsFilters } from "@/components/posts/posts-filters";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { usePaginationSearchParams } from "@/hooks/use-pagination-search-params";
import { usePosts } from "@/hooks/use-posts";

export const PostsPage = () => {
	const { data: posts, isLoading } = usePosts();
	const { limit, page } = usePaginationSearchParams();

	const paginatedPosts = posts?.slice(
		(page - 1) * limit,
		(page - 1) * limit + limit
	);

	return (
		<div className="min-h-screen py-20 max-w-lg mx-auto">
			<PostsFilters className="mb-8" />

			<ul className="flex flex-col gap-6">
				{paginatedPosts?.length && !isLoading ? (
					paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
				) : paginatedPosts?.length === 0 ? (
					<p className="text-center text-muted-foreground">No posts found</p>
				) : (
					Array.from({ length: limit }).map((_, index) => (
						<PostCardLoading key={index} />
					))
				)}
			</ul>

			<PostsPagination posts={posts} />
		</div>
	);
};
