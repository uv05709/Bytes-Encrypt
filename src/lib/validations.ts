import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  org: z.string().optional(),
  email: z
    .string()
    .min(1, "Work email is required")
    .email("Please enter a valid email address"),
  scope: z
    .string()
    .min(1, "Please describe what should be scoped")
    .min(10, "Please provide a bit more detail about the scope"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
