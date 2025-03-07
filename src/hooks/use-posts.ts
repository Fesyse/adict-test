import { postsService } from "@/services/posts.service";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
	const { title, userIDs } = usePostsFiltersStore();

	return useQuery({
		initialData: null,
		queryKey: ["posts", { title, userIDs }],
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
					if (!userIDs || userIDs.length === 0 || userIDs.includes(post.userId))
						return true;

					return false;
				});

			return posts;
		},
	});
};

export const usePostsUserIDs = () => {
	return useQuery({
		initialData: null,
		queryKey: ["posts-user-ids"],
		queryFn: async () => {
			const userIDs = await postsService.getPostsUserIDs();

			return userIDs;
		},
	});
};
