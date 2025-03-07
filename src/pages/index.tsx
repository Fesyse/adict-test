import { PostCard } from "@/components/post-card";
import { PostCardLoading } from "@/components/post-card-loading";
import { usePosts } from "@/hooks/use-posts";
import { usePostsFiltersStore } from "@/store/posts-filters.store";

export const PostsPage = () => {
	const { data: posts, isLoading } = usePosts();
	const limit = usePostsFiltersStore((s) => s.limit);

	return (
		<div className="min-h-screen py-20 max-w-lg mx-auto">
			<ul className="flex flex-col gap-6">
				{posts?.length && !isLoading ? (
					posts.map((post) => <PostCard key={post.id} post={post} />)
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
