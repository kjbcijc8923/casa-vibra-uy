// Public endpoint: returns published properties + signed cover photo URL
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not configured");
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: props, error } = await supabase
    .from("public_properties")
    .select("id,title,description,city,neighborhood,address,price_uyu,price_usd,beds,baths,area_m2,created_at,updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const ids = (props ?? []).map((p) => p.id);
  const { data: photos } = await supabase
    .from("public_property_photos")
    .select("property_id,object_path,sort_order")
    .in("property_id", ids)
    .order("sort_order", { ascending: true });

  const byProp = new Map<string, string[]>();
  for (const ph of photos ?? []) {
    const arr = byProp.get(ph.property_id) ?? [];
    arr.push(ph.object_path);
    byProp.set(ph.property_id, arr);
  }

  const bucket = "property-photos";
  const result = [] as any[];
  for (const p of props ?? []) {
    const paths = byProp.get(p.id) ?? [];
    const coverPath = paths[0];
    let coverUrl: string | null = null;
    if (coverPath) {
      const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(coverPath, 60 * 30);
      coverUrl = signed?.signedUrl ?? null;
    }
    result.push({ ...p, cover_url: coverUrl });
  }

  return new Response(JSON.stringify({ properties: result }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
