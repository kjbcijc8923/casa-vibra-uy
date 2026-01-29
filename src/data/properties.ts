import heroImage from "@/assets/uy-real-estate-hero.jpg";

// Demo (IA) – imágenes realistas para simular inventario mientras se cargan propiedades reales.
import house01 from "@/assets/demo-houses/house-01.jpg";
import house02 from "@/assets/demo-houses/house-02.jpg";
import house03 from "@/assets/demo-houses/house-03.jpg";
import house04 from "@/assets/demo-houses/house-04.jpg";
import house05 from "@/assets/demo-houses/house-05.jpg";
import house06 from "@/assets/demo-houses/house-06.jpg";
import house07 from "@/assets/demo-houses/house-07.jpg";
import house08 from "@/assets/demo-houses/house-08.jpg";
import house09 from "@/assets/demo-houses/house-09.jpg";
import house10 from "@/assets/demo-houses/house-10.jpg";

import apt01 from "@/assets/demo-houses/apartment-01.jpg";
import apt02 from "@/assets/demo-houses/apartment-02.jpg";
import apt03 from "@/assets/demo-houses/apartment-03.jpg";
import apt04 from "@/assets/demo-houses/apartment-04.jpg";
import apt05 from "@/assets/demo-houses/apartment-05.jpg";
import apt06 from "@/assets/demo-houses/apartment-06.jpg";
import apt07 from "@/assets/demo-houses/apartment-07.jpg";
import apt08 from "@/assets/demo-houses/apartment-08.jpg";
import apt09 from "@/assets/demo-houses/apartment-09.jpg";
import apt10 from "@/assets/demo-houses/apartment-10.jpg";

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
    title: "Casa premium con piscina y parrillero",
    city: "Canelones",
    neighborhood: "Ciudad de la Costa",
    type: "Casa",
    priceUsd: 495000,
    beds: 4,
    baths: 3,
    areaM2: 320,
    featured: true,
    images: [house04, house01, heroImage],
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
    images: [apt01, apt07, heroImage],
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
    images: [house05, house08, heroImage],
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
    images: [apt02, apt09, heroImage],
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
    images: [house01, house06, heroImage],
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
    images: [apt04, apt08, heroImage],
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
    images: [house03, house07, heroImage],
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
    images: [apt03, apt06, heroImage],
    mapQuery: "Cordón, Montevideo, Uruguay",
    description:
      "Apartamento compacto y bien ubicado. Cerca de universidades y servicios, ideal para iniciar o invertir.",
  },
  {
    id: "uy-9",
    title: "Casa moderna en Carrasco con jardín",
    city: "Montevideo",
    neighborhood: "Carrasco",
    type: "Casa",
    priceUsd: 690000,
    beds: 4,
    baths: 4,
    areaM2: 280,
    featured: true,
    images: [house06, house01, heroImage],
    mapQuery: "Carrasco, Montevideo, Uruguay",
    description: "Casa moderna de alto estándar, ambientes amplios y excelente iluminación. Ideal para familia y vida de barrio.",
  },
  {
    id: "uy-10",
    title: "Apartamento en Punta Carretas con balcón",
    city: "Montevideo",
    neighborhood: "Punta Carretas",
    type: "Apartamento",
    priceUsd: 245000,
    beds: 2,
    baths: 2,
    areaM2: 78,
    images: [apt06, apt04, heroImage],
    mapQuery: "Punta Carretas, Montevideo, Uruguay",
    description: "Excelente ubicación, cerca de la rambla y servicios. Balcón y buena orientación para luz natural.",
  },
  {
    id: "uy-11",
    title: "Casa con parrillero en Atlántida",
    city: "Canelones",
    neighborhood: "Atlántida",
    type: "Casa",
    priceUsd: 175000,
    beds: 3,
    baths: 2,
    areaM2: 110,
    images: [house07, house03, heroImage],
    mapQuery: "Atlántida, Canelones, Uruguay",
    description: "Casa cómoda con patio y parrillero. Ideal para descanso o vivienda permanente cerca de la costa.",
  },
  {
    id: "uy-12",
    title: "Apartamento interior luminoso (Montevideo)",
    city: "Montevideo",
    neighborhood: "Centro",
    type: "Apartamento",
    priceUsd: 139000,
    beds: 1,
    baths: 1,
    areaM2: 49,
    images: [apt07, apt03, heroImage],
    mapQuery: "Centro, Montevideo, Uruguay",
    description: "Ambiente moderno y luminoso, ideal para primera vivienda o inversión. Excelente conectividad.",
  },
  {
    id: "uy-13",
    title: "Casa residencial con árboles y frente amplio",
    city: "Montevideo",
    neighborhood: "La Blanqueada",
    type: "Casa",
    priceUsd: 265000,
    beds: 3,
    baths: 2,
    areaM2: 135,
    images: [house08, house05, heroImage],
    mapQuery: "La Blanqueada, Montevideo, Uruguay",
    description: "Barrio tranquilo con buena conexión. Casa funcional, buena distribución y potencial de mejora.",
  },
  {
    id: "uy-14",
    title: "Edificio moderno (apartamento) en Montevideo",
    city: "Montevideo",
    neighborhood: "Pocitos",
    type: "Apartamento",
    priceUsd: 189000,
    beds: 1,
    baths: 1,
    areaM2: 50,
    images: [apt08, apt04, heroImage],
    mapQuery: "Pocitos, Montevideo, Uruguay",
    description: "Apartamento moderno con terminaciones actuales y ubicación premium. Ideal para vivir o alquilar.",
  },
  {
    id: "uy-15",
    title: "Casa de playa con terraza",
    city: "Maldonado",
    neighborhood: "Punta del Este",
    type: "Casa",
    priceUsd: 540000,
    beds: 3,
    baths: 3,
    areaM2: 190,
    images: [house09, house04, heroImage],
    mapQuery: "Punta del Este, Maldonado, Uruguay",
    description: "Casa de playa con excelente orientación y espacios exteriores. Ideal para disfrutar temporada y renta.",
  },
  {
    id: "uy-16",
    title: "Apartamento con vista a la rambla",
    city: "Montevideo",
    neighborhood: "Pocitos",
    type: "Apartamento",
    priceUsd: 315000,
    beds: 2,
    baths: 2,
    areaM2: 92,
    featured: true,
    images: [apt09, apt02, heroImage],
    mapQuery: "Rambla de Pocitos, Montevideo, Uruguay",
    description: "Vista abierta, balcón y excelente luminosidad. Ubicación privilegiada cerca de la rambla.",
  },
  {
    id: "uy-17",
    title: "Casa estilo colonial con detalles clásicos",
    city: "Montevideo",
    neighborhood: "Parque Rodó",
    type: "Casa",
    priceUsd: 420000,
    beds: 4,
    baths: 3,
    areaM2: 220,
    images: [house10, house05, heroImage],
    mapQuery: "Parque Rodó, Montevideo, Uruguay",
    description: "Estilo clásico, espacios generosos y excelente ubicación. Ideal para familia o proyecto residencial.",
  },
  {
    id: "uy-18",
    title: "Loft moderno con doble altura",
    city: "Montevideo",
    neighborhood: "Cordón",
    type: "Apartamento",
    priceUsd: 155000,
    beds: 1,
    baths: 1,
    areaM2: 56,
    images: [apt10, apt07, heroImage],
    mapQuery: "Cordón, Montevideo, Uruguay",
    description: "Loft moderno, excelente entrada de luz y estilo contemporáneo. Perfecto para vivir cerca de todo.",
  },
  {
    id: "uy-19",
    title: "Casa luminosa con jardín y cochera",
    city: "Montevideo",
    neighborhood: "Malvín",
    type: "Casa",
    priceUsd: 310000,
    beds: 3,
    baths: 2,
    areaM2: 160,
    images: [house02, house01, heroImage],
    mapQuery: "Malvín, Montevideo, Uruguay",
    description: "Casa luminosa con jardín y cochera. Barrio residencial, cerca de servicios y rambla.",
  },
  {
    id: "uy-20",
    title: "Apartamento urbano con balcones",
    city: "Montevideo",
    neighborhood: "Buceo",
    type: "Apartamento",
    priceUsd: 172000,
    beds: 2,
    baths: 1,
    areaM2: 64,
    images: [apt05, apt01, heroImage],
    mapQuery: "Buceo, Montevideo, Uruguay",
    description: "Apartamento funcional y bien ubicado. Ideal para vivir cerca de centros comerciales y costa.",
  },
];
