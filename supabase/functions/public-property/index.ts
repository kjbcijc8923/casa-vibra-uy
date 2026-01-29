// Public endpoint: returns one property + signed photo URLs
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

  const url = new URL(req.url);
  let id = url.searchParams.get("id");
  if (!id && req.method !== "GET") {
    try {
      const body = await req.json();
      id = body?.id;
    } catch {
      // ignore
    }
  }
  if (!id) {
    return new Response(JSON.stringify({ error: "missing_id" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: p, error } = await supabase
    .from("public_properties")
    .select("id,title,description,city,neighborhood,address,price_uyu,price_usd,beds,baths,area_m2,created_at,updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!p) {
    return new Response(JSON.stringify({ error: "not_found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: photos } = await supabase
    .from("public_property_photos")
    .select("object_path,sort_order")
    .eq("property_id", id)
    .order("sort_order", { ascending: true });

  const bucket = "property-photos";
  const urls: string[] = [];
  for (const ph of photos ?? []) {
    const { data: signed } = await supabase.storage.from(bucket).createSignedUrl(ph.object_path, 60 * 30);
    if (signed?.signedUrl) urls.push(signed.signedUrl);
  }

  return new Response(JSON.stringify({ property: p, photos: urls }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
