
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, User, Company, TeamMember, AppContextType, UserPlan, TeamMemberRole, Plan, InvoicePack, CreateUserByAdminData, PlanData, InvoicePackData } from '@/lib/types';
import { type toast as toastFn } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Usuario Principal', rnc: '987654321', email: 'usuario.demo@fiscalflow.app', theme: 'system', plan: 'Pro', status: 'Activo', invoiceUsage: { current: 120, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-01-15').toISOString() },
    { id: 'user-2', name: 'Empresa ABC', rnc: '131223344', email: 'contacto@empresa-abc.com', theme: 'light', plan: 'Despacho', status: 'Activo', invoiceUsage: { current: 1500, limit: 10000 }, teamMemberLimit: 50, registeredAt: new Date('2022-11-20').toISOString() },
    { id: 'user-3', name: 'Juan Perez', rnc: '40212345678', email: 'juan.perez@email.com', theme: 'dark', plan: 'Gratis', status: 'Activo', invoiceUsage: { current: 25, limit: 50 }, teamMemberLimit: 1, registeredAt: new Date('2024-03-10').toISOString() },
    { id: 'user-4', name: 'Consultores RD', rnc: '101000001', email: 'info@consultores.do', theme: 'system', plan: 'Pro', status: 'Pago pendiente', invoiceUsage: { current: 501, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-08-01').toISOString() },
    { id: 'user-5', name: 'Ex-Cliente S.A.', rnc: '111222333', email: 'baja@excliente.com', theme: 'light', plan: 'Pro', status: 'Cancelado', invoiceUsage: { current: 0, limit: 500 }, teamMemberLimit: 5, registeredAt: new Date('2023-05-05').toISOString() },
];
const MOCK_COMPANIES: Company[] = [
    { id: 'comp-1', ownerId: 'user-1', name: 'Mi Propia Empresa', rnc: '987654321', email: 'usuario.demo@fiscalflow.app' },
    { id: 'comp-2', ownerId: 'user-1', name: 'Cliente de Ejemplo', rnc: '101000001', email: 'cliente@ejemplo.com', whatsapp: '+18095551234' },
    { id: 'comp-3', ownerId: 'user-2', name: 'Empresa ABC', rnc: '131223344', email: 'contacto@empresa-abc.com' },
];
const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'team-1', ownerId: 'user-1', email: 'asistente@fiscalflow.app', role: 'Editor', status: 'Activo' },
    { id: 'team-2', ownerId: 'user-1', email: 'nuevo.empleado@email.com', role: 'Solo Lectura', status: 'Pendiente' },
    { id: 'team-3', ownerId: 'user-2', email: 'socio@empresa-abc.com', role: 'Admin', status: 'Activo' },
];
const MOCK_REPORTS: Report[] = [
    // @ts-ignore
    { id: 'rep-1', type: '606', rnc: '987654321', periodo: '202312', estado: 'Completado', fechaCreacion: new Date('2023-12-28').toISOString(), compras: [{ rncCedula: '111222333', tipoId: '1', tipoBienesServicios: '09', ncf: 'B0100000001', fechaComprobante: '2023-12-15', fechaPago: '2023-12-15', montoFacturado: 5000, itbisFacturado: 900, formaPago: 'credito' }] },
    // @ts-ignore
    { id: 'rep-2', type: '607', rnc: '987654321', periodo: '202312', estado: 'Borrador', fechaCreacion: new Date('2023-12-27').toISOString(), ventas: [{ rncCedula: '444555666', tipoId: '1', ncf: 'B0100000002', fechaComprobante: '2023-12-20', montoFacturado: 12000, itbisFacturado: 2160 }] },
];
const MOCK_PLANS: Plan[] = [
    { id: 'plan-1', name: 'Gratis', price: 0, invoiceLimit: 50, teamMemberLimit: 1 },
    { id: 'plan-2', name: 'Pro', price: 2500, invoiceLimit: 500, teamMemberLimit: 5 },
    { id: 'plan-3', name: 'Despacho', price: 6500, invoiceLimit: 10000, teamMemberLimit: 50 },
];
const MOCK_INVOICE_PACKS: InvoicePack[] = [
    { id: 'pack-1', amount: 50, price: 1000 },
    { id: 'pack-2', amount: 100, price: 1500 },
    { id: 'pack-3', amount: 200, price: 2500 },
];


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [invoicePacks, setInvoicePacks] = useState<InvoicePack[]>(MOCK_INVOICE_PACKS);
  
  const [isLoading, setIsLoading] = useState(false); // Simplified loading
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, you would fetch data here. We are using mock data.
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const root = window.document.documentElement;
    const theme = currentUser.theme;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [currentUser.theme, isLoading]);
  
  const updateCurrentUser = useCallback(async (newSettings: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...newSettings }));
    // Also update the user in the main users list
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? { ...u, ...newSettings } : u));
    toast({ title: 'Ajustes Guardados' });
  }, [currentUser.id, toast]);
  
  const setTheme = useCallback((theme: User['theme']) => {
    updateCurrentUser({ theme });
  }, [updateCurrentUser]);

  // --- Report Management ---
  const addReport = useCallback(async (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => {
    const newReport = { ...reportData, id: `rep-${Date.now()}`, fechaCreacion: new Date().toISOString() } as Report;
    setReports(prev => [newReport, ...prev]);
    toast({ title: 'Reporte Guardado' });
  }, [toast]);

  const updateReport = useCallback(async (id: string, reportData: Partial<Report>) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, ...reportData } as Report : r));
    toast({ title: 'Reporte Actualizado' });
  }, [toast]);

  const deleteReport = useCallback(async (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast({ title: 'Reporte Eliminado' });
  }, [toast]);

  const getReport = useCallback((id: string) => reports.find(r => r.id === id), [reports]);

  // --- Company Management ---
  const addCompany = useCallback(async (companyData: Omit<Company, 'id' | 'ownerId'>): Promise<Company | undefined> => {
    const newCompany: Company = { ...companyData, id: `comp-${Date.now()}`, ownerId: currentUser.id };
    setCompanies(prev => [...prev, newCompany].sort((a,b) => a.name.localeCompare(b.name)));
    toast({ title: 'Empresa Agregada' });
    return newCompany;
  }, [currentUser.id, toast]);

  const updateCompany = useCallback(async (id: string, companyData: Partial<Omit<Company, 'id'>>) => {
     setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...companyData } as Company : c).sort((a,b) => a.name.localeCompare(b.name)));
     toast({ title: 'Empresa Actualizada' });
  }, [toast]);

  const deleteCompany = useCallback(async (id: string) => {
     setCompanies(prev => prev.filter(c => c.id !== id));
     toast({ title: 'Empresa Eliminada' });
  }, [toast]);
  
  // --- Team Management ---
  const inviteTeamMember = useCallback((email: string, role: TeamMemberRole) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      ownerId: currentUser.id,
      email,
      role,
      status: 'Pendiente'
    };
    setTeamMembers(prev => [...prev, newMember]);
    toast({ title: 'Invitación Enviada', description: `Se ha invitado a ${email} a unirse a su equipo.` });
  }, [currentUser.id, toast]);

  const deleteTeamMember = useCallback((id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    toast({ title: 'Miembro Eliminado' });
  }, [toast]);

  // --- Super Admin Functions ---
  const createUserByAdmin = useCallback((data: CreateUserByAdminData) => {
    const selectedPlan = plans.find(p => p.name === data.plan);
    if (!selectedPlan) {
      toast({ variant: 'destructive', title: 'Error', description: 'Plan seleccionado no válido.' });
      return;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      rnc: '', // can be set later
      theme: 'system',
      plan: data.plan as UserPlan,
      status: 'Activo',
      invoiceUsage: {
        current: 0,
        limit: selectedPlan.invoiceLimit + (data.additionalInvoices || 0),
      },
      teamMemberLimit: data.teamMemberLimit,
      registeredAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    toast({ title: 'Usuario Creado', description: `Se ha creado el usuario ${data.name}.` });
  }, [toast, plans]);

  const updateUserPlan = useCallback((userId: string, planName: UserPlan) => {
    const planDetails = plans.find(p => p.name === planName);
    if (!planDetails) {
      toast({ variant: 'destructive', title: 'Error', description: 'Plan no encontrado.' });
      return;
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: planName, invoiceUsage: {...u.invoiceUsage, limit: planDetails.invoiceLimit } } : u));
    toast({ title: 'Plan de Usuario Actualizado' });
  }, [toast, plans]);

  const assignInvoices = useCallback((userId: string, amount: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, invoiceUsage: { ...u.invoiceUsage, limit: u.invoiceUsage.limit + amount } } : u));
    toast({ title: 'Facturas Asignadas', description: `Se asignaron ${amount} facturas adicionales al usuario.` });
  }, [toast]);

  const updateUser = useCallback((userId: string, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
    if (userId === currentUser.id) {
        setCurrentUser(prev => ({ ...prev, ...data }));
    }
    toast({ title: 'Usuario actualizado' });
  }, [currentUser.id, toast]);

  const getAllCompaniesForUser = useCallback((userId: string) => companies.filter(c => c.ownerId === userId), [companies]);
  const getTeamMembersForUser = useCallback((userId: string) => teamMembers.filter(tm => tm.ownerId === userId), [teamMembers]);

  const inviteTeamMemberForUser = useCallback((userId: string, email: string, role: TeamMemberRole) => {
     const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      ownerId: userId,
      email,
      role,
      status: 'Pendiente'
    };
    setTeamMembers(prev => [...prev, newMember]);
    toast({ title: 'Invitación Enviada', description: `Se ha invitado a ${email} al equipo.` });
  }, [toast]);

  // Plan Management
  const createPlan = useCallback((data: PlanData) => {
    const newPlan: Plan = { ...data, id: `plan-${Date.now()}` };
    setPlans(prev => [...prev, newPlan]);
    toast({ title: 'Plan Creado' });
  }, [toast]);

  const updatePlan = useCallback((id: string, data: PlanData) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    toast({ title: 'Plan Actualizado' });
  }, [toast]);

  const deletePlan = useCallback((id: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Plan Eliminado' });
  }, [toast]);

  // Invoice Pack Management
  const createInvoicePack = useCallback((data: InvoicePackData) => {
    const newPack: InvoicePack = { ...data, id: `pack-${Date.now()}` };
    setInvoicePacks(prev => [...prev, newPack]);
    toast({ title: 'Paquete Creado' });
  }, [toast]);

  const updateInvoicePack = useCallback((id: string, data: InvoicePackData) => {
    setInvoicePacks(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    toast({ title: 'Paquete Actualizado' });
  }, [toast]);

  const deleteInvoicePack = useCallback((id: string) => {
    setInvoicePacks(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Paquete Eliminado' });
  }, [toast]);


  const value: AppContextType = {
    reports,
    currentUser,
    users,
    companies,
    teamMembers: teamMembers.filter(tm => tm.ownerId === currentUser.id),
    plans,
    invoicePacks,
    theme: currentUser.theme,
    setTheme,
    addReport,
    updateReport,
    deleteReport,
    getReport,
    updateCurrentUser,
    addCompany,
    updateCompany,
    deleteCompany,
    showToast: toast,
    inviteTeamMember,
    deleteTeamMember,
    // Super admin functions
    createUserByAdmin,
    updateUserPlan,
    assignInvoices,
    getAllCompaniesForUser,
    getTeamMembersForUser,
    updateUser,
    inviteTeamMemberForUser,
    createPlan,
    updatePlan,
    deletePlan,
    createInvoicePack,
    updateInvoicePack,
    deleteInvoicePack,
  };

  if (isLoading) { 
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
