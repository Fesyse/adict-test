import { postsService } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

export type UsePostsOptions = {
	page: number;
	limit: number;
};

export const usePosts = (options: UsePostsOptions) => {
	return useQuery({
		initialData: null,
		queryKey: ["posts", options],
		queryFn: async () => {
			const posts = await postsService.getPosts();

			return posts.slice(
				options.page * options.limit,
				options.page * options.limit + options.limit
			);
		},
	});
};
