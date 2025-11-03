import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess({ typescript: true }),
        }),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            workbox: { globPatterns: ["**/*.{js,css,html,svg,png,woff2}"] },
            manifest: {
                name: "Dozenal Calculator",
                short_name: "DozenalCalc",
                description: "A tiny offline-ready dozenal (base-12) calculator.",
                theme_color: "#0f172a",
                background_color: "#0f172a",
                display: "standalone",
                start_url: "/",
                icons: [
                ],
            },
        }),
    ],
});
