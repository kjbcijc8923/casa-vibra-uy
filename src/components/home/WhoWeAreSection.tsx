import { BadgeCheck, Handshake, Shield } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";

type WhoWeAreSectionProps = {
  id?: string;
};

export default function WhoWeAreSection({ id = "quienes-somos" }: WhoWeAreSectionProps) {
  return (
    <section id={id} className="container py-14 md:py-18" aria-label="Quiénes somos" data-reveal>
      <SectionHeading
        eyebrow="Uruguay Living"
        title="Quiénes somos"
        description="Acompañamos todo el proceso: búsqueda, visitas y negociación, con foco en claridad, seguridad y buen criterio inmobiliario."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-6 shadow-elevated">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
              <Handshake className="h-5 w-5" />
            </span>
            <p className="font-semibold">Acompañamiento real</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Te guiamos de principio a fin: filtramos opciones, coordinamos visitas y ayudamos a negociar.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 shadow-elevated">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
              <Shield className="h-5 w-5" />
            </span>
            <p className="font-semibold">Proceso seguro</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Priorizamos documentación clara, condiciones transparentes y decisiones informadas.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 shadow-elevated">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-hero shadow-glow">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <p className="font-semibold">Selección curada</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Propiedades elegidas por ubicación, potencial y relación precio–valor para tu objetivo.
          </p>
        </div>
      </div>
    </section>
  );
}
