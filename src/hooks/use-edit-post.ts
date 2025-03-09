import { type EditPostSchema } from "@/lib/schemas";
import { type PostPageParams } from "@/pages/posts/[id]";
import { postsService } from "@/services/posts.service";
import { type Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useSession } from "./use-session";

export const useEditPost = () => {
	const { id } = useParams<PostPageParams>();
	const queryClient = useQueryClient();
	const session = useSession();

	return useMutation({
		mutationFn: async (data: EditPostSchema) => {
			const post = await postsService.editPost({
				id: Number(id),
				userId: session.user.id,
				...data,
			});

			queryClient.setQueryData(
				["post", post.id],
				(oldPost: Post): Post => ({
					...oldPost,
					...post,
				})
			);
		},
		onSuccess: () => {
			toast.success(`Post successfully updated!`);
		},
	});
};
