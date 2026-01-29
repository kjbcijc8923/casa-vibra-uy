import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Bath, BedDouble, MapPin, MessageCircle, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SiteFooter from "@/components/SiteFooter";
import { formatPriceDual } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";
import { useUsdUyuRate } from "@/hooks/use-usd-uyu-rate";

export default function PropertyDetails() {
  const { id } = useParams();
  const { rate, source } = useUsdUyuRate();

  const property = useMemo(() => PROPERTIES.find((p) => p.id === id), [id]);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-14">
          <div className="glass rounded-3xl p-10 shadow-elevated">
            <h1 className="font-display text-3xl font-semibold">Propiedad no encontrada</h1>
            <p className="mt-3 text-muted-foreground">La propiedad que buscás no existe (demo).</p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/">
                  <ArrowLeft /> Volver al inicio
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
      </div>
    );
  }

  const price = formatPriceDual(property.priceUsd, rate);

  const wa = buildWhatsAppLink(
    WHATSAPP_NUMBER_NO_PLUS,
    `Hola, me interesa: ${property.title} (${property.neighborhood}, ${property.city}). Precio: ${price.uyu} (${price.usd}). ¿Podemos coordinar una visita?`,
  );

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`;
  const activeImage = property.images[Math.min(activeIdx, property.images.length - 1)] ?? property.images[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/55">
        <div className="container flex h-16 items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link to="/">
              <ArrowLeft /> Volver
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="glass">
              {property.type}
            </Badge>
            {property.featured ? <Badge>Destacada</Badge> : null}
          </div>
          <Button asChild variant="whatsapp" size="sm">
            <a href={wa} target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </header>

      <main className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <section className="space-y-4">
            <Card className="glass overflow-hidden rounded-3xl shadow-elevated">
              <div className="relative aspect-[4/3]">
                <img
                  src={activeImage}
                  alt={`${property.title} - imagen principal`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              {property.images.slice(0, 6).map((src, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={`${property.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`glass overflow-hidden rounded-2xl border transition-transform duration-200 hover:-translate-y-0.5 reduce-motion:no-anim ${
                      isActive ? "shadow-glow" : ""
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <img src={src} alt={`${property.title} - miniatura ${idx + 1}`} className="h-24 w-full object-cover" loading="lazy" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-balance font-display text-3xl font-semibold md:text-4xl">{property.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {property.neighborhood}, {property.city}
                </span>
                <span className="font-medium text-foreground">{price.uyu}</span>
                <span className="text-xs text-muted-foreground">({price.usd})</span>
                <Badge variant="outline" className="glass">
                  Tasa: 1 USD ≈ {Math.round(rate * 100) / 100} UYU ({source})
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4" /> {property.beds} dorm.
                </div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4" /> {property.baths} baños
                </div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4" /> {property.areaM2} m²
                </div>
              </div>
            </div>

            <Card className="glass rounded-3xl p-6 shadow-elevated border-border-strong/30">
              <h2 className="font-display text-xl font-semibold">Descripción</h2>
              <p className="mt-3 text-muted-foreground">{property.description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={wa} target="_blank" rel="noreferrer">
                    <MessageCircle /> Consultar por WhatsApp
                    <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={`mailto:${CONTACT_EMAIL}`}>Enviar correo</a>
                </Button>
              </div>
            </Card>

            <Card className="glass overflow-hidden rounded-3xl shadow-elevated border-border-strong/30">
              <div className="flex items-center justify-between gap-3 border-b px-6 py-4">
                <h2 className="font-display text-xl font-semibold">Mapa</h2>
                <Badge variant="outline" className="glass">
                  {property.city}
                </Badge>
              </div>
              <div className="aspect-[16/9]">
                <iframe
                  title={`Mapa de ${property.neighborhood}`}
                  src={mapSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </section>
        </div>
      </main>

      <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
    </div>
  );
}
