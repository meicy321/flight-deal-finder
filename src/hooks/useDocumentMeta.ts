import { useEffect } from "react";

// Replaces TanStack's per-route `head()`: sets the tab title and description client-side.
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
