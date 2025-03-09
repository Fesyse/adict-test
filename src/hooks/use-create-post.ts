import { type CreatePostSchema } from "@/lib/schemas";
import { postsService } from "@/services/posts.service";
import { usePostsFiltersStore } from "@/store/posts-filters.store";
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
				userId: session.user.id,
				...data,
			});

			queryClient.invalidateQueries({
				queryKey: ["posts", { title, userIDs }],
			});

			return post;
		},
		onSuccess: () => {
			toast.success(`Post successfully created!`);
		},
	});
};
