import { postsService } from "@/services/posts.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = (id: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const response = await postsService.deletePost(id);

			queryClient.setQueryData(["post", id], () => null);

			return response;
		},
	});
};
