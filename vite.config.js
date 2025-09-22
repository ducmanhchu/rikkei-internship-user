import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			"/api/v1": {
				target: "http://localhost:8080",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
