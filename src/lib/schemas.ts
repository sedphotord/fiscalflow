import { z } from 'zod';
import { TIPO_BIENES_SERVICIOS, FORMAS_PAGO } from './constants';

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
  tipoBienesServicios: z.enum(TIPO_BIENES_SERVICIOS.map(item => item.value) as [string, ...string[]], { errorMap: () => ({ message: "Seleccione un tipo" }) }),
  ncf: z.string().length(11, "NCF debe tener 11 caracteres"),
  ncfModificado: z.string().optional(),
  fechaComprobante: z.string().min(1, "Fecha requerida"),
  fechaPago: z.string().min(1, "Fecha requerida"),
  montoFacturado: z.number({invalid_type_error: "Monto requerido"}).positive("Debe ser positivo"),
  itbisFacturado: z.number({invalid_type_error: "Monto requerido"}).min(0, "No puede ser negativo"),
  itbisRetenido: z.number().min(0, "No puede ser negativo").optional(),
  itbisSujetoProporcionalidad: z.number().min(0, "No puede ser negativo").optional(),
  itbisLlevadoCosto: z.number().min(0, "No puede ser negativo").optional(),
  itbisPorAdelantar: z.number().min(0, "No puede ser negativo").optional(),
  itbisPercibidoCompras: z.number().min(0, "No puede ser negativo").optional(),
  retencionRenta: z.number().min(0, "No puede ser negativo").optional(),
  isc: z.number().min(0, "No puede ser negativo").optional(),
  impuestoSelectivoConsumo: z.number().min(0, "No puede ser negativo").optional(),
  otrosImpuestos: z.number().min(0, "No puede ser negativo").optional(),
  montoPropinaLegal: z.number().min(0, "No puede ser negativo").optional(),
  formaPago: z.enum(FORMAS_PAGO.map(item => item.value) as [string, ...string[]], { errorMap: () => ({ message: "Seleccione una forma de pago" }) }),
  isRncValid: z.boolean().optional(),
  isNcfValid: z.boolean().optional(),
});

// Schema for the entire 606 form
export const Form606Schema = z.object({
  rnc: z.string().min(9, "RNC inválido").max(11, "RNC/Cédula inválido"),
  periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser AAAAMM"),
  compras: z.array(Form606RowSchema).min(1, "Debe agregar al menos una compra."),
});


// Schema for a single row in the 607 form
export const Form607RowSchema = z.object({
  rncCedula: z.string().min(9, "RNC/Cédula inválido").max(11, "RNC/Cédula inválido"),
  tipoId: z.enum(["1", "2"], { errorMap: () => ({ message: "Seleccione un tipo" }) }),
  ncf: z.string().length(11, "NCF debe tener 11 caracteres"),
  ncfModificado: z.string().optional(),
  fechaComprobante: z.string().min(1, "Fecha requerida"),
  montoFacturado: z.number({invalid_type_error: "Monto requerido"}).positive("Debe ser positivo"),
  itbisFacturado: z.number({invalid_type_error: "Monto requerido"}).min(0, "No puede ser negativo"),
});

// Schema for the entire 607 form
export const Form607Schema = z.object({
  rnc: z.string().min(9, "RNC inválido").max(11, "RNC/Cédula inválido"),
  periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser AAAAMM"),
  ventas: z.array(Form607RowSchema).min(1, "Debe agregar al menos una venta."),
});
