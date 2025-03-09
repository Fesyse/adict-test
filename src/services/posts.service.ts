import { removeDuplicates } from "@/lib/utils";
import { type Post } from "@/types/post";

class PostsService {
	private BASE_URL = "https://jsonplaceholder.typicode.com/posts";

	async getPosts(): Promise<Post[]> {
		const response = await fetch(this.BASE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to fetch posts");

		return response.json();
	}

	async getPostsUserIDs(): Promise<number[]> {
		const response = await fetch(this.BASE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to fetch posts user IDs");

		const posts: Post[] = await response.json();

		return removeDuplicates(posts.map((post) => post.userId));
	}

	async getPost(id: number): Promise<Post> {
		const response = await fetch(`${this.BASE_URL}/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to fetch post");

		return response.json();
	}
}

export const postsService = new PostsService();
