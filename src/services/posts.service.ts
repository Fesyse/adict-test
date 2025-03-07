import { Post } from "@/types/post";

class PostsService {
	private BASE_URL = "https://jsonplaceholder.typicode.com/posts";

	async getPosts(): Promise<Post[]> {
		const response = await fetch(this.BASE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.json();
	}
}

export const postsService = new PostsService();
