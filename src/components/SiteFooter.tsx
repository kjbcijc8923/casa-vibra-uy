import { Mail } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import WhatsAppLogo from "@/components/WhatsAppLogo";

type Props = {
  whatsappNumberNoPlus: string;
  email: string;
};

const SiteFooter = React.forwardRef<HTMLElement, Props>(({ whatsappNumberNoPlus, email }, ref) => {
  const year = new Date().getFullYear();
  const wa = buildWhatsAppLink(whatsappNumberNoPlus, "Hola, quiero más información sobre propiedades en Uruguay.");

  return (
    <footer ref={ref} className="border-t bg-card/40">
      <div className="container py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-md">
            <p className="font-display text-lg font-semibold">Uruguay Living</p>
            <p className="text-sm text-muted-foreground">
              Asesoramiento personalizado para comprar o alquilar casas y apartamentos en Uruguay.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Contactar ahora</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild variant="whatsapp" size="sm" className="justify-start">
                <a href={wa} target="_blank" rel="noreferrer">
                  <WhatsAppLogo /> WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start">
                <a href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Uruguay Living. Sitio demo de propiedades en Uruguay.</p>
          <p>Mapa · Propiedades · Contacto</p>
        </div>
      </div>
    </footer>
  );
});
SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
