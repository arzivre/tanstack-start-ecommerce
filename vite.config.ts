import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";

const config = defineConfig({
    plugins: [
        nitroV2Plugin({
            preset: "vercel",
            compatibilityDate: "2026-02-16",
        }),
        devtools(),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
    ],
    resolve: {
        tsconfigPaths: true,
    },
    ssr: {
        external: ["better-auth"],
    },
});

export default config;
