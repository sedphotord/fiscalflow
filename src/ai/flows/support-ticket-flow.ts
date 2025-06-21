'use server';
/**
 * @fileOverview An AI flow for creating support tickets.
 * - createSupportTicket - Creates a support ticket.
 */

import {ai} from '@/ai/genkit';
import { 
  SupportTicketInput, 
  SupportTicketOutput, 
  SupportTicketInputSchema, 
  SupportTicketOutputSchema 
} from '@/lib/ai-schemas';

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
