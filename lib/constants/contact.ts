const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "60123456789";

export const contact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@headupagency.com",
  whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber}`,
} as const;
