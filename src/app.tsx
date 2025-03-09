import { PostsPage } from "@/pages";
import { PostPage } from "@/pages/posts";
import { Route, Routes } from "react-router";

export function App() {
	return (
		<Routes>
			<Route index element={<PostsPage />} />
			<Route path="posts/:id" element={<PostPage />} />
		</Routes>
	);
}
