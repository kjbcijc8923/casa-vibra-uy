export function buildWhatsAppLink(phoneE164NoPlus: string, message: string) {
  const base = `https://wa.me/${phoneE164NoPlus}`;
  const text = encodeURIComponent(message);
  return `${base}?text=${text}`;
}
