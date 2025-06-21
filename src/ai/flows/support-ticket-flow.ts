'use server';
/**
 * @fileOverview An AI flow for creating support tickets.
 * - createSupportTicket - Creates a support ticket.
 * - SupportTicketInput - Input schema for creating a support ticket.
 * - SupportTicketOutput - Output schema for creating a support ticket.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportTicketInputSchema = z.object({
  subject: z.string().describe('The subject of the support ticket.'),
  message: z.string().describe('The detailed message of the support ticket.'),
});
export type SupportTicketInput = z.infer<typeof SupportTicketInputSchema>;

const SupportTicketOutputSchema = z.object({
  ticketId: z.string().describe('A unique identifier for the created ticket, in the format TICKET-XXXXX.'),
  response: z.string().describe('A friendly and helpful response to the user, confirming receipt and providing the ticket ID.'),
});
export type SupportTicketOutput = z.infer<typeof SupportTicketOutputSchema>;

export async function createSupportTicket(input: SupportTicketInput): Promise<SupportTicketOutput> {
    return createSupportTicketFlow(input);
}

const prompt = ai.definePrompt({
    name: 'supportTicketPrompt',
    input: { schema: SupportTicketInputSchema },
    output: { schema: SupportTicketOutputSchema },
    prompt: `You are a friendly and efficient customer support agent for an app called FiscalFlow.
    A user has submitted a support request.

    Your tasks are:
    1. Generate a unique ticket ID in the format TICKET-XXXXX where XXXXX is a 5-digit random number.
    2. Create a friendly and reassuring response to the user. Acknowledge their request, mention the subject line, provide them with the new ticket ID, and let them know the support team will get back to them shortly.

    User's request subject: {{{subject}}}
    User's request message: {{{message}}}
    `,
});

const createSupportTicketFlow = ai.defineFlow(
  {
    name: 'createSupportTicketFlow',
    inputSchema: SupportTicketInputSchema,
    outputSchema: SupportTicketOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
