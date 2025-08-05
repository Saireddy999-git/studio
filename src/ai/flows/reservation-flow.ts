'use server';

/**
 * @fileOverview A flow for handling reservation requests.
 *
 * - handleReservation - A function that takes reservation details and sends an email.
 * - ReservationInput - The input type for the handleReservation function.
 * - ReservationOutput - The return type for the handleReservation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';
import { ReservationEmail } from '@/components/emails/reservation-email';

const ReservationInputSchema = z.object({
  name: z.string().describe('The name of the person making the reservation.'),
  email: z.string().email().describe('The email of the person making the reservation.'),
  message: z.string().describe('The reservation message, including details like date, time, and number of guests.'),
});
export type ReservationInput = z.infer<typeof ReservationInputSchema>;

const ReservationOutputSchema = z.object({
  confirmation: z.string().describe('A confirmation message to the user.'),
});
export type ReservationOutput = z.infer<typeof ReservationOutputSchema>;


const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleReservation(
  input: ReservationInput
): Promise<ReservationOutput> {
  return reservationFlow(input);
}

const reservationFlow = ai.defineFlow(
  {
    name: 'reservationFlow',
    inputSchema: ReservationInputSchema,
    outputSchema: ReservationOutputSchema,
  },
  async (input) => {
    try {
      await resend.emails.send({
        from: 'Mudu Kalalu <onboarding@resend.dev>',
        to: ['saichandrareddy@gmail.com'],
        subject: `New Reservation Request from ${input.name}`,
        react: ReservationEmail({
            name: input.name,
            email: input.email,
            message: input.message,
        })
      });
      return {
        confirmation:
          "Thank you for your request! We've received it and will confirm your reservation shortly.",
      };
    } catch(e) {
        console.error("Error sending email", e);
        throw new Error("Failed to send reservation email.");
    }

  }
);