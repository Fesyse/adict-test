import * as fs from "fs";
import { http, HttpResponse } from "msw";
import { z } from "zod";

const postSchema = z.object({
	userId: z.number(),
	title: z.string(),
	body: z.string(),
});

const internalServerErrorResponse = new HttpResponse("Internal Server Error", {
	status: 500,
	headers: {
		"Content-Type": "text/plain",
	},
});
const badRequestResponse = new HttpResponse("Bad Request", {
	status: 400,
	headers: {
		"Content-Type": "text/plain",
	},
});
const notFoundResponse = new HttpResponse("Not Found", {
	status: 404,
	headers: {
		"Content-Type": "text/plain",
	},
});

export const handlers = [
	// Posts
	http.get("http://localhost:8000/api/posts", () => {
		try {
			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

			return HttpResponse.json(posts);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),
	http.get("http://localhost:8000/api/posts/:id", ({ params }) => {
		try {
			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
			const post = posts.find((post) => post.id === Number(params.id));

			return HttpResponse.json(post);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),
	http.post("http://localhost:8000/api/posts", async ({ request }) => {
		try {
			const { success, data: newPost } = postSchema.safeParse(
				await request.json()
			);

			if (!success) return badRequestResponse;

			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

			fs.writeFileSync(
				"./data/posts.json",
				JSON.stringify([...posts, { id: posts.length + 1, ...newPost }]),
				"utf-8"
			);

			return HttpResponse.json(newPost);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),
	http.put(
		"http://localhost:8000/api/posts/:id",
		async ({ params, request }) => {
			try {
				const { success, data: updatedPost } = postSchema.safeParse(
					await request.json()
				);

				if (!success) return badRequestResponse;

				const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));

				fs.writeFileSync(
					"./data/posts.json",
					JSON.stringify(
						posts.map((post) =>
							post.id === Number(params.id)
								? { id: post.id, ...updatedPost }
								: post
						)
					),
					"utf-8"
				);

				return HttpResponse.json(updatedPost);
			} catch (error) {
				console.log(request.url, error);
				return HttpResponse("Internal Server Error", {
					status: 500,
					headers: {
						"Content-Type": "text/plain",
					},
				});
			}
		}
	),
	http.delete("http://localhost:8000/api/posts/:id", ({ params }) => {
		try {
			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
			const updatedPosts = posts.filter(
				(post) => post.id !== Number(params.id)
			);

			fs.writeFileSync("./data/posts.json", JSON.stringify(updatedPosts));

			return HttpResponse.json(updatedPosts);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),

	// Comments
	http.get("http://localhost:8000/api/comments", ({ request }) => {
		try {
			const url = new URL(request.url);
			const postId = Number(url.searchParams.get("postId"));

			const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
			const post = posts.find((post) => post.id === postId);

			if (!post) return notFoundResponse;

			const comments = JSON.parse(
				fs.readFileSync("./data/comments.json", "utf-8")
			);
			const postComments = comments.filter(
				(comment) => comment.postId === postId
			);

			return HttpResponse.json(postComments);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),

	// Users
	http.get("http://localhost:8000/api/users/:id", ({ params }) => {
		try {
			const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
			const user = users.find((user) => user.id === Number(params.id));

			if (!user) return notFoundResponse;

			return HttpResponse.json(user);
		} catch (error) {
			console.log(request.url, error);
			return internalServerErrorResponse;
		}
	}),
];
