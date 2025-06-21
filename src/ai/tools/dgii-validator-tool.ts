'use server';
/**
 * @fileOverview A tool for validating Dominican Republic tax information (RNC/NCF).
 * - validateTaxInfo - A Genkit tool to check the validity of RNC/Cédula and NCF.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const DgiiValidationInputSchema = z.object({
  rncCedula: z.string().describe('The RNC or Cédula to validate.'),
  ncf: z.string().describe('The NCF to validate.'),
});

export const DgiiValidationOutputSchema = z.object({
  isRncValid: z.boolean().describe('Whether the RNC or Cédula is considered valid.'),
  isNcfValid: z.boolean().describe('Whether the NCF is considered valid.'),
  validationMessage: z.string().describe('A summary message of the validation results.'),
});

export const validateTaxInfo = ai.defineTool(
  {
    name: 'validateTaxInfo',
    description: 'Validates a Dominican Republic RNC/Cédula and NCF. This should be called for every invoice.',
    inputSchema: DgiiValidationInputSchema,
    outputSchema: DgiiValidationOutputSchema,
  },
  async (input) => {
    // In a real application, this would call the official DGII API.
    // For this prototype, we'll use simple format validation.
    const rncValid = (input.rncCedula?.length === 9 || input.rncCedula?.length === 11);
    const ncfValid = (input.ncf?.length === 11 && input.ncf?.toUpperCase().startsWith('B'));

    let message = 'Validación simulada completada. ';
    if (rncValid && ncfValid) {
        message += 'RNC y NCF parecen tener un formato correcto.';
    } else {
        if (!rncValid) message += 'El formato del RNC/Cédula es incorrecto. ';
        if (!ncfValid) message += 'El formato del NCF es incorrecto.';
    }

    return {
      isRncValid: rncValid,
      isNcfValid: ncfValid,
      validationMessage: message,
    };
  }
);
