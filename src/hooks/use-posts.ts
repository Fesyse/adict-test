import { postsService } from "@/services/posts.service";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
	const { page, limit, title, userIDs } = usePostsFiltersStore();

	return useQuery({
		initialData: null,
		queryKey: ["posts", { page, limit, title, userIDs }],
		queryFn: async () => {
			const posts = (await postsService.getPosts())
				// Filter by title
				.filter((post) => {
					if (!title || post.title.toLowerCase().includes(title.toLowerCase()))
						return true;

					return false;
				})
				// Filter by userIDs
				.filter((post) => {
					if (!userIDs || userIDs.includes(post.userId)) return true;

					return false;
				});

			// Implements pagination
			return posts.slice(page * limit, page * limit + limit);
		},
	});
};
