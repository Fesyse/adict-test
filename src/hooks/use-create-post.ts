import { type CreatePostSchema } from "@/lib/schemas";
import { postsService } from "@/services/posts.service";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "./use-session";

export const useCreatePost = () => {
	const { title, userIDs } = usePostsFiltersStore();
	const queryClient = useQueryClient();
	const session = useSession();

	return useMutation({
		mutationFn: async (data: CreatePostSchema) => {
			const post = await postsService.createPost({
				...data,
				id: 0,
				userId: session.user.id,
			});

			queryClient.setQueryData(
				["posts", { title, userIDs }],
				(oldPosts: Post[]) => {
					// Adding the new post to start of the array LOCALY
					return [{ ...post, id: oldPosts.length + 1, userId: 1 }, ...oldPosts];
				}
			);
		},
		onSuccess: () => {
			toast.success(`Post successfully created!`);
		},
	});
};
