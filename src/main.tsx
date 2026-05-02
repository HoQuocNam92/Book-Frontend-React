import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/swiper-imports.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router/index.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
        },
    },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
