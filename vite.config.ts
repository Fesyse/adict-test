/// <reference types="vitest" />
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

	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
	},
	// @ts-expect-error Vitest is not typed
	test: {
		environment: "jsdom",
		setupFiles: ["./src/setupTests.ts"],
		globals: true,
		css: true,
	},
});
