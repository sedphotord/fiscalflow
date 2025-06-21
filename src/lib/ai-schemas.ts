
import { z } from 'zod';

// Schemas for extract-invoice-flow.ts
export const ExtractInvoiceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an invoice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractInvoiceInput = z.infer<typeof ExtractInvoiceInputSchema>;

export const ExtractInvoiceOutputSchema = z.object({
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

// Schemas for lookup-rnc-flow.ts
export const RncLookupInputSchema = z.object({
  rnc: z.string().describe('The RNC to look up.'),
});
export type RncLookupInput = z.infer<typeof RncLookupInputSchema>;

export const RncLookupOutputSchema = z.object({
  razonSocial: z.string().describe('The official company name (Razón Social).'),
});
export type RncLookupOutput = z.infer<typeof RncLookupOutputSchema>;

// Schemas for search-companies-flow.ts
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

// Schemas for support-ticket-flow.ts
export const SupportTicketInputSchema = z.object({
  subject: z.string().describe('The subject of the support ticket.'),
  message: z.string().describe('The detailed message of the support ticket.'),
});
export type SupportTicketInput = z.infer<typeof SupportTicketInputSchema>;

export const SupportTicketOutputSchema = z.object({
  ticketId: z.string().describe('A unique identifier for the created ticket, in the format TICKET-XXXXX.'),
  response: z.string().describe('A friendly and helpful response to the user, confirming receipt and providing the ticket ID.'),
});
export type SupportTicketOutput = z.infer<typeof SupportTicketOutputSchema>;

// Schemas for validate-tax-info-flow.ts
export const ValidateTaxInfoInputSchema = z.object({
  rncCedula: z.string().describe('The RNC or Cédula to validate.'),
  ncf: z.string().optional().describe('The NCF to validate.'),
});
export type ValidateTaxInfoInput = z.infer<typeof ValidateTaxInfoInputSchema>;

export const ValidateTaxInfoOutputSchema = z.object({
  isRncValid: z.boolean().describe('Whether the RNC or Cédula is considered valid.'),
  isNcfValid: z.boolean().describe('Whether the NCF is considered valid. Returns true if NCF is not provided.'),
  validationMessage: z.string().describe('A summary message of the validation results.'),
});
export type ValidateTaxInfoOutput = z.infer<typeof ValidateTaxInfoOutputSchema>;
