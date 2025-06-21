'use server';
/**
 * @fileOverview An AI flow for extracting data from invoices.
 *
 * - extractInvoiceData - A function that handles the invoice data extraction.
 */

import {ai} from '@/ai/genkit';
import { validateTaxInfo } from '../tools/dgii-validator-tool';
import { 
  ExtractInvoiceInput, 
  ExtractInvoiceOutput, 
  ExtractInvoiceInputSchema, 
  ExtractInvoiceOutputSchema 
} from '@/lib/ai-schemas';

export async function extractInvoiceData(input: ExtractInvoiceInput): Promise<ExtractInvoiceOutput> {
  return extractInvoiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractInvoicePrompt',
  input: {schema: ExtractInvoiceInputSchema},
  output: {schema: ExtractInvoiceOutputSchema},
  tools: [validateTaxInfo],
  prompt: `You are an expert OCR system for invoices from the Dominican Republic.
Your task is to perform two steps:
1. Extract the following information from the provided invoice image:
- RNC/Cédula del proveedor (rncCedula).
- Número de Comprobante Fiscal (NCF). Este es un código alfanumérico que usualmente empieza con 'B'.
- Fecha de emisión del comprobante (fechaComprobante) en formato AAAA-MM-DD.
- Monto Total Facturado o Subtotal antes de impuestos (montoFacturado).
- ITBIS facturado (itbisFacturado). Si hay varios, súmalos.

2. After extracting the data, you MUST call the 'validateTaxInfo' tool using the extracted 'rncCedula' and 'ncf' to verify them.

3. Finally, return all the extracted data AND the validation results from the tool in the required JSON format. The fields 'isRncValid', 'isNcfValid' and 'validationMessage' must be populated with the tool's response.

Pay close attention to details. The NCF must be exactly 11 characters. If you can't find a value for a field, use an empty string for text or 0 for numbers.

Invoice image: {{media url=photoDataUri}}`,
});

const extractInvoiceFlow = ai.defineFlow(
  {
    name: 'extractInvoiceFlow',
    inputSchema: ExtractInvoiceInputSchema,
    outputSchema: ExtractInvoiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
