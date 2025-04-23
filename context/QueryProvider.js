"use client";

import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
