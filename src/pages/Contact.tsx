import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";
import promotorImage from "@/assets/promotor.png";

export default function ContactPage() {
  const wa = buildWhatsAppLink(
    WHATSAPP_NUMBER_NO_PLUS,
    "Hola, quiero asesoramiento para comprar una propiedad en Uruguay. ¿Podemos coordinar una llamada o visita?",
  );

  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);

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
              Contacto
            </Badge>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/propiedades">Propiedades</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/mapa">Mapa</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <section className="space-y-4">
            <Card className="glass rounded-3xl p-7 shadow-elevated border-border-strong/30">
                <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[1.75rem] bg-hero blur-2xl opacity-70" aria-hidden="true" />
                  <img
                    src={promotorImage}
                    alt="Foto del promotor de Uruguay Living"
                    className="relative h-32 w-32 rounded-[1.75rem] object-cover ring-1 ring-border/50"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-semibold">Hablemos</h1>
                  <p className="mt-2 text-muted-foreground">
                    Te acompaño en la búsqueda, visitas y negociación. Contame qué zona y presupuesto tenés en mente.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={wa} target="_blank" rel="noreferrer">
                    <WhatsAppLogo /> WhatsApp <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
                </Button>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <Card className="glass rounded-3xl p-7 shadow-elevated border-border-strong/30">
              <h2 className="font-display text-xl font-semibold">Propiedades (simulación)</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mientras cargamos propiedades reales, estos son ejemplos con fotos y precios.
              </p>
              <div className="mt-5 grid gap-3">
                {featured.map((p) => (
                  <Link
                    key={p.id}
                    to={`/propiedad/${p.id}`}
                    className="glass rounded-2xl border border-border-strong/30 p-4 shadow-elevated transition-all duration-200 hover:-translate-y-0.5 reduce-motion:no-anim"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={p.images[0]}
                        alt={`Foto de ${p.title}`}
                        className="h-16 w-20 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{p.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground truncate">
                          {p.neighborhood}, {p.city} · {p.priceUsd.toLocaleString("es-UY")} USD
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/propiedades">Ver todas</Link>
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </main>

      <SiteFooter whatsappNumberNoPlus={WHATSAPP_NUMBER_NO_PLUS} email={CONTACT_EMAIL} />
    </div>
  );
}
