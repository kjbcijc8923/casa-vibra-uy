import { Mail, MessageCircle } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type Props = {
  whatsappNumberNoPlus: string;
  email: string;
};

const SiteFooter = React.forwardRef<HTMLElement, Props>(({ whatsappNumberNoPlus, email }, ref) => {
  const year = new Date().getFullYear();
  const wa = buildWhatsAppLink(whatsappNumberNoPlus, "Hola, quiero más información sobre propiedades en Uruguay.");

  return (
    <footer ref={ref} className="border-t bg-card/40">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <p className="font-display text-lg font-semibold">MonteUruguay</p>
            <p className="text-sm text-muted-foreground">
              Venta y alquiler de casas y apartamentos en Uruguay. Propiedades simuladas para demostración.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Contacto</p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="whatsapp" size="sm" className="justify-start">
                <a href={wa} target="_blank" rel="noreferrer">
                  <MessageCircle /> WhatsApp: +598 94 493 252
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start">
                <a href={`mailto:${email}`}>
                  <Mail /> {email}
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Términos y condiciones (demo)</li>
              <li>Política de privacidad (demo)</li>
              <li>Aviso de cookies (demo)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Horarios</p>
            <p className="text-sm text-muted-foreground">Lun–Vie: 09:00–18:00 · Sáb: 10:00–13:00</p>
            <p className="text-sm text-muted-foreground">Atención por WhatsApp 24/7.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} MonteUruguay. Todos los derechos reservados.</p>
          <p>Diseño y desarrollo: Lovable · Demo inmobiliaria</p>
        </div>
      </div>
    </footer>
  );
});
SiteFooter.displayName = "SiteFooter";

export default SiteFooter;
