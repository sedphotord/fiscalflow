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
  '130000001': { razonSocial: 'CENTRO CUESTA NACIONAL, S.A.S. (SUPERMERCADO NACIONAL)' },
  '130000002': { razonSocial: 'BANCO POPULAR DOMINICANO, S.A.- BANCO MULTIPLE' },
  '130000003': { razonSocial: 'COMPAÑIA DOMINICANA DE TELEFONOS, C. POR A. (CLARO)' },
  '130000004': { razonSocial: 'EDESUR DOMINICANA S.A.' },
  '40287654321': { razonSocial: 'MARIA RODRIGUEZ' },
  '101002571': { razonSocial: 'CERVECERIA NACIONAL DOMINICANA, S.A.' },
  '101515715': { razonSocial: 'GRUPO RAMOS, S.A.' },
  '101732731': { razonSocial: 'AEROPUERTOS DOMINICANOS SIGLO XXI, S.A. (AERODOM)' },
  '130005232': { razonSocial: 'REFINERIA DOMINICANA DE PETROLEO PDV, S.A.' },
  '101505537': { razonSocial: 'ALTICE DOMINICANA, S.A.' },
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
