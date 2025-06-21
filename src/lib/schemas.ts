import { z } from 'zod';

// Schema for Login
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

// Schema for Sign Up
export const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

// Schema for a single row in the 606 form
export const Form606RowSchema = z.object({
  rncCedula: z.string().min(1, "Campo requerido"),
  tipoId: z.enum(["1", "2"], { errorMap: () => ({ message: "Seleccione un tipo" }) }),
  tipoBienesServicios: z.string().min(1, "Campo requerido"),
  ncf: z.string().min(11, "NCF inválido").max(11, "NCF inválido"),
  ncfModificado: z.string().optional(),
  fechaComprobante: z.string().min(1, "Fecha requerida"),
  fechaPago: z.string().min(1, "Fecha requerida"),
  montoFacturado: z.number().positive("Debe ser positivo"),
  itbisFacturado: z.number().min(0, "No puede ser negativo"),
  itbisRetenido: z.number().min(0, "No puede ser negativo"),
  itbisSujetoProporcionalidad: z.number().min(0, "No puede ser negativo"),
  itbisLlevadoCosto: z.number().min(0, "No puede ser negativo"),
  itbisPorAdelantar: z.number().min(0, "No puede ser negativo"),
  itbisPercibidoCompras: z.number().min(0, "No puede ser negativo"),
  retencionRenta: z.number().min(0, "No puede ser negativo"),
  isc: z.number().min(0, "No puede ser negativo"),
  impuestoSelectivoConsumo: z.number().min(0, "No puede ser negativo"),
  otrosImpuestos: z.number().min(0, "No puede ser negativo"),
  montoPropinaLegal: z.number().min(0, "No puede ser negativo"),
  formaPago: z.enum(["efectivo", "cheque", "transferencia", "tarjeta"], { errorMap: () => ({ message: "Seleccione una forma de pago" }) }),
});

// Schema for the entire 606 form
export const Form606Schema = z.object({
  rnc: z.string().min(9, "RNC inválido").max(11, "RNC inválido"),
  periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser YYYYMM"),
  compras: z.array(Form606RowSchema).min(1, "Debe agregar al menos una compra."),
});
