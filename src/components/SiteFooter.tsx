import { Mail } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppLogo from "@/components/WhatsAppLogo";

type Props = {
  whatsappNumberNoPlus: string;
  email: string;
  showWhatsApp?: boolean;
};

const SiteFooter = React.forwardRef<HTMLElement, Props>(({ whatsappNumberNoPlus, email, showWhatsApp = true }, ref) => {
  const year = new Date().getFullYear();
  const wa = buildWhatsAppLink(whatsappNumberNoPlus, "Hola, quiero más información sobre propiedades en Uruguay.");

  return (
    <footer ref={ref} className="border-t bg-background">
      <div className="container py-10">
        <div className="glass rounded-3xl p-7 shadow-elevated md:p-9">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="space-y-3">
              <p className="font-display text-xl font-semibold">Uruguay Living</p>
              <p className="text-sm text-muted-foreground">
                Asesoramiento profesional para comprar o alquilar casas y apartamentos en Uruguay.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="ghost" size="sm" className="hover-scale">
                  <Link to="/">Home</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="hover-scale">
                  <Link to="/propiedades">Propiedades</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="hover-scale">
                  <Link to="/mapa">Mapa</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="hover-scale">
                  <Link to="/contacto">Contacto</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3 md:justify-self-end md:text-right">
              <p className="text-sm font-semibold">Contacto directo</p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
                {showWhatsApp ? (
                  <Button asChild variant="whatsapp" size="sm" className="w-full justify-center">
                    <a href={wa} target="_blank" rel="noreferrer">
                      <WhatsAppLogo /> WhatsApp
                    </a>
                  </Button>
                ) : null}
                <Button asChild variant="outline" size="sm" className="w-full justify-center">
                  <a href={`mailto:${email}`}>
                    <Mail /> {email}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-border-strong/20 pt-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {year} Uruguay Living.</p>
            <p className="text-muted-foreground">Desarrollado por Medellin Pty</p>
          </div>
        </div>
      </div>
    </footer>
  );
});
SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
