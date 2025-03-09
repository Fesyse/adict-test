import { commentsService } from "@/services/comments.service";
import { postsService } from "@/services/posts.service";
import { usersService } from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

export const usePost = (id: number) => {
	return useQuery({
		queryKey: ["post", id],
		queryFn: async () => {
			const [post, comments] = await Promise.all([
				postsService.getPost(id),
				commentsService.getComments(id),
			]);
			const author = await usersService.getUserById(post.userId);

			return { ...post, comments, author };
		},
		retry: false,
	});
};
