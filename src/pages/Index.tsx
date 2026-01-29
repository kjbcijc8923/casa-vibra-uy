import { useMemo, useRef, useState } from "react";
import { ArrowDown, Building2, Home, MapPinned, MessageCircle, Search, Sparkles, X } from "lucide-react";

import heroImage from "@/assets/uy-real-estate-hero.jpg";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";

const Index = () => {
  const [filter, setFilter] = useState<"Todas" | "Casas" | "Apartamentos">("Todas");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<string>("Todas");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");
  const [minBeds, setMinBeds] = useState<string>("");
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");

  const listingsRef = useRef<HTMLDivElement | null>(null);

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

  const waGeneral = buildWhatsAppLink(WHATSAPP_NUMBER_NO_PLUS, "Hola, quiero asesoramiento para comprar una propiedad en Uruguay.");

  const onHeroMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-hero shadow-glow">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold">MonteUruguay</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#propiedades">
              Propiedades
            </a>
            <a className="hover:text-foreground" href="#zonas">
              Zonas
            </a>
            <a className="hover:text-foreground" href="#contacto">
              Contacto
            </a>
          </nav>
          <Button asChild variant="whatsapp" size="sm">
            <a href={waGeneral} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
        </div>
      </header>

      <main>
        <section
          onMouseMove={onHeroMove}
          className="relative overflow-hidden bg-hero"
          aria-label="Hero"
        >
          <div className="absolute inset-0 surface-grid opacity-70" aria-hidden="true" />
          <div className="container relative grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
            <div className="space-y-6 animate-fade-in reduce-motion:no-anim">
              <Badge variant="secondary" className="glass">
                Inmobiliaria · Uruguay
              </Badge>
              <h1 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
                Encontrá tu casa o apartamento ideal en Uruguay
              </h1>
              <p className="text-balance text-lg text-muted-foreground">
                Propiedades grandes y pequeñas, con precios simulados y contacto inmediato por WhatsApp.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  Ver propiedades <ArrowDown />
                </Button>
                <Button asChild variant="whatsapp" size="lg">
                  <a href={waGeneral} target="_blank" rel="noreferrer">
                    <MessageCircle /> Contactar
                  </a>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Zonas</p>
                  <p className="mt-1 text-sm font-semibold">Montevideo · Canelones · Maldonado</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Asesoramiento</p>
                  <p className="mt-1 text-sm font-semibold">Búsqueda, visitas y negociación</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">Respuesta</p>
                  <p className="mt-1 text-sm font-semibold">WhatsApp +598 94 493 252</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-hero blur-2xl opacity-70 animate-float reduce-motion:no-anim" aria-hidden="true" />
              <div className="glass relative overflow-hidden rounded-[2rem] shadow-elevated">
                <img
                  src={heroImage}
                  alt="Vista costera y edificios modernos en Uruguay"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section id="zonas" className="container py-14 md:py-18">
          <SectionHeading
            eyebrow="Cobertura"
            title="Zonas con más demanda"
            description="Montevideo, Ciudad de la Costa y Punta del Este: elegí tu estilo de vida y te ayudamos a encontrar la mejor opción."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="glass rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Montevideo</p>
                  <p className="text-sm text-muted-foreground">Pocitos, Cordón, Prado, Buceo</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ideal para vivir cerca de servicios, universidades y la rambla.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
                  <Home className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Canelones</p>
                  <p className="text-sm text-muted-foreground">Ciudad de la Costa, Las Piedras</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Casas con patio, más espacio y buena conexión a Montevideo.</p>
            </div>
            <div className="glass rounded-2xl p-6 shadow-elevated">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
                  <MapPinned className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Maldonado</p>
                  <p className="text-sm text-muted-foreground">Punta del Este y alrededores</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Apartamentos premium, vistas y alto potencial de renta.</p>
            </div>
          </div>
        </section>

        <section id="propiedades" ref={listingsRef} className="border-y bg-card/30 py-14 md:py-18">
          <div className="container">
            <SectionHeading
              eyebrow="Listado"
              title="Casas y apartamentos disponibles (simulación)"
              description="Buscá por ciudad, precio, m² y dormitorios. Ordená por precio y abrí el detalle de cada propiedad."
            />

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={filter === "Todas" ? "highlight" : "secondary"}
                size="sm"
                onClick={() => setFilter("Todas")}
              >
                Todas
              </Button>
              <Button
                variant={filter === "Casas" ? "highlight" : "secondary"}
                size="sm"
                onClick={() => setFilter("Casas")}
              >
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

            <div className="mt-8 glass rounded-3xl p-6 shadow-elevated">
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
                    }}
                  >
                    <X /> Limpiar
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                <p>
                  Resultados: <span className="font-medium text-foreground">{filtered.length}</span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const el = document.getElementById("contacto");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Consultar ahora
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} />
              ))}
            </div>

            <div id="contacto" className="mt-14 glass rounded-3xl p-8 shadow-elevated md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-balance font-display text-2xl font-semibold">¿Querés coordinar una visita?</h3>
                  <p className="mt-3 text-muted-foreground">
                    Escribinos por WhatsApp y te respondemos con opciones similares, ubicación y disponibilidad.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Correo: {CONTACT_EMAIL}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={waGeneral} target="_blank" rel="noreferrer">
                      <MessageCircle /> Hablar por WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`mailto:${CONTACT_EMAIL}`}>Enviar correo</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
    </div>
  );
};

export default Index;
