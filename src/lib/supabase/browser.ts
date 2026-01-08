import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  // Access NEXT_PUBLIC_* vars directly - they're available in client components
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!key) {
    throw new Error("Missing required env var: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(url, key);
}

