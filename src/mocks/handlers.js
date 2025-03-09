import * as fs from "fs";
import { http, HttpResponse } from "msw";
import { z } from "zod";

const postSchema = z.object({
	id: z.number(),
	userId: z.number(),
	title: z.string(),
	body: z.string(),
});

export const handlers = [
	// Posts
	http.get("http://localhost:8000/api/posts", () => {
		const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

		return HttpResponse.json(posts);
	}),
	http.get("http://localhost:8000/api/posts/:id", ({ params }) => {
		const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
		const post = posts.find((post) => post.id === Number(params.id));

		return HttpResponse.json(post);
	}),
	http.post("http://localhost:8000/api/posts", async ({ request }) => {
		const { success, data: newPost } = postSchema.safeParse(
			await request.json()
		);

		if (!success) return HttpResponse.error(400);

		const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

		fs.writeFileSync(
			"./data/posts.json",
			JSON.stringify([...posts, newPost]),
			"utf-8"
		);

		return HttpResponse.json(newPost);
	}),
	http.put(
		"http://localhost:8000/api/posts/:id",
		async ({ params, request }) => {
			const { success, data: updatedPost } = postSchema.safeParse(
				await request.json()
			);

			if (!success) return HttpResponse.error(400);

			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

			fs.writeFileSync(
				"./data/posts.json",
				JSON.stringify(
					posts.map((post) =>
						post.id === Number(params.id) ? updatedPost : post
					)
				),
				"utf-8"
			);

			return HttpResponse.json(updatedPost);
		}
	),
	http.delete("http://localhost:8000/api/posts/:id", ({ params }) => {
		const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
		const updatedPosts = posts.filter((post) => post.id !== Number(params.id));

		fs.writeFileSync("./data/posts.json", JSON.stringify(updatedPosts));

		return HttpResponse.json(updatedPosts);
	}),
	// Comments
	http.get("http://localhost:8000/api/comments", ({ request }) => {
		const searchParams = new URLSearchParams(request.url);

		const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
		const post = posts.find((post) => post.id === searchParams.get("postId"));

		if (!post) return HttpResponse.error(404);

		const comments = JSON.parse(
			fs.readFileSync("./data/comments.json", "utf-8")
		);
		const postComments = comments.filter(
			(comment) => comment.postId === Number(params.id)
		);

		return HttpResponse.json(postComments);
	}),
	// Users
	http.get("http://localhost:8000/api/users/:id", ({ params }) => {
		const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
		const user = users.find((user) => user.id === Number(params.id));

		if (!user) return HttpResponse.error(404);

		return HttpResponse.json(user);
	}),
];
