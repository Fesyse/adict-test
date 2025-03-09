import { commentsService } from "@/services/comments.service";
import { postsService } from "@/services/posts.service";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: number) => {
	return useQuery({
		queryKey: ["post", id],
		queryFn: async () => {
			const [post, comments] = await Promise.all([
				postsService.getPost(id),
				commentsService.getComments(id),
			]);

			return { ...post, comments };
		},
		retry: false,
	});
};
