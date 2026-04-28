import { defineConfig } from "vite"
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [tailwindcss(), reactRouter()],
    build: {
        cssCodeSplit: false,
    },
    resolve: {
        tsconfigPaths: true,
    },
    server: {
        hmr: {
            overlay: false,
        },
    },
})
