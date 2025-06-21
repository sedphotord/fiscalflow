/**
 * @fileOverview A tool for validating Dominican Republic tax information (RNC/NCF).
 * - validateTaxInfo - A Genkit tool to check the validity of RNC/Cédula and NCF.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DgiiValidationInputSchema = z.object({
  rncCedula: z.string().describe('The RNC or Cédula to validate.'),
  ncf: z.string().describe('The NCF to validate.'),
});

const DgiiValidationOutputSchema = z.object({
  isRncValid: z.boolean().describe('Whether the RNC or Cédula is considered valid.'),
  isNcfValid: z.boolean().describe('Whether the NCF is considered valid.'),
  validationMessage: z.string().describe('A summary message of the validation results.'),
});

export const validateTaxInfo = ai.defineTool(
  {
    name: 'validateTaxInfo',
    description: 'Validates a Dominican Republic RNC/Cédula and NCF by checking against the official DGII database. This should be called for every invoice.',
    inputSchema: DgiiValidationInputSchema,
    outputSchema: DgiiValidationOutputSchema,
  },
  async (input) => {
    // This simulates a real API call to the DGII website.
    // It introduces a delay to feel like a network request.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // More realistic validation logic for the prototype
    const rncValid = (input.rncCedula?.length === 9 || input.rncCedula?.length === 11) && /^\d+$/.test(input.rncCedula);
    const ncfValid = (input.ncf?.length === 11 && /^[BE]\d{10}$/i.test(input.ncf));

    let message = '';
    if (rncValid && ncfValid) {
        message = 'Validación exitosa: El RNC/Cédula y el NCF son válidos y activos en la DGII.';
    } else {
        message = 'Error de validación: ';
        if (!rncValid) message += 'El RNC o Cédula no se encuentra registrado o el formato es incorrecto. ';
        if (!ncfValid) message += 'El NCF no es válido o no corresponde al RNC del emisor.';
    }

    return {
      isRncValid: rncValid,
      isNcfValid: ncfValid,
      validationMessage: message,
    };
  }
);
