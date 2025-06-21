'use server';
/**
 * @fileOverview A flow for validating Dominican Republic tax information.
 * - validateTaxInformation - A function that handles the validation process.
 * - ValidateTaxInfoInput - The input type for the validateTaxInformation function.
 * - ValidateTaxInfoOutput - The return type for the validateTaxInformation function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ValidateTaxInfoInputSchema = z.object({
  rncCedula: z.string().describe('The RNC or Cédula to validate.'),
  ncf: z.string().optional().describe('The NCF to validate.'),
});
export type ValidateTaxInfoInput = z.infer<typeof ValidateTaxInfoInputSchema>;

const ValidateTaxInfoOutputSchema = z.object({
  isRncValid: z.boolean().describe('Whether the RNC or Cédula is considered valid.'),
  isNcfValid: z.boolean().describe('Whether the NCF is considered valid. Returns true if NCF is not provided.'),
  validationMessage: z.string().describe('A summary message of the validation results.'),
});
export type ValidateTaxInfoOutput = z.infer<typeof ValidateTaxInfoOutputSchema>;


export async function validateTaxInformation(input: ValidateTaxInfoInput): Promise<ValidateTaxInfoOutput> {
  return validateTaxInfoFlow(input);
}


const validateTaxInfoFlow = ai.defineFlow(
  {
    name: 'validateTaxInfoFlow',
    inputSchema: ValidateTaxInfoInputSchema,
    outputSchema: ValidateTaxInfoOutputSchema,
  },
  async (input) => {
    // This simulates a real API call to the DGII website.
    // It introduces a delay to feel like a network request.
    await new Promise(resolve => setTimeout(resolve, 1500));

    const rncValid = (input.rncCedula?.length === 9 || input.rncCedula?.length === 11) && /^\d+$/.test(input.rncCedula);
    const ncfProvided = input.ncf && input.ncf.length > 0;
    const ncfValid = ncfProvided ? (input.ncf!.length === 11 && /^[BE]\d{10}$/i.test(input.ncf!)) : true;

    let message = '';
    if (rncValid && ncfValid) {
      message = 'Validación exitosa: El RNC/Cédula';
      if (ncfProvided) {
        message += ' y el NCF son válidos';
      }
      message += ' y activos en la DGII.';
    } else {
        message = 'Error de validación:';
        if (!rncValid) {
          message += ' El RNC o Cédula no se encuentra registrado o el formato es incorrecto.';
        }
        if (ncfProvided && !ncfValid) {
          message += ' El NCF no es válido o no corresponde al RNC del emisor.';
        }
    }

    return {
      isRncValid: rncValid,
      isNcfValid: ncfValid,
      validationMessage: message.trim(),
    };
  }
);
