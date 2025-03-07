import { postsService } from "@/services/posts.service";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export const usePosts = () => {
	const [searchParams] = useSearchParams();
	const { title, userIDs } = usePostsFiltersStore();
	const queryClient = useQueryClient();

	// Invalidation on page change
	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["posts", { title, userIDs }] });
	}, [searchParams.toString()]);

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
