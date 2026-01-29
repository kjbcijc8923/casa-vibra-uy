import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImagePlus, LogOut, Plus, ShieldAlert, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cloud } from "@/lib/cloud";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-admin";
import WhatsAppLogo from "@/components/WhatsAppLogo";

type AdminProperty = {
  id: string;
  title: string;
  city: string;
  neighborhood: string;
  address: string;
  description: string;
  price_uyu: number;
  price_usd: number | null;
  beds: number;
  baths: number;
  area_m2: number;
  is_published: boolean;
};

export default function AdminPanel() {
  const nav = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin(user?.id);

  const [items, setItems] = useState<AdminProperty[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    city: "Montevideo",
    neighborhood: "",
    address: "",
    description: "",
    price_uyu: "",
    price_usd: "",
    beds: "2",
    baths: "1",
    area_m2: "60",
    is_published: false,
  });

  useEffect(() => {
    if (!authLoading && !user) nav("/admin/login");
  }, [authLoading, user, nav]);

  async function load() {
    setError(null);
    const { data, error: err } = await cloud.from("admin_properties").select("*").order("created_at", { ascending: false });
    if (err) setError(err.message);
    setItems((data as any[]) ?? []);
  }

  useEffect(() => {
    if (user && isAdmin) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const canSeePanel = user && !adminLoading && isAdmin;

  async function bootstrapAdmin() {
    setBusy(true);
    setError(null);
    const { data, error: err } = await cloud.functions.invoke("bootstrap-admin");
    if (err) setError(err.message);
    setBusy(false);
    if (!err && data?.ok) window.location.reload();
  }

  async function createProperty() {
    setBusy(true);
    setError(null);
    const payload = {
      title: form.title.trim(),
      city: form.city.trim(),
      neighborhood: form.neighborhood.trim(),
      address: form.address.trim(),
      description: form.description.trim(),
      price_uyu: Number(form.price_uyu || 0),
      price_usd: form.price_usd ? Number(form.price_usd) : null,
      beds: Number(form.beds || 0),
      baths: Number(form.baths || 0),
      area_m2: Number(form.area_m2 || 0),
      is_published: form.is_published,
    };
    const { error: err } = await cloud.from("properties").insert(payload);
    if (err) setError(err.message);
    setBusy(false);
    if (!err) {
      setForm((s) => ({ ...s, title: "", neighborhood: "", address: "", description: "" }));
      load();
    }
  }

  async function togglePublish(p: AdminProperty) {
    setBusy(true);
    setError(null);
    const { error: err } = await cloud.from("properties").update({ is_published: !p.is_published }).eq("id", p.id);
    if (err) setError(err.message);
    setBusy(false);
    if (!err) load();
  }

  async function removeProperty(id: string) {
    setBusy(true);
    setError(null);
    const { error: err } = await cloud.from("properties").delete().eq("id", id);
    if (err) setError(err.message);
    setBusy(false);
    if (!err) load();
  }

  async function uploadCover(propertyId: string, file: File) {
    setBusy(true);
    setError(null);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
    const path = `${propertyId}/${crypto.randomUUID()}.${ext}`;

    const { error: upErr } = await cloud.storage.from("property-photos").upload(path, file, {
      upsert: false,
      contentType: file.type,
    });
    if (upErr) {
      setError(upErr.message);
      setBusy(false);
      return;
    }
    const { error: insErr } = await cloud.from("property_photos").insert({ property_id: propertyId, object_path: path, sort_order: 0 });
    if (insErr) setError(insErr.message);
    setBusy(false);
    if (!insErr) load();
  }

  async function logout() {
    await cloud.auth.signOut();
    nav("/");
  }

  const header = useMemo(
    () => (
      <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-semibold">Uruguay Living</span>
            <Badge variant="outline" className="glass">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">Ver sitio</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut /> Salir
            </Button>
          </div>
        </div>
      </header>
    ),
    [],
  );

  if (authLoading) return null;

  if (user && !adminLoading && !isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        {header}
        <div className="container py-14">
          <Card className="glass rounded-3xl p-8 shadow-elevated">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-5 w-5" />
              <div>
                <h1 className="font-display text-2xl font-semibold">Falta habilitar admin</h1>
                <p className="mt-2 text-muted-foreground">
                  Para que el panel funcione, primero activá el rol administrador (solo permitido para el email autorizado).
                </p>
                {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button variant="whatsapp" onClick={bootstrapAdmin} disabled={busy}>
                    <WhatsAppLogo /> Activar admin
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Volver al sitio</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {header}
      <main className="container py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="glass rounded-3xl p-6 shadow-elevated lg:col-span-1">
            <h2 className="font-display text-xl font-semibold">Nueva propiedad</h2>
            <p className="mt-2 text-sm text-muted-foreground">Cargá datos reales y luego subí la foto principal.</p>
            {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
            <div className="mt-5 grid gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Input value={form.city} onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Barrio</Label>
                  <Input value={form.neighborhood} onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Precio UYU</Label>
                  <Input inputMode="numeric" value={form.price_uyu} onChange={(e) => setForm((s) => ({ ...s, price_uyu: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) }))} />
                </div>
                <div className="space-y-2">
                  <Label>Precio USD (opcional)</Label>
                  <Input inputMode="numeric" value={form.price_usd} onChange={(e) => setForm((s) => ({ ...s, price_usd: e.target.value.replace(/[^0-9]/g, "").slice(0, 10) }))} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Dorm.</Label>
                  <Input inputMode="numeric" value={form.beds} onChange={(e) => setForm((s) => ({ ...s, beds: e.target.value.replace(/[^0-9]/g, "").slice(0, 2) }))} />
                </div>
                <div className="space-y-2">
                  <Label>Baños</Label>
                  <Input inputMode="numeric" value={form.baths} onChange={(e) => setForm((s) => ({ ...s, baths: e.target.value.replace(/[^0-9]/g, "").slice(0, 2) }))} />
                </div>
                <div className="space-y-2">
                  <Label>m²</Label>
                  <Input inputMode="numeric" value={form.area_m2} onChange={(e) => setForm((s) => ({ ...s, area_m2: e.target.value.replace(/[^0-9]/g, "").slice(0, 5) }))} />
                </div>
              </div>
              <Button onClick={createProperty} disabled={busy || !form.title || !form.price_uyu}>
                <Plus /> Crear
              </Button>
            </div>
          </Card>

          <Card className="glass rounded-3xl p-6 shadow-elevated lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold">Propiedades</h2>
                <p className="mt-1 text-sm text-muted-foreground">Publicá/ocultá y subí foto principal.</p>
              </div>
              <Button variant="outline" onClick={load} disabled={!canSeePanel || busy}>
                Recargar
              </Button>
            </div>

            <div className="mt-6 grid gap-4">
              {items.map((p) => (
                <div key={p.id} className="rounded-2xl border border-border-strong/35 bg-background/50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{p.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.neighborhood}, {p.city} · {p.price_uyu.toLocaleString("es-UY")} UYU
                        {p.price_usd ? ` (${p.price_usd.toLocaleString("es-UY")} USD)` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant={p.is_published ? "secondary" : "highlight"} size="sm" onClick={() => togglePublish(p)} disabled={busy}>
                        {p.is_published ? "Ocultar" : "Publicar"}
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => removeProperty(p.id)} disabled={busy}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-md border border-border-strong/35 px-3 py-2">
                        <ImagePlus className="h-4 w-4" /> Subir foto principal
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) uploadCover(p.id, f);
                        }}
                      />
                    </label>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/propiedad/${p.id}`}>Ver detalle</Link>
                    </Button>
                  </div>
                </div>
              ))}
              {items.length === 0 ? (
                <div className="rounded-2xl border border-border-strong/25 bg-background/40 p-8 text-center text-sm text-muted-foreground">
                  No hay propiedades aún. Creá la primera desde el formulario.
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
