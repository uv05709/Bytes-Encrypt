"use server";

import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean; message: string }> {
  const parsed = contactFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
    };
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In production, this would send an email or store in a database.
  // For this frontend replication, we simulate a successful submission.
  console.log("Contact form submission:", parsed.data);

  return {
    success: true,
    message: "Your request has been sent. Our team will get back to you shortly.",
  };
}
