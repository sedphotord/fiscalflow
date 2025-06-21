'use server';
/**
 * @fileOverview A flow for searching companies by name.
 * - searchCompanies - A function that handles the company search process.
 * - CompanySearchInput - The input type for the searchCompanies function.
 * - CompanySearchOutput - The return type for the searchCompanies function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MOCK_COMPANY_DB } from '@/lib/mock-data';

export const CompanySearchInputSchema = z.object({
  query: z.string().describe('The partial company name to search for.'),
});
export type CompanySearchInput = z.infer<typeof CompanySearchInputSchema>;

export const CompanySearchOutputSchema = z.array(
  z.object({
    name: z.string().describe('The official company name (Razón Social).'),
    rnc: z.string().describe('The RNC of the company.'),
  })
);
export type CompanySearchOutput = z.infer<typeof CompanySearchOutputSchema>;

export async function searchCompanies(input: CompanySearchInput): Promise<CompanySearchOutput> {
  return searchCompaniesFlow(input);
}

const searchCompaniesFlow = ai.defineFlow(
  {
    name: 'searchCompaniesFlow',
    inputSchema: CompanySearchInputSchema,
    outputSchema: CompanySearchOutputSchema,
  },
  async (input) => {
    if (!input.query) {
      return [];
    }

    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network latency

    const results = MOCK_COMPANY_DB.filter(company =>
      company.razonSocial.toLowerCase().includes(input.query.toLowerCase())
    ).slice(0, 5); // Limit to 5 results

    return results.map(c => ({ name: c.razonSocial, rnc: c.rnc }));
  }
);
