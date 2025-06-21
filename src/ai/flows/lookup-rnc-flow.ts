'use server';
/**
 * @fileOverview A flow for looking up RNC details, simulating a DGII lookup.
 *
 * This flow simulates scraping the DGII website to fetch company details.
 * In a real-world application, this would be replaced with a robust scraping service.
 *
 * - lookupRnc - A function that handles the lookup process.
 */
import { ai } from '@/ai/genkit';
import { MOCK_COMPANY_DB } from '@/lib/mock-data';
import { 
  RncLookupInput, 
  RncLookupOutput, 
  RncLookupInputSchema, 
  RncLookupOutputSchema 
} from '@/lib/ai-schemas';


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
