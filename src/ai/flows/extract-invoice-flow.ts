'use server';
/**
 * @fileOverview An AI flow for extracting data from invoices.
 *
 * - extractInvoiceData - A function that handles the invoice data extraction.
 * - ExtractInvoiceInput - The input type for the extractInvoiceData function.
 * - ExtractInvoiceOutput - The return type for the extractInvoiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { validateTaxInfo } from '../tools/dgii-validator-tool';

const ExtractInvoiceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an invoice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractInvoiceInput = z.infer<typeof ExtractInvoiceInputSchema>;

const ExtractInvoiceOutputSchema = z.object({
  rncCedula: z.string().describe("El RNC o Cédula del proveedor de la factura."),
  ncf: z.string().describe("El Número de Comprobante Fiscal (NCF) de la factura. Debe ser un string de 11 caracteres."),
  fechaComprobante: z.string().describe("La fecha de emisión del comprobante en formato AAAA-MM-DD."),
  montoFacturado: z.number().describe("El monto total facturado, puede ser el subtotal antes de impuestos."),
  itbisFacturado: z.number().describe("El monto total de ITBIS (impuesto) facturado. Si hay varios, deben sumarse."),
  isRncValid: z.boolean().describe("Resultado de la validación del RNC/Cédula."),
  isNcfValid: z.boolean().describe("Resultado de la validación del NCF."),
  validationMessage: z.string().describe("Un mensaje resumen de la validación."),
});
export type ExtractInvoiceOutput = z.infer<typeof ExtractInvoiceOutputSchema>;

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
