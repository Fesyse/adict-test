import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},

	// @ts-expect-error - Somehow this is not a valid type, but in docs it's alright
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
	},
});
