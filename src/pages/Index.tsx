import { ArrowDown, Building2, Home, MapPinned, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import heroImage from "@/assets/uy-real-estate-hero.jpg";
import promotorImage from "@/assets/promotor.png";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SectionHeading from "@/components/SectionHeading";
import SiteFooter from "@/components/SiteFooter";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL, WHATSAPP_NUMBER_NO_PLUS } from "@/data/properties";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";

const Index = () => {
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
            <span className="font-display text-lg font-semibold">Uruguay Living</span>
          </a>
          <nav className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/propiedades">Propiedades</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <a href="#zonas">Zonas</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/mapa">Mapa</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hover-scale">
              <Link to="/contacto">Contacto</Link>
            </Button>
          </nav>
          <Button asChild variant="whatsapp" size="sm">
            <a href={waGeneral} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp">
              <WhatsAppLogo /> WhatsApp
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
                Uruguay Living · Inmobiliaria
              </Badge>

               <Dialog>
                 <div className="glass rounded-2xl p-4 shadow-elevated border-border-strong/30">
                   <div className="flex items-center gap-4">
                     <DialogTrigger asChild>
                       <button
                         type="button"
                         className="shrink-0 rounded-2xl ring-1 ring-border/40 transition-transform hover:-translate-y-0.5 reduce-motion:no-anim"
                         aria-label="Abrir foto del promotor"
                       >
                         <img
                           src={promotorImage}
                           alt="Foto del promotor de Uruguay Living"
                           className="h-20 w-20 rounded-2xl object-cover"
                           loading="eager"
                           decoding="async"
                         />
                       </button>
                     </DialogTrigger>
                     <div className="min-w-0">
                       <p className="font-semibold leading-tight">Promotor</p>
                       <p className="mt-1 text-sm text-muted-foreground">
                         Te acompaño en la búsqueda, visitas y negociación para encontrar la mejor opción.
                       </p>
                       <div className="mt-3">
                         <DialogTrigger asChild>
                           <Button variant="secondary" size="sm">
                             Abrir foto
                           </Button>
                         </DialogTrigger>
                       </div>
                     </div>
                   </div>
                 </div>

                 <DialogContent className="max-w-3xl">
                   <div className="grid gap-4">
                     <p className="font-semibold">Foto del promotor</p>
                     <img
                       src={promotorImage}
                       alt="Foto del promotor de Uruguay Living"
                       className="w-full rounded-2xl object-contain"
                       loading="eager"
                       decoding="async"
                     />
                   </div>
                 </DialogContent>
               </Dialog>
              <h1 className="text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
                Encontrá tu casa o apartamento ideal en Uruguay
              </h1>
              <p className="text-balance text-lg text-muted-foreground">
                Propiedades seleccionadas, asesoramiento profesional y contacto inmediato por WhatsApp.
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                <Button asChild variant="hero" size="lg" className="w-full">
                  <a href="#zonas">
                    Explorar zonas <ArrowDown />
                  </a>
                </Button>
                <Button asChild variant="highlight" size="lg" className="w-full">
                  <Link to="/propiedades">Ser propietario seguro</Link>
                </Button>
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a href={waGeneral} target="_blank" rel="noreferrer">
                    <WhatsAppLogo /> WhatsApp
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

        <WhoWeAreSection />

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

        <section id="contacto" className="border-y bg-card/30 py-14 md:py-18">
          <div className="container">
            <div className="glass rounded-3xl p-8 shadow-elevated md:p-10">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="text-balance font-display text-3xl font-semibold">Coordinemos tu visita</h2>
                  <p className="mt-3 text-muted-foreground">
                    Escribinos por WhatsApp y te respondemos con disponibilidad, ubicación y alternativas comparables según tu presupuesto.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">Correo: {CONTACT_EMAIL}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={waGeneral} target="_blank" rel="noreferrer">
                      <WhatsAppLogo /> Hablar por WhatsApp
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
