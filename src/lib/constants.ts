

export const TIPO_BIENES_SERVICIOS = [
    { value: "01", label: "01 - Gastos de Personal" },
    { value: "02", label: "02 - Gastos por Trabajos, Suministros y Servicios" },
    { value: "03", label: "03 - Arrendamientos" },
    { value: "04", label: "04 - Gastos de Activos Fijos" },
    { value: "05", label: "05 - Gastos de Representación" },
    { value: "06", label: "06 - Otras Deducciones Admitidas" },
    { value: "07", label: "07 - Gastos Financieros" },
    { value: "08", label: "08 - Gastos Extraordinarios" },
    { value: "09", label: "09 - Compras y Gastos que Formarán Parte del Costo de Venta" },
    { value: "10", label: "10 - Adquisiciones de Activos" },
    { value: "11", label: "11 - Gastos de Seguros" },
];

export const FORMAS_PAGO = [
    { value: "efectivo", label: "Efectivo" },
    { value: "cheque", label: "Cheque/Transferencia" },
    { value: "tarjeta", label: "Tarjeta Crédito/Débito" },
    { value: "credito", label: "A Crédito" },
];

export const TEAM_ROLES = [
    { id: 'Admin', name: 'Administrador', description: 'Acceso total a todas las funciones y configuraciones.'},
    { id: 'Supervisor', name: 'Contador Supervisor', description: 'Puede gestionar reportes, clientes y revisar trabajo.'},
    { id: 'Contable', name: 'Contable', description: 'Puede crear y editar reportes para los clientes asignados.'},
    { id: 'Solo Lectura', name: 'Solo Lectura', description: 'Solo puede ver reportes, no puede editar ni crear.'},
];
