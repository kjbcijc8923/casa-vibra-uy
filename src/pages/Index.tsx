import { useMemo, useRef, useState } from "react";
import { ArrowDown, Building2, Home, MapPinned, MessageCircle, Sparkles } from "lucide-react";

import heroImage from "@/assets/uy-real-estate-hero.jpg";
import propertyApartmentSmall from "@/assets/property-apartment-small.jpg";
import propertyHouseLuxury from "@/assets/property-house-luxury.jpg";
import propertyHouseFamily from "@/assets/property-house-family.jpg";
import propertyApartmentBeach from "@/assets/property-apartment-beach.jpg";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard, { type Property } from "@/components/PropertyCard";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const Index = () => {
  const whatsappNumberNoPlus = "59894493252";
  const email = "emmanuel5521@gmail.com";

  const [filter, setFilter] = useState<"Todas" | "Casas" | "Apartamentos">("Todas");
  const listingsRef = useRef<HTMLDivElement | null>(null);

  const properties: Property[] = useMemo(
    () => [
      {
        id: "uy-1",
        title: "Casa premium con piscina y barbacoa",
        city: "Canelones",
        neighborhood: "Ciudad de la Costa",
        type: "Casa",
        priceUsd: 495000,
        beds: 4,
        baths: 3,
        areaM2: 320,
        imageSrc: propertyHouseLuxury,
        featured: true,
      },
      {
        id: "uy-2",
        title: "Apartamento luminoso cerca de servicios",
        city: "Montevideo",
        neighborhood: "Tres Cruces",
        type: "Apartamento",
        priceUsd: 128000,
        beds: 2,
        baths: 1,
        areaM2: 58,
        imageSrc: propertyApartmentSmall,
      },
      {
        id: "uy-3",
        title: "Casa familiar con jardín y cochera",
        city: "Montevideo",
        neighborhood: "Prado",
        type: "Casa",
        priceUsd: 219000,
        beds: 3,
        baths: 2,
        areaM2: 140,
        imageSrc: propertyHouseFamily,
      },
      {
        id: "uy-4",
        title: "Apartamento frente al mar con balcón",
        city: "Maldonado",
        neighborhood: "Punta del Este",
        type: "Apartamento",
        priceUsd: 285000,
        beds: 2,
        baths: 2,
        areaM2: 84,
        imageSrc: propertyApartmentBeach,
        featured: true,
      },
      {
        id: "uy-5",
        title: "Casa amplia ideal para inversión",
        city: "Montevideo",
        neighborhood: "Buceo",
        type: "Casa",
        priceUsd: 338000,
        beds: 4,
        baths: 2,
        areaM2: 210,
        imageSrc: propertyHouseLuxury,
      },
      {
        id: "uy-6",
        title: "Apartamento moderno con amenities",
        city: "Montevideo",
        neighborhood: "Pocitos",
        type: "Apartamento",
        priceUsd: 199000,
        beds: 1,
        baths: 1,
        areaM2: 52,
        imageSrc: propertyApartmentBeach,
      },
      {
        id: "uy-7",
        title: "Casa pequeña, cómoda y bien ubicada",
        city: "Canelones",
        neighborhood: "Las Piedras",
        type: "Casa",
        priceUsd: 99000,
        beds: 2,
        baths: 1,
        areaM2: 76,
        imageSrc: propertyHouseFamily,
      },
      {
        id: "uy-8",
        title: "Apartamento ideal primera vivienda",
        city: "Montevideo",
        neighborhood: "Cordón",
        type: "Apartamento",
        priceUsd: 112000,
        beds: 1,
        baths: 1,
        areaM2: 45,
        imageSrc: propertyApartmentSmall,
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    if (filter === "Casas") return properties.filter((p) => p.type === "Casa");
    if (filter === "Apartamentos") return properties.filter((p) => p.type === "Apartamento");
    return properties;
  }, [filter, properties]);

  const waGeneral = buildWhatsAppLink(whatsappNumberNoPlus, "Hola, quiero asesoramiento para comprar una propiedad en Uruguay.");

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
              description="Elegí una categoría y contactanos por WhatsApp por cualquier propiedad."
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

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} whatsappNumberNoPlus={whatsappNumberNoPlus} />
              ))}
            </div>

            <div id="contacto" className="mt-14 glass rounded-3xl p-8 shadow-elevated md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-balance font-display text-2xl font-semibold">¿Querés coordinar una visita?</h3>
                  <p className="mt-3 text-muted-foreground">
                    Escribinos por WhatsApp y te respondemos con opciones similares, ubicación y disponibilidad.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Correo: {email}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={waGeneral} target="_blank" rel="noreferrer">
                      <MessageCircle /> Hablar por WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`mailto:${email}`}>Enviar correo</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter whatsappNumberNoPlus={whatsappNumberNoPlus} email={email} />
    </div>
  );
};

export default Index;
