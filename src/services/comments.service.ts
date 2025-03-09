import { type Comment } from "@/types/comment";

class CommentsService {
	private BASE_URL = "http://localhost:8000/api/comments";

	async getComments(postId: number): Promise<Comment[]> {
		const response = await fetch(`${this.BASE_URL}?postId=${postId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok)
			throw new Error(`Failed to fetch post ${postId} comments`);

		return response.json();
	}
}

export const commentsService = new CommentsService();
