import { removeDuplicates } from "@/lib/utils";
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

	async getPostsUserIDs(): Promise<number[]> {
		const response = await fetch(this.BASE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const posts: Post[] = await response.json();

		return removeDuplicates(posts.map((post) => post.userId));
	}
}

export const postsService = new PostsService();
