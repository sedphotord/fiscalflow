'use server';
/**
 * @fileOverview A flow for looking up RNC details, simulating a DGII lookup.
 *
 * This flow simulates scraping the DGII website to fetch company details.
 * In a real-world application, this would be replaced with a robust scraping service.
 *
 * - lookupRnc - A function that handles the lookup process.
 * - RncLookupInput - The input type for the lookupRnc function.
 * - RncLookupOutput - The return type for the lookupRnc function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MOCK_COMPANY_DB } from '@/lib/mock-data';

export const RncLookupInputSchema = z.object({
  rnc: z.string().describe('The RNC to look up.'),
});
export type RncLookupInput = z.infer<typeof RncLookupInputSchema>;

export const RncLookupOutputSchema = z.object({
  razonSocial: z.string().describe('The official company name (Razón Social).'),
});
export type RncLookupOutput = z.infer<typeof RncLookupOutputSchema>;


export async function lookupRnc(input: RncLookupInput): Promise<RncLookupOutput> {
  return lookupRncFlow(input);
}

const lookupRncFlow = ai.defineFlow(
  {
    name: 'lookupRncFlow',
    inputSchema: RncLookupInputSchema,
    outputSchema: RncLookupOutputSchema,
  },
  async (input) => {
    // This simulates a real web scraping call to the DGII website.
    // It introduces a delay to feel like a network request.
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundData = MOCK_COMPANY_DB.find(c => c.rnc === input.rnc);

    if (foundData) {
      return { razonSocial: foundData.razonSocial };
    }

    // Fallback for unknown RNCs in this simulation
    return {
      razonSocial: `CONTRIBUYENTE ${input.rnc}`,
    };
  }
);
