import { Route, Routes } from "react-router";
import { PostsPage } from "./pages";

export function App() {
	return (
		<Routes>
			<Route index element={<PostsPage />} />
		</Routes>
	);
}
