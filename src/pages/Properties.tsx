import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";

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
  const listingsRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<"Todas" | "Casas" | "Apartamentos">("Todas");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("Todas");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");
  const [minBeds, setMinBeds] = useState<string>("");
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");
  const [priceDisplay, setPriceDisplay] = useState<PriceDisplayMode>("both");
  const [showFilters, setShowFilters] = useState(false);

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

  const cities = useMemo(() => {
    const set = new Set(properties.map((p) => p.city));
    return ["Todas", ...Array.from(set).sort((a, b) => a.localeCompare(b, "es"))];
  }, [properties]);

  const safeNumber = (value: string) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().slice(0, 80);
    const minP = safeNumber(minPrice);
    const maxP = safeNumber(maxPrice);
    const minA = safeNumber(minArea);
    const maxA = safeNumber(maxArea);
    const minB = safeNumber(minBeds);

    const byType = (p: Property) => {
      if (filter === "Casas") return p.type === "Casa";
      if (filter === "Apartamentos") return p.type === "Apartamento";
      return true;
    };

    const byCity = (p: Property) => (city === "Todas" ? true : p.city === city);

    const byQuery = (p: Property) => {
      if (!q) return true;
      const hay = `${p.title} ${p.city} ${p.neighborhood} ${p.type}`.toLowerCase();
      return hay.includes(q);
    };

    const byNumbers = (p: Property) => {
      if (minP !== undefined && p.priceUsd < minP) return false;
      if (maxP !== undefined && p.priceUsd > maxP) return false;
      if (minA !== undefined && p.areaM2 < minA) return false;
      if (maxA !== undefined && p.areaM2 > maxA) return false;
      if (minB !== undefined && p.beds < minB) return false;
      return true;
    };

    const list = properties.filter((p) => byType(p) && byCity(p) && byQuery(p) && byNumbers(p));
    list.sort((a, b) => (sort === "price-asc" ? a.priceUsd - b.priceUsd : b.priceUsd - a.priceUsd));
    return list;
  }, [city, filter, maxArea, maxPrice, minArea, minBeds, minPrice, properties, query, sort]);

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
        <section className="container py-10 md:py-14" ref={listingsRef}>
          <SectionHeading
            eyebrow="Listado"
            title="Casas y apartamentos"
            description="Propiedades de ejemplo (simulación) mientras cargamos las reales desde el panel."
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium text-foreground">{filtered.length}</span> propiedades.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="hover-scale"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Search className="mr-2 h-4 w-4" />
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </Button>
          </div>

          {showFilters && (
          <div className="mt-6 glass rounded-3xl p-6 shadow-elevated">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="q">Buscar</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
                  <Input
                    id="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: Pocitos, casa, balcón..."
                    className="pl-9"
                    maxLength={80}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elegir" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Precio (USD)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    inputMode="numeric"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))}
                    placeholder="Mín."
                    aria-label="Precio mínimo"
                  />
                  <Input
                    inputMode="numeric"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))}
                    placeholder="Máx."
                    aria-label="Precio máximo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Superficie (m²)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    inputMode="numeric"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    placeholder="Mín."
                    aria-label="Metros cuadrados mínimos"
                  />
                  <Input
                    inputMode="numeric"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    placeholder="Máx."
                    aria-label="Metros cuadrados máximos"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dormitorios (mín.)</Label>
                <Input
                  inputMode="numeric"
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                  placeholder="Ej: 2"
                  aria-label="Dormitorios mínimos"
                />
              </div>

              <div className="space-y-2">
                <Label>Ordenar</Label>
                <Select value={sort} onValueChange={(v) => setSort(v as "price-asc" | "price-desc")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Menor a mayor precio</SelectItem>
                    <SelectItem value="price-desc">Mayor a menor precio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Mostrar precio</Label>
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

              <div className="flex items-end">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setQuery("");
                    setCity("Todas");
                    setMinPrice("");
                    setMaxPrice("");
                    setMinArea("");
                    setMaxArea("");
                    setMinBeds("");
                    setSort("price-asc");
                    setFilter("Todas");
                    setPriceDisplay("both");
                    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <X /> Limpiar
                </Button>
              </div>
            </div>
          </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
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
