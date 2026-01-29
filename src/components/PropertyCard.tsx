import { BedDouble, Bath, Ruler, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { formatUSD } from "@/lib/format";

export type Property = {
  id: string;
  title: string;
  city: string;
  neighborhood: string;
  type: "Casa" | "Apartamento";
  priceUsd: number;
  beds: number;
  baths: number;
  areaM2: number;
  imageSrc: string;
  featured?: boolean;
};

type Props = {
  property: Property;
  whatsappNumberNoPlus: string;
};

export default function PropertyCard({ property, whatsappNumberNoPlus }: Props) {
  const wa = buildWhatsAppLink(
    whatsappNumberNoPlus,
    `Hola, me interesa: ${property.title} (${property.neighborhood}, ${property.city}). Precio: ${formatUSD(property.priceUsd)}. ¿Me das más información?`,
  );

  return (
    <Card className="group glass overflow-hidden shadow-elevated transition-transform duration-300 hover:-translate-y-1 reduce-motion:no-anim">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.imageSrc}
          alt={`${property.type} en ${property.neighborhood}, ${property.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] reduce-motion:no-anim"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge variant={property.featured ? "default" : "secondary"}>{property.featured ? "Destacada" : property.type}</Badge>
          <Badge variant="outline" className="glass">
            {property.city}
          </Badge>
        </div>
      </div>

      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{property.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {property.neighborhood}
          </span>
          <span className="font-medium text-foreground">{formatUSD(property.priceUsd)}</span>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-2 rounded-md border bg-background/50 px-3 py-2">
          <BedDouble className="h-4 w-4" />
          <span>{property.beds} dorm.</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-background/50 px-3 py-2">
          <Bath className="h-4 w-4" />
          <span>{property.baths} baños</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-background/50 px-3 py-2">
          <Ruler className="h-4 w-4" />
          <span>{property.areaM2} m²</span>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="whatsapp" className="w-full">
          <a href={wa} target="_blank" rel="noreferrer" aria-label={`Contactar por WhatsApp sobre ${property.title}`}>
            <MessageCircle />
            WhatsApp
            <ArrowUpRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
