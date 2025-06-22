
import { z } from 'zod';
import { TIPO_BIENES_SERVICIOS, FORMAS_PAGO, TEAM_ROLES, MOTIVOS_ANULACION_608, TIPOS_RENTA_609 } from './constants';
import type { UserPlan, TeamMemberRole } from './types';

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
  accountType: z.enum(['personal', 'empresa']),
  companyName: z.string().optional(),
  rnc: z.string().optional(),
}).refine(data => {
  if (data.accountType === 'empresa') {
    return !!data.companyName && data.companyName.length >= 2;
  }
  return true;
}, {
  message: "El nombre de la empresa es requerido.",
  path: ["companyName"],
}).refine(data => {
  if (data.accountType === 'empresa') {
    const rncLength = data.rnc?.length || 0;
    return !!data.rnc && (rncLength === 9 || rncLength === 11);
  }
  return true;
}, {
  message: "El RNC debe tener 9 u 11 dígitos.",
  path: ["rnc"],
});


// Schema for a single row in the 606 form
export const Form606RowSchema = z.object({
  rncCedula: z.string().min(1, "Campo requerido"),
  razonSocial: z.string().optional(),
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
  isRncValid: z.boolean().optional(),
  isNcfValid: z.boolean().optional(),
});

// Schema for the entire 607 form
export const Form607Schema = z.object({
  rnc: z.string().min(9, "RNC inválido").max(11, "RNC/Cédula inválido"),
  periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser AAAAMM"),
  ventas: z.array(Form607RowSchema).min(1, "Debe agregar al menos una venta."),
});

// Schema for a single row in the 608 form
export const Form608RowSchema = z.object({
    ncfAnulado: z.string().length(11, "NCF debe tener 11 caracteres"),
    fechaAnulacion: z.string().min(1, "Fecha requerida"),
    motivoAnulacion: z.enum(MOTIVOS_ANULACION_608.map(item => item.value) as [string, ...string[]]),
});

// Schema for the entire 608 form
export const Form608Schema = z.object({
    rnc: z.string().min(9, "RNC inválido").max(11, "RNC/Cédula inválido"),
    periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser AAAAMM"),
    anulados: z.array(Form608RowSchema).min(1, "Debe agregar al menos un NCF anulado."),
});

// Schema for a single row in the 609 form
export const Form609RowSchema = z.object({
    razonSocialBeneficiario: z.string().min(1, "Razón Social es requerida"),
    tipoRenta: z.enum(TIPOS_RENTA_609.map(item => item.value) as [string, ...string[]]),
    fechaPago: z.string().min(1, "Fecha de pago es requerida"),
    montoPagado: z.number({invalid_type_error: "Monto requerido"}).positive("Debe ser positivo"),
    isrRetenido: z.number({invalid_type_error: "Monto requerido"}).min(0, "No puede ser negativo"),
});

// Schema for the entire 609 form
export const Form609Schema = z.object({
    rnc: z.string().min(9, "RNC inválido").max(11, "RNC/Cédula inválido"),
    periodo: z.string().regex(/^\d{6}$/, "Formato de período debe ser AAAAMM"),
    pagos: z.array(Form609RowSchema).min(1, "Debe agregar al menos un pago al exterior."),
});


// Schema for adding/editing a company
export const CompanySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  rnc: z.string().refine(rnc => (rnc.length === 9 || rnc.length === 11) && /^\d+$/.test(rnc), {
    message: 'El RNC debe ser numérico y tener 9 u 11 dígitos.',
  }),
  email: z.string().email({ message: "Correo electrónico inválido." }).optional().or(z.literal('')),
  whatsapp: z.string().optional(),
});

// Schema for the support contact form
export const SupportSchema = z.object({
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres.' }),
  message: z.string().min(20, { message: 'El mensaje debe tener al menos 20 caracteres.' }),
});

// Schema for the general contact form
export const ContactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido.' }),
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres.' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres.' }),
});


// Schema for Payment Method Form
export const PaymentMethodSchema = z.object({
  cardholderName: z.string().min(3, "Nombre en la tarjeta es requerido."),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val.replace(/\s/g, '')), "Número de tarjeta inválido. Deben ser 16 dígitos."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "El formato debe ser MM/AA."),
  cvc: z.string().regex(/^\d{3,4}$/, "El CVC debe tener 3 o 4 dígitos."),
});

// Schema for Billing Information
export const BillingSchema = z.object({
  name: z.string().min(2, "El nombre o razón social es requerido."),
  rnc: z.string().refine(rnc => (rnc.length === 9 || rnc.length === 11) && /^\d+$/.test(rnc), {
    message: 'El RNC/Cédula debe ser numérico y tener 9 u 11 dígitos.',
  }),
  address: z.string().min(5, "La dirección es requerida."),
  city: z.string().min(2, "La ciudad es requerida."),
  province: z.string().min(2, "La provincia es requerida."),
  zip: z.string().min(3, "El código postal es requerido."),
});

// Schema for adding/editing a team member by a user
export const TeamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }),
  role: z.custom<TeamMemberRole>(val => TEAM_ROLES.some(role => role.id === val), {
    message: 'Por favor seleccione un rol válido.',
  }),
  invoiceLimit: z.number().int().min(0, "El límite no puede ser negativo."),
});

// Schema for inviting a team member
export const InviteTeamMemberSchema = z.object({
  email: z.string().email({ message: 'Por favor ingrese un correo electrónico válido.' }),
  role: z.custom<TeamMemberRole>(val => TEAM_ROLES.some(role => role.id === val), {
    message: 'Por favor seleccione un rol válido.',
  }),
});


// Admin Schemas
const TeamMemberCreationSchema = z.object({
  email: z.string().email({ message: 'Correo de miembro inválido.' }),
  password: z.string().min(6, { message: 'Contraseña de miembro debe tener al menos 6 caracteres.' }),
  role: z.custom<TeamMemberRole>(val => TEAM_ROLES.some(role => role.id === val), {
    message: 'Por favor seleccione un rol válido para el miembro.',
  }),
});

export const AdminCreateUserSchema = z.object({
    name: z.string().min(2, { message: 'El nombre es requerido.' }),
    email: z.string().email({ message: 'Correo inválido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    plan: z.custom<UserPlan>(),
    additionalInvoices: z.number().int().min(0, "Debe ser 0 o mayor.").optional(),
    additionalTeamMembers: z.number().int().min(0, "Debe ser 0 o mayor.").optional(),
    teamMembers: z.array(TeamMemberCreationSchema).optional(),
});

export const AdminInviteTeamMemberSchema = z.object({
  email: z.string().email({ message: 'Correo inválido.' }),
  role: z.custom<TeamMemberRole>(val => TEAM_ROLES.some(role => role.id === val)),
});


export const PlanSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  price: z.number().min(0, "El precio no puede ser negativo."),
  invoiceLimit: z.number().int().min(0, "El límite debe ser 0 o mayor."),
  teamMemberLimit: z.number().int().min(0, "El límite debe ser 0 o mayor."),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export const InvoicePackSchema = z.object({
  amount: z.number().int().positive("La cantidad debe ser mayor a 0."),
  price: z.number().min(0, "El precio no puede ser negativo."),
});

export const FormFieldDefinitionSchema = z.object({
    columnOrder: z.number().int("Debe ser un número entero."),
    name: z.string().min(1, "El nombre del campo es requerido."),
    type: z.enum(['Texto', 'Numero', 'Fecha', 'Moneda']),
});

// Schema for Form Definition management in Admin panel
export const FormDefinitionSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(3, "El código es requerido (ej: 606)."),
  name: z.string().min(5, "El nombre es requerido."),
  description: z.string().min(10, "La descripción es requerida."),
  category: z.string().min(1, "La categoría es requerida."),
  status: z.enum(['Disponible', 'En Desarrollo', 'Desactivado']),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "La versión debe ser en formato X.Y.Z (ej: 1.0.0)."),
  fields: z.array(FormFieldDefinitionSchema).optional(),
});
