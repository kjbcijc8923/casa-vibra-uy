import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

if (!url) throw new Error("VITE_SUPABASE_URL is not configured");
if (!anonKey) throw new Error("VITE_SUPABASE_PUBLISHABLE_KEY is not configured");

export const cloud = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
