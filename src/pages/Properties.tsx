import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard, { type PriceDisplayMode, type Property } from "@/components/PropertyCard";
import SiteFooter from "@/components/SiteFooter";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";

export default function PropertiesPage() {
  const [filter, setFilter] = useState<"Todas" | "Casas" | "Apartamentos">("Todas");
  const [priceDisplay, setPriceDisplay] = useState<PriceDisplayMode>("both");

  const properties: Property[] = useMemo(
    () =>
      PROPERTIES.map((p) => ({
        id: p.id,
        title: p.title,
        city: p.city,
        neighborhood: p.neighborhood,
        type: p.type,
        priceUsd: p.priceUsd,
        beds: p.beds,
        baths: p.baths,
        areaM2: p.areaM2,
        imageSrc: p.images[0],
        featured: p.featured,
        href: `/propiedad/${p.id}`,
      })),
    [],
  );

  const filtered = useMemo(() => {
    const byType = (p: Property) => {
      if (filter === "Casas") return p.type === "Casa";
      if (filter === "Apartamentos") return p.type === "Apartamento";
      return true;
    };
    return properties.filter((p) => byType(p));
  }, [filter, properties]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="container flex h-16 items-center justify-between">
          <Button asChild variant="outline" size="sm" className="hover-scale">
            <Link to="/">
              <ArrowLeft /> Inicio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="glass">
              Propiedades
            </Badge>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/mapa">Mapa</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/contacto">Contacto</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container py-10 md:py-14">
          <SectionHeading
            eyebrow="Listado"
            title="Casas y apartamentos"
            description="Propiedades de ejemplo (simulación) mientras cargamos las reales desde el panel."
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">{filtered.length}</span> propiedades.
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-muted-foreground">Moneda:</span>
              <ToggleGroup
                type="single"
                value={priceDisplay}
                onValueChange={(v) => setPriceDisplay((v || "both") as PriceDisplayMode)}
                variant="outline"
                size="sm"
                className="justify-start"
                aria-label="Elegir moneda a mostrar"
              >
                <ToggleGroupItem value="uyu" aria-label="Mostrar solo UYU">
                  UYU
                </ToggleGroupItem>
                <ToggleGroupItem value="usd" aria-label="Mostrar solo USD">
                  USD
                </ToggleGroupItem>
                <ToggleGroupItem value="both" aria-label="Mostrar UYU y USD">
                  Ambas
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button variant={filter === "Todas" ? "highlight" : "secondary"} size="sm" onClick={() => setFilter("Todas")}>
              Todas
            </Button>
            <Button variant={filter === "Casas" ? "highlight" : "secondary"} size="sm" onClick={() => setFilter("Casas")}>
              Casas
            </Button>
            <Button
              variant={filter === "Apartamentos" ? "highlight" : "secondary"}
              size="sm"
              onClick={() => setFilter("Apartamentos")}
            >
              Apartamentos
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} priceDisplay={priceDisplay} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
    </div>
  );
}
