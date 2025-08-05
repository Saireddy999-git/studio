'use server';

/**
 * @fileOverview A flow for handling table reservation requests.
 *
 * - handleTableReservation - A function that takes table reservation details and sends an email.
 * - TableReservationInput - The input type for the handleTableReservation function.
 * - TableReservationOutput - The return type for the handleTableReservation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';
import { ReservationEmail } from '@/components/emails/reservation-email';

const TableReservationInputSchema = z.object({
  name: z.string().describe('The name of the person making the reservation.'),
  email: z.string().email().describe('The email of the person making the reservation.'),
  guests: z.number().describe('The number of guests for the reservation.'),
  date: z.string().describe('The date of the reservation (e.g., "August 24, 2024").'),
  time: z.string().describe('The time of the reservation (e.g., "7:00 PM").'),
  tableId: z.string().describe('The ID of the table being reserved (e.g., "T5").'),
});
export type TableReservationInput = z.infer<typeof TableReservationInputSchema>;

const TableReservationOutputSchema = z.object({
  confirmation: z.string().describe('A confirmation message to the user.'),
});
export type TableReservationOutput = z.infer<typeof TableReservationOutputSchema>;


const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleTableReservation(
  input: TableReservationInput
): Promise<TableReservationOutput> {
  return tableReservationFlow(input);
}

const tableReservationFlow = ai.defineFlow(
  {
    name: 'tableReservationFlow',
    inputSchema: TableReservationInputSchema,
    outputSchema: TableReservationOutputSchema,
  },
  async (input) => {
    const message = `Reservation for ${input.guests} guest(s) on ${input.date} at ${input.time}. Table: ${input.tableId}.`;
    
    try {
      await resend.emails.send({
        from: 'Mudu Kalalu <onboarding@resend.dev>',
        to: ['saichandrareddy@gmail.com'],
        subject: `New Table Reservation: ${input.tableId} for ${input.name}`,
        react: ReservationEmail({
            name: input.name,
            email: input.email,
            message: message,
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
