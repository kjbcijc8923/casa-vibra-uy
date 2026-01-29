import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL, PROPERTIES, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";
import promotorImage from "@/assets/promotor.png";

export default function ContactPage() {
  const wa = buildWhatsAppLink(
    WHATSAPP_NUMBER_NO_PLUS,
    "Hola Emmanuel, quiero asesoramiento para comprar una propiedad en Uruguay. ¿Podemos coordinar una llamada o visita?",
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
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-3xl font-semibold">Emmanuel Castro</h1>
                    <Badge variant="secondary" className="glass">
                      Promotor
                    </Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Cubano, 21 años. Radicado en Uruguay desde hace 2 años. Acompaño procesos de compra/alquiler con foco en
                    claridad, seguridad y negociación.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cuento con certificaciones/formación en el rubro (consultame por detalle).
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

            <Card className="glass rounded-3xl p-7 shadow-elevated border-border-strong/30">
              <h2 className="font-display text-xl font-semibold">Cómo trabajo</h2>
              <div className="mt-4 grid gap-3">
                <div className="glass rounded-2xl border border-border-strong/30 p-4">
                  <p className="font-semibold">1) Entendemos tu objetivo</p>
                  <p className="mt-1 text-sm text-muted-foreground">Zona, presupuesto, tiempos, estilo de vida y prioridades.</p>
                </div>
                <div className="glass rounded-2xl border border-border-strong/30 p-4">
                  <p className="font-semibold">2) Selección y visitas</p>
                  <p className="mt-1 text-sm text-muted-foreground">Propongo opciones comparables y coordinamos recorridos.</p>
                </div>
                <div className="glass rounded-2xl border border-border-strong/30 p-4">
                  <p className="font-semibold">3) Negociación y cierre</p>
                  <p className="mt-1 text-sm text-muted-foreground">Acompaño la negociación y la revisión del proceso.</p>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <Card className="glass rounded-3xl p-7 shadow-elevated border-border-strong/30">
              <h2 className="font-display text-xl font-semibold">Qué enviarme por WhatsApp</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Con esta info puedo responderte más rápido y con opciones acertadas.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
                  Zona/barrio y si tenés preferencia por cercanías (rambla, colegios, transporte).
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
                  Presupuesto aproximado y moneda.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
                  Dormitorios/baños y m² estimados.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden="true" />
                  Fecha ideal para visita y tu disponibilidad.
                </li>
              </ul>
            </Card>

            <Card className="glass rounded-3xl p-7 shadow-elevated border-border-strong/30">
              <h2 className="font-display text-xl font-semibold">Preguntas frecuentes</h2>
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="item-1" className="border-border-strong/20">
                  <AccordionTrigger>¿Cuánto demoran en responder?</AccordionTrigger>
                  <AccordionContent>
                    Respondo lo antes posible; si me enviás zona + presupuesto + requisitos, puedo sugerirte opciones más rápido.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-border-strong/20">
                  <AccordionTrigger>¿Coordinás visitas presenciales?</AccordionTrigger>
                  <AccordionContent>
                    Sí. Coordinamos horarios, ubicaciones y una lista de propiedades comparables para aprovechar la visita.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-border-strong/20">
                  <AccordionTrigger>¿Podés ayudarme a negociar?</AccordionTrigger>
                  <AccordionContent>
                    Sí. Te acompaño con criterios de comparación, puntos a revisar y estrategia de negociación.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-border-strong/20">
                  <AccordionTrigger>¿Trabajás Montevideo / Canelones / Maldonado?</AccordionTrigger>
                  <AccordionContent>
                    Sí. Contame la zona específica y tu objetivo (vivir/inversión) para afinar la selección.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

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
