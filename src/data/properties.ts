import heroImage from "@/assets/uy-real-estate-hero.jpg";
import propertyApartmentSmall from "@/assets/property-apartment-small.jpg";
import propertyHouseLuxury from "@/assets/property-house-luxury.jpg";
import propertyHouseFamily from "@/assets/property-house-family.jpg";
import propertyApartmentBeach from "@/assets/property-apartment-beach.jpg";

export type PropertyType = "Casa" | "Apartamento";

export type Property = {
  id: string;
  title: string;
  city: string;
  neighborhood: string;
  type: PropertyType;
  priceUsd: number;
  beds: number;
  baths: number;
  areaM2: number;
  featured?: boolean;
  images: string[];
  mapQuery: string;
  description: string;
};

export const WHATSAPP_NUMBER_NO_PLUS = "59894493252";
export const CONTACT_EMAIL = "emmanuel5521@gmail.com";

export const PROPERTIES: Property[] = [
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
    featured: true,
    images: [propertyHouseLuxury, heroImage, propertyHouseFamily],
    mapQuery: "Ciudad de la Costa, Canelones, Uruguay",
    description:
      "Casa amplia con excelente luminosidad, piscina y parrillero. Ideal para familia, con jardín y espacios generosos para disfrutar todo el año.",
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
    images: [propertyApartmentSmall, heroImage, propertyApartmentBeach],
    mapQuery: "Tres Cruces, Montevideo, Uruguay",
    description:
      "Apartamento cómodo y práctico, cercano a centros de estudio, transporte y comercios. Excelente opción como primera vivienda o inversión.",
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
    images: [propertyHouseFamily, propertyHouseLuxury, heroImage],
    mapQuery: "Prado, Montevideo, Uruguay",
    description:
      "Casa con jardín arbolado y cochera. Barrio tranquilo, espacios funcionales y un entorno ideal para vivir con comodidad.",
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
    featured: true,
    images: [propertyApartmentBeach, heroImage, propertyApartmentSmall],
    mapQuery: "Punta del Este, Maldonado, Uruguay",
    description:
      "Apartamento premium con balcón y excelente orientación. Ideal para disfrutar la costa y con gran potencial de renta.",
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
    images: [propertyHouseLuxury, propertyHouseFamily, heroImage],
    mapQuery: "Buceo, Montevideo, Uruguay",
    description:
      "Casa con ambientes amplios y posibilidades de reforma. Ubicación estratégica con buena conexión y demanda sostenida.",
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
    images: [propertyApartmentBeach, propertyApartmentSmall, heroImage],
    mapQuery: "Pocitos, Montevideo, Uruguay",
    description:
      "Apartamento moderno y eficiente. Excelente ubicación, ideal para vivir o alquilar con alta rotación.",
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
    images: [propertyHouseFamily, propertyApartmentSmall, heroImage],
    mapQuery: "Las Piedras, Canelones, Uruguay",
    description:
      "Casa práctica con distribución funcional. Buena oportunidad para quienes buscan algo accesible sin renunciar a comodidad.",
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
    images: [propertyApartmentSmall, heroImage, propertyApartmentBeach],
    mapQuery: "Cordón, Montevideo, Uruguay",
    description:
      "Apartamento compacto y bien ubicado. Cerca de universidades y servicios, ideal para iniciar o invertir.",
  },
];
