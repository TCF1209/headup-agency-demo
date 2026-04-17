import { z } from "zod";

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a phone number we can reach").max(30),
  position: z.string().min(1),
  linkedin: z
    .string()
    .url("Must be a full URL, e.g. https://linkedin.com/in/...")
    .optional()
    .or(z.literal("")),
  message: z.string().min(30, "Tell us a bit more — 30 characters minimum").max(4000),
  resume: z
    .instanceof(File, { message: "Please attach your resume" })
    .refine((f) => f.size <= MAX_RESUME_SIZE_BYTES, "Max file size is 5 MB")
    .refine(
      (f) => ACCEPTED_RESUME_TYPES.includes(f.type),
      "PDF, DOC, or DOCX only"
    ),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
