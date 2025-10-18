import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
    build: {
        sourcemap: false // отключаем eval в source maps
    },
    plugins: [
        tailwindcss(),
        react(),
    ],
    base: process.env.NODE_ENV === "production" ? "/React-project/" : "/",
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
