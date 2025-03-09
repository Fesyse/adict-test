import * as fs from "fs";
import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("http://localhost:8000/api/posts", () => {
		const posts = fs.readFileSync("./data/posts.json", "utf-8");

		return HttpResponse.json(posts);
	}),
];
