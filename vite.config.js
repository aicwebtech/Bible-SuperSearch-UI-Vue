import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    base: './',
    build: {
        // lib (library mode), may be needed to export as a module / library for others to use
        __lib: {
            name: 'BibleSuperSearch',
            entry: ['src/BibleSuperSearch.js'],
            fileName: (format, entryName) => `biblesupersearch-${entryName}.${format}.js`,
            cssFileName: 'biblesupersearch',
        },
        rollupOptions: {
            // https://rollupjs.org/configuration-options/#output-chunkfilenames
            external: 'BibleSuperSearch',
            output: {
                entryFileNames: `assets/[name].js`, // default is [name].js
                chunkFileNames: `assets/[name].js`, // default is [name]-[hash].js
                assetFileNames: `assets/[name].[ext]`, // default is [name]-[hash].[ext]
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
