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

// Mock database of RNCs for simulation purposes
const MOCK_RNC_DB: Record<string, RncLookupOutput> = {
  '131223344': { razonSocial: 'EMPRESA ABC SRL' },
  '101000001': { razonSocial: 'CLIENTE DE EJEMPLO SA' },
  '987654321': { razonSocial: 'FISCALFLOW DEMO SRL' },
  '111222333': { razonSocial: 'FERRETERIA DON JOSE INTERNACIONAL' },
  '40212345678': { razonSocial: 'JUAN PEREZ' },
};


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

    const foundData = MOCK_RNC_DB[input.rnc];

    if (foundData) {
      return foundData;
    }

    // Fallback for unknown RNCs in this simulation
    return {
      razonSocial: `CONTRIBUYENTE ${input.rnc}`,
    };
  }
);
