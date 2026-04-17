import { z } from "zod";

export const PARTNERSHIP_TYPES = [
  "pos-hardware",
  "marketing-channel",
  "strategic-referral",
] as const;

export type PartnershipType = (typeof PARTNERSHIP_TYPES)[number];

export const partnerSchema = z.object({
  companyName: z.string().min(2, "Company name required").max(200),
  contactName: z.string().min(2, "Your name required").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number we can reach").max(30),
  partnershipType: z.enum(PARTNERSHIP_TYPES, {
    message: "Pick a partnership type",
  }),
  website: z
    .string()
    .url("Must be a full URL starting with https://")
    .optional()
    .or(z.literal("")),
  businessDescription: z
    .string()
    .min(30, "Tell us a bit more — 30 characters minimum")
    .max(4000),
  partnerReason: z
    .string()
    .min(30, "Tell us a bit more — 30 characters minimum")
    .max(4000),
});

export type PartnerInput = z.infer<typeof partnerSchema>;
