import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteFooter from "@/components/SiteFooter";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";

export default function MapPage() {
  const items = useMemo(() => PROPERTIES, []);
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((p) => p.id === activeId) ?? items[0];

  const mapSrc = active
    ? `https://www.google.com/maps?q=${encodeURIComponent(active.mapQuery)}&output=embed`
    : "https://www.google.com/maps?q=Uruguay&output=embed";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="container flex h-16 items-center justify-between">
          <Button asChild variant="outline" size="sm" className="hover-scale">
            <Link to="/">
              <ArrowLeft /> Volver
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="glass">
              Mapa
            </Badge>
            <Badge variant="outline" className="glass">
              Uruguay Living
            </Badge>
          </div>
          <Button asChild variant="secondary" size="sm" className="hover-scale">
            <a href="#listado">Ver listado</a>
          </Button>
        </div>
      </header>

      <main className="container py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
          <aside id="listado" className="space-y-4">
            <Card className="glass rounded-3xl p-5 shadow-elevated border-border-strong/30">
              <h1 className="font-display text-2xl font-semibold">Mapa de propiedades</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Seleccioná una propiedad para ver su ubicación en Google Maps.
              </p>
            </Card>

            <div className="grid gap-3">
              {items.map((p) => {
                const isActive = p.id === activeId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    className={`text-left glass rounded-2xl border border-border-strong/30 p-4 shadow-elevated transition-all duration-200 hover:-translate-y-0.5 reduce-motion:no-anim ${
                      isActive ? "ring-1 ring-primary/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold leading-snug">{p.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground inline-flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {p.neighborhood}, {p.city}
                        </p>
                      </div>
                      <Badge variant={p.featured ? "default" : "secondary"}>{p.featured ? "Destacada" : p.type}</Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-4">
            <Card className="glass overflow-hidden rounded-3xl shadow-elevated border-border-strong/30">
              <div className="aspect-[16/10] md:aspect-[16/9]">
                <iframe
                  title="Mapa de propiedad"
                  src={mapSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
            {active ? (
              <Card className="glass rounded-3xl p-5 shadow-elevated border-border-strong/30">
                <p className="text-sm text-muted-foreground">Ubicación seleccionada</p>
                <p className="mt-1 font-semibold">{active.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.neighborhood}, {active.city}</p>
              </Card>
            ) : null}
          </section>
        </div>
      </main>

      <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
    </div>
  );
}
