
/**
 * @fileOverview In-memory mock database for the application.
 * This acts as a replacement for Firestore when it's not configured.
 * Data is not persisted between server restarts.
 */

import type { User, Company, TeamMember, Report, Plan, InvoicePack, Report606, Report607, Report608, Report609, SupportTicket, FormDefinition } from './types';

export const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Usuario Principal', rnc: '987654321', email: 'usuario.demo@fiscalflow.app', theme: 'system', plan: 'Pro', status: 'Activo', invoiceUsage: { current: 120, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-01-15').toISOString() },
    { id: 'user-2', name: 'Empresa ABC', rnc: '131223344', email: 'contacto@empresa-abc.com', theme: 'light', plan: 'Despacho', status: 'Activo', invoiceUsage: { current: 1500, limit: 10000 }, teamMemberLimit: 50, registeredAt: new Date('2022-11-20').toISOString() },
    { id: 'user-3', name: 'Juan Perez', rnc: '40212345678', email: 'juan.perez@email.com', theme: 'dark', plan: 'Gratis', status: 'Activo', invoiceUsage: { current: 25, limit: 50 }, teamMemberLimit: 1, registeredAt: new Date('2024-03-10').toISOString() },
    { id: 'user-4', name: 'Consultores RD', rnc: '101000001', email: 'info@consultores.do', theme: 'system', plan: 'Pro', status: 'Pago pendiente', invoiceUsage: { current: 501, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-08-01').toISOString() },
    { id: 'user-5', name: 'Ex-Cliente S.A.', rnc: '111222333', email: 'baja@excliente.com', theme: 'light', plan: 'Pro', status: 'Cancelado', invoiceUsage: { current: 0, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-05-05').toISOString() },
];

export const MOCK_COMPANIES: Company[] = [
    { id: 'comp-1', ownerId: 'user-1', name: 'Mi Propia Empresa', rnc: '987654321', email: 'usuario.demo@fiscalflow.app' },
    { id: 'comp-2', ownerId: 'user-1', name: 'Cliente de Ejemplo', rnc: '101000001', email: 'cliente@ejemplo.com', whatsapp: '+18095551234' },
    { id: 'comp-3', ownerId: 'user-2', name: 'Empresa ABC', rnc: '131223344', email: 'contacto@empresa-abc.com' },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'team-1', ownerId: 'user-1', name: 'Asistente Contable', email: 'asistente@fiscalflow.app', role: 'Contable', status: 'Activo', invoiceUsage: { current: 50, limit: 100 } },
    { id: 'team-2', ownerId: 'user-1', name: 'Empleado Junior', email: 'nuevo.empleado@email.com', role: 'Solo Lectura', status: 'Pendiente', invoiceUsage: { current: 0, limit: 10 } },
    { id: 'team-3', ownerId: 'user-2', name: 'Socio Principal', email: 'socio@empresa-abc.com', role: 'Admin', status: 'Activo', invoiceUsage: { current: 200, limit: 1000 } },
];

const mockReport1: Report606 = {
  id: 'rep-1',
  type: '606',
  rnc: '987654321',
  periodo: '202312',
  estado: 'Completado',
  fechaCreacion: new Date('2023-12-28').toISOString(),
  compras: [{
    rncCedula: '111222333',
    razonSocial: 'FERRETERIA DON JOSE INTERNACIONAL',
    tipoId: '1',
    tipoBienesServicios: '09',
    ncf: 'B0100000001',
    ncfModificado: '',
    fechaComprobante: '2023-12-15',
    fechaPago: '2023-12-15',
    montoFacturado: 5000,
    itbisFacturado: 900,
    itbisRetenido: 0,
    itbisSujetoProporcionalidad: 0,
    itbisLlevadoCosto: 0,
    itbisPorAdelantar: 0,
    itbisPercibidoCompras: 0,
    retencionRenta: 0,
    isc: 0,
    impuestoSelectivoConsumo: 0,
    otrosImpuestos: 0,
    montoPropinaLegal: 0,
    formaPago: 'credito'
  }]
};

const mockReport2: Report607 = {
  id: 'rep-2',
  type: '607',
  rnc: '987654321',
  periodo: '202312',
  estado: 'Borrador',
  fechaCreacion: new Date('2023-12-27').toISOString(),
  ventas: [{
    rncCedula: '444555666',
    tipoId: '1',
    ncf: 'B0100000002',
    ncfModificado: '',
    fechaComprobante: '2023-12-20',
    montoFacturado: 12000,
    itbisFacturado: 2160
  }]
};

const mockReport3: Report608 = {
  id: 'rep-3',
  type: '608',
  rnc: '987654321',
  periodo: '202401',
  estado: 'Completado',
  fechaCreacion: new Date('2024-01-30').toISOString(),
  anulados: [{
    ncfAnulado: 'B0100000003',
    fechaAnulacion: '2024-01-25',
    motivoAnulacion: '01'
  }]
};

const mockReport4: Report609 = {
  id: 'rep-4',
  type: '609',
  rnc: '987654321',
  periodo: '202402',
  estado: 'Borrador',
  fechaCreacion: new Date('2024-02-28').toISOString(),
  pagos: [{
    razonSocialBeneficiario: 'International Software Co.',
    tipoRenta: '01',
    fechaPago: '2024-02-15',
    montoPagado: 500,
    isrRetenido: 50
  }]
};

export const MOCK_REPORTS: Report[] = [
  mockReport1,
  mockReport2,
  mockReport3,
  mockReport4
];

export const MOCK_PLANS: Plan[] = [
    { id: 'plan-1', name: 'Gratis', price: 0, invoiceLimit: 50, teamMemberLimit: 1, description: 'Para individuos y freelancers que están empezando.', features: ["Hasta 50 facturas/mes", "Formularios 606 y 607", "Dashboard Analítico"] },
    { id: 'plan-2', name: 'Pro', price: 2500, invoiceLimit: 500, teamMemberLimit: 5, description: 'Ideal para pequeñas empresas y contadores con varios clientes.', features: ["Todo lo del plan Gratis", "Gestión Multi-Empresa", "Escaneo en Lote", "Soporte Prioritario"] },
    { id: 'plan-3', name: 'Despacho', price: 6500, invoiceLimit: 10000, teamMemberLimit: 50, description: 'La solución completa para despachos contables y grandes empresas.', features: ["Todo lo del plan Pro", "Usuarios Ilimitados", "API para Integración", "Soporte 24/7"] },
];

export const MOCK_INVOICE_PACKS: InvoicePack[] = [
    { id: 'pack-1', amount: 50, price: 1000 },
    { id: 'pack-2', amount: 100, price: 1500 },
    { id: 'pack-3', amount: 200, price: 2500 },
];

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
    { id: 'TICKET-58291', userId: 'user-1', userName: 'Usuario Principal', subject: 'Problema con escaneo', message: 'La factura del proveedor XYZ no se escanea correctamente, los montos salen en cero.', status: 'Abierto', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), response: 'Hemos recibido tu solicitud sobre el escaneo. Tu ID de ticket es TICKET-58291. Lo revisaremos pronto.' },
    { id: 'TICKET-92104', userId: 'user-4', userName: 'Consultores RD', subject: 'Duda sobre NCF', message: '¿Cómo debo registrar un NCF de consumidor final en el 607?', status: 'Cerrado', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), response: '¡Hola! Gracias por tu consulta sobre NCF de consumidor final. Tu ticket es el TICKET-92104.' },
];

export const MOCK_FORM_DEFINITIONS: FormDefinition[] = [
    { id: 'form-606', code: '606', name: 'Formato 606 - Compras', category: 'Formatos de Envío', description: 'Reporte de compras de bienes y servicios.', status: 'Disponible', version: '1.2.0', lastUpdatedAt: new Date('2024-07-01').toISOString(), fields: [
        { columnOrder: 1, name: 'RNC_CEDULA', type: 'Texto' },
        { columnOrder: 2, name: 'TIPO_ID', type: 'Numero' },
        { columnOrder: 3, name: 'TIPO_BIENES_SERVICIOS', type: 'Numero' },
        { columnOrder: 4, name: 'NCF', type: 'Texto' },
        { columnOrder: 8, name: 'MONTO_FACTURADO', type: 'Moneda' },
        { columnOrder: 9, name: 'ITBIS_FACTURADO', type: 'Moneda' },
    ]},
    { id: 'form-607', code: '607', name: 'Formato 607 - Ventas', category: 'Formatos de Envío', description: 'Reporte de ventas de bienes y servicios.', status: 'Disponible', version: '1.1.5', lastUpdatedAt: new Date('2024-06-15').toISOString(), fields: [] },
    { id: 'form-608', code: '608', name: 'Formato 608 - Anulados', category: 'Formatos de Envío', description: 'Reporte de comprobantes fiscales anulados.', status: 'Disponible', version: '1.0.0', lastUpdatedAt: new Date('2024-05-20').toISOString(), fields: [] },
    { id: 'form-609', code: '609', name: 'Formato 609 - Pagos al Exterior', category: 'Formatos de Envío', description: 'Reporte de pagos a proveedores en el exterior.', status: 'Disponible', version: '1.0.0', lastUpdatedAt: new Date('2024-05-20').toISOString(), fields: [] },
    { id: 'form-ir1', code: 'IR-1', name: 'Declaración Jurada IR-1', category: 'Declaraciones Anuales', description: 'Declaración jurada de impuesto sobre la renta para personas físicas.', status: 'En Desarrollo', version: '0.5.0', lastUpdatedAt: new Date('2024-07-10').toISOString(), fields: [] },
    { id: 'form-it1', code: 'IT-1', name: 'Declaración Jurada ITBIS', category: 'Declaraciones Mensuales', description: 'Declaración jurada de ITBIS.', status: 'Desactivado', version: '0.8.0', lastUpdatedAt: new Date('2024-04-01').toISOString(), fields: [] },
];
