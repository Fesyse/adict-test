import { removeDuplicates } from "@/lib/utils";
import { type Post } from "@/types/post";

class PostsService {
	private BASE_URL = "http://localhost:8000/api/posts";

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

	async createPost(post: Post): Promise<Post> {
		const response = await fetch(this.BASE_URL, {
			method: "POST",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to create post");

		return response.json();
	}

	async editPost(post: Post): Promise<Post> {
		const response = await fetch(`${this.BASE_URL}/${post.id}`, {
			method: "PUT",
			body: JSON.stringify(post),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to edit post");

		return response.json();
	}

	async deletePost(id: number): Promise<void> {
		const response = await fetch(`${this.BASE_URL}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) throw new Error("Failed to delete post");

		return response.json();
	}
}

export const postsService = new PostsService();
