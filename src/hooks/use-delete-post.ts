import { postsService } from "@/services/posts.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePost = (id: number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const response = await postsService.deletePost(id);

			queryClient.invalidateQueries({
				queryKey: ["post", id],
			});
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});

			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["post", id],
			});
			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});

			toast.success("Post deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete post");
		},
	});
};
