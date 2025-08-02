"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    // Convert Zod errors to serializable format
    return { error: "Validation failed. Please check your input." };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: `navpil.dev <contact@navpil.dev>`,
      to: "abhi@navpil.dev",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      // react: ContactFormEmail({ name, email, message }),
    });

    if (!data || error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email!");
    }

    return { success: true };
  } catch (error) {
    // Convert error to a serializable format
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Send email error:', errorMessage);
    return { error: errorMessage };
  }
}
