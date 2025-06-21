'use server';
/**
 * @fileOverview A flow for searching companies by name.
 * - searchCompanies - A function that handles the company search process.
 */
import { ai } from '@/ai/genkit';
import { MOCK_COMPANY_DB } from '@/lib/mock-data';
import {
  CompanySearchInput,
  CompanySearchOutput,
  CompanySearchInputSchema,
  CompanySearchOutputSchema,
} from '@/lib/ai-schemas';

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
