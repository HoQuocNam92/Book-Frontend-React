import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react({
    babel: {
      plugins: ["babel-plugin-react-compiler"]
    }
  }), tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-swiper": ["swiper"],
          "vendor-recharts": ["recharts"],
          "vendor-quill": ["quill", "react-quill-new"],
          "vendor-dnd": ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
          "vendor-form": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-date": ["date-fns", "dayjs"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
