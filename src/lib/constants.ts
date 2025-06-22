

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

export const ALL_PLAN_FEATURES = [
    "Hasta 50 facturas/mes",
    "Hasta 500 facturas/mes",
    "Facturas Ilimitadas",
    "Formularios 606 y 607",
    "Validación RNC/NCF",
    "Exportación a Excel",
    "Dashboard Analítico",
    "Gestión Multi-Empresa",
    "Escaneo en Lote",
    "Alertas y Recordatorios",
    "1 Usuario por Cuenta",
    "Hasta 5 Usuarios",
    "Usuarios Ilimitados",
    "API para Integración",
    "Soporte por Email",
    "Soporte Prioritario",
    "Soporte Telefónico 24/7",
    "Consultoría y Capacitación",
];


export const MOTIVOS_ANULACION_608 = [
    { value: "01", label: "01 - Deterioro de Factura" },
    { value: "02", label: "02 - Errores de Impresión (Factura Pre-impresa)" },
    { value: "03", label: "03 - Impresión Defectuosa" },
    { value: "04", label: "04 - Cese de Operaciones" },
    { value: "05", label: "05 - Pérdida o Hurto de Factura" },
    { value: "06", label: "06 - NCF no emitido" },
    { value: "07", label: "07 - Cambio de NCF por Devolución o Descuento" },
];

export const TIPOS_RENTA_609 = [
    { value: "01", label: "01 - Asistencia Técnica" },
    { value: "02", label: "02 - Regalías" },
    { value: "03", label: "03 - Intereses" },
    { value: "04", label: "04 - Alquiler de Equipos" },
    { value: "05", label: "05 - Servicios" },
    { value: "06", label: "06 - Dividendos" },
    { value: "07", label: "07 - Otros" },
];

export const PROVINCES = [
    "Azua", "Bahoruco", "Barahona", "Dajabón", "Distrito Nacional", "Duarte",
    "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", "Hermanas Mirabal",
    "Independencia", "La Altagracia", "La Romana", "La Vega", "María Trinidad Sánchez",
    "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia",
    "Puerto Plata", "Samaná", "San Cristóbal", "San José de Ocoa", "San Juan",
    "San Pedro de Macorís", "Sánchez Ramírez", "Santiago", "Santiago Rodríguez",
    "Valverde", "Santo Domingo"
].sort();

export const CITIES_BY_PROVINCE: { [key: string]: string[] } = {
    "Azua": ["Azua de Compostela", "Estebanía", "Guayabal", "Las Charcas", "Las Yayas de Viajama", "Padre Las Casas", "Peralta", "Pueblo Viejo", "Sabana Yegua", "Tábara Arriba"],
    "Bahoruco": ["Neiba", "Galván", "Los Ríos", "Tamayo", "Villa Jaragua"],
    "Barahona": ["Santa Cruz de Barahona", "Cabral", "El Peñón", "Enriquillo", "Fundación", "Jaquimeyes", "La Ciénaga", "Las Salinas", "Paraíso", "Polo", "Vicente Noble"],
    "Dajabón": ["Dajabón", "El Pino", "Loma de Cabrera", "Partido", "Restauración"],
    "Distrito Nacional": ["Santo Domingo de Guzmán"],
    "Duarte": ["San Francisco de Macorís", "Arenoso", "Castillo", "Eugenio María de Hostos", "Las Guáranas", "Pimentel", "Villa Riva"],
    "El Seibo": ["Santa Cruz de El Seibo", "Miches"],
    "Elías Piña": ["Comendador", "Bánica", "El Llano", "Hondo Valle", "Juan Santiago", "Pedro Santana"],
    "Espaillat": ["Moca", "Cayetano Germosén", "Gaspar Hernández", "Jamao al Norte"],
    "Hato Mayor": ["Hato Mayor del Rey", "El Valle", "Sabana de la Mar"],
    "Hermanas Mirabal": ["Salcedo", "Tenares", "Villa Tapia"],
    "Independencia": ["Jimaní", "Cristóbal", "Duvergé", "La Descubierta", "Mella", "Postrer Río"],
    "La Altagracia": ["Salvaleón de Higüey", "San Rafael del Yuma", "Punta Cana"],
    "La Romana": ["La Romana", "Guaymate", "Villa Hermosa"],
    "La Vega": ["Concepción de La Vega", "Constanza", "Jarabacoa", "Jima Abajo"],
    "María Trinidad Sánchez": ["Nagua", "Cabrera", "El Factor", "Río San Juan"],
    "Monseñor Nouel": ["Bonao", "Maimón", "Piedra Blanca"],
    "Monte Cristi": ["San Fernando de Monte Cristi", "Castañuelas", "Guayubín", "Las Matas de Santa Cruz", "Pepillo Salcedo", "Villa Vásquez"],
    "Monte Plata": ["Monte Plata", "Bayaguana", "Peralvillo", "Sabana Grande de Boyá", "Yamasá"],
    "Pedernales": ["Pedernales", "Oviedo"],
    "Peravia": ["Baní", "Matanzas", "Nizao"],
    "Puerto Plata": ["San Felipe de Puerto Plata", "Altamira", "Guananico", "Imbert", "Los Hidalgos", "Luperón", "Sosúa", "Villa Isabela", "Villa Montellano"],
    "Samaná": ["Santa Bárbara de Samaná", "Las Terrenas", "Sánchez"],
    "San Cristóbal": ["San Cristóbal", "Bajos de Haina", "Cambita Garabitos", "Los Cacaos", "Sabana Grande de Palenque", "San Gregorio de Nigua", "Villa Altagracia", "Yaguate"],
    "San José de Ocoa": ["San José de Ocoa", "Rancho Arriba", "Sabana Larga"],
    "San Juan": ["San Juan de la Maguana", "Bohechío", "El Cercado", "Juan de Herrera", "Las Matas de Farfán", "Vallejuelo"],
    "San Pedro de Macorís": ["San Pedro de Macorís", "Consuelo", "Guayacanes", "Quisqueya", "Ramón Santana", "San José de los Llanos"],
    "Sánchez Ramírez": ["Cotuí", "Cevicos", "Fantino", "La Mata"],
    "Santiago": ["Santiago de los Caballeros", "Bisonó", "Jánico", "Licey al Medio", "Puñal", "Sabana Iglesia", "San José de las Matas", "Tamboril", "Villa González"],
    "Santiago Rodríguez": ["San Ignacio de Sabaneta", "Los Almácigos", "Monción"],
    "Valverde": ["Mao", "Esperanza", "Laguna Salada"],
    "Santo Domingo": ["Santo Domingo Este", "Santo Domingo Norte", "Santo Domingo Oeste", "Boca Chica", "Los Alcarrizos", "Pedro Brand", "San Antonio de Guerra"],
};


export const TAX_REGIMES = [
    "Régimen Ordinario de Tributación (ROT)",
    "Régimen Simplificado de Tributación (RST) - Compras",
    "Régimen Simplificado de Tributación (RST) - Ingresos",
    "Regímenes Especiales de Tributación (Ley)",
];

export const BUSINESS_SECTORS = [
    "Agropecuario",
    "Comercio al por mayor",
    "Comercio al por menor",
    "Construcción",
    "Educación",
    "Finanzas y Seguros",
    "Hotelería y Turismo",
    "Industria Manufacturera",
    "Salud y Asistencia Social",
    "Servicios Profesionales",
    "Tecnología y Comunicaciones",
    "Transporte y Almacenamiento",
    "Zonas Francas",
    "Otro",
];

export const EMPLOYEE_COUNTS = [
    "1 - 15",
    "16 - 60",
    "61 - 200",
    "201 - 500",
    "501+",
];

export const CURRENCIES = [
    { code: "DOP", name: "Peso Dominicano" },
    { code: "USD", name: "Dólar Estadounidense" },
    { code: "EUR", name: "Euro" },
];
