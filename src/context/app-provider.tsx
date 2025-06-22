
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, User, Company, TeamMember, AppContextType, UserPlan, TeamMemberRole, Plan, InvoicePack, CreateUserByAdminData, PlanData, InvoicePackData, TeamMemberData, SupportTicket, FormDefinition, FormDefinitionData } from '@/lib/types';
import { type toast as toastFn } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';
import { MOCK_USERS, MOCK_COMPANIES, MOCK_TEAM_MEMBERS, MOCK_REPORTS, MOCK_PLANS, MOCK_INVOICE_PACKS, MOCK_SUPPORT_TICKETS, MOCK_FORM_DEFINITIONS } from '@/lib/mock-db';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [invoicePacks, setInvoicePacks] = useState<InvoicePack[]>(MOCK_INVOICE_PACKS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [formDefinitions, setFormDefinitions] = useState<FormDefinition[]>(MOCK_FORM_DEFINITIONS);
  
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

  // --- Support Ticket Management ---
  const addSupportTicket = useCallback((ticketData: { id: string; subject: string; message: string; response: string; }) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'Abierto',
      createdAt: new Date().toISOString(),
    };
    setSupportTickets(prev => [newTicket, ...prev]);
  }, [currentUser]);
  
  // --- Team Management ---
    const addTeamMember = useCallback((memberData: TeamMemberData) => {
    const newMember: TeamMember = {
      name: memberData.name,
      email: memberData.email,
      role: memberData.role,
      id: `team-${Date.now()}`,
      ownerId: currentUser.id,
      status: 'Activo',
      invoiceUsage: {
        current: 0,
        limit: memberData.invoiceLimit,
      }
    };
    setTeamMembers(prev => [...prev, newMember]);
    toast({ title: 'Miembro Añadido', description: `${memberData.name} ha sido añadido al equipo.` });
  }, [currentUser.id, toast]);
  
  const updateTeamMember = useCallback((id: string, memberData: Partial<TeamMemberData>) => {
    setTeamMembers(prev => prev.map(m => {
        if (m.id === id) {
            const updatedMember = { ...m, ...memberData };
            if (memberData.invoiceLimit !== undefined) {
              updatedMember.invoiceUsage = { ...m.invoiceUsage, limit: memberData.invoiceLimit };
            }
            return updatedMember;
        }
        return m;
    }));
    toast({ title: 'Miembro Actualizado' });
  }, [toast]);

  const deleteTeamMember = useCallback((id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
    toast({ title: 'Miembro Eliminado' });
  }, [toast]);

  const inviteTeamMember = useCallback((email: string, role: TeamMemberRole) => {
    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      ownerId: currentUser.id,
      name: `(Invitado)`,
      email: email,
      role: role,
      status: 'Pendiente',
      invoiceUsage: {
        current: 0,
        limit: 0, // Admin can update this later
      }
    };
    setTeamMembers(prev => [...prev, newMember]);
    toast({ title: 'Invitación Enviada', description: `Se ha enviado una invitación a ${email}.` });
  }, [currentUser.id, toast]);


  // --- Super Admin Functions ---
  const createUserByAdmin = useCallback((data: CreateUserByAdminData) => {
    const selectedPlan = plans.find(p => p.name === data.plan);
    if (!selectedPlan) {
      toast({ variant: 'destructive', title: 'Error', description: 'Plan seleccionado no válido.' });
      return;
    }
    
    // Create Owner User
    const ownerId = `user-${Date.now()}`;
    const newUser: User = {
      id: ownerId,
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
      teamMemberLimit: selectedPlan.teamMemberLimit + (data.additionalTeamMembers || 0),
      registeredAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    
    // Create Team Members
    if (data.teamMembers && data.teamMembers.length > 0) {
      const newTeamMembers = data.teamMembers.map(memberData => ({
        id: `team-${Date.now()}-${Math.random()}`,
        ownerId: ownerId,
        name: `Miembro ${memberData.email.split('@')[0]}`,
        email: memberData.email,
        role: memberData.role,
        status: 'Activo' as const,
        invoiceUsage: { current: 0, limit: 0 },
      }));
      setTeamMembers(prev => [...prev, ...newTeamMembers]);
    }

    toast({ title: 'Usuario y Equipo Creados', description: `Se ha creado el usuario ${data.name} con ${data.teamMembers?.length || 0} miembro(s).` });
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
      name: 'Nuevo Miembro',
      email,
      role,
      status: 'Pendiente',
      invoiceUsage: { current: 0, limit: 0 }
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

  // Form Definition Management
  const createFormDefinition = useCallback((data: FormDefinitionData) => {
    const newForm: FormDefinition = { 
      ...data, 
      id: `form-${Date.now()}`, 
      lastUpdatedAt: new Date().toISOString()
    };
    setFormDefinitions(prev => [...prev, newForm]);
    toast({ title: 'Formulario Creado', description: `El formulario ${data.name} ha sido creado.` });
  }, [toast]);

  const updateFormDefinition = useCallback((id: string, data: Partial<FormDefinitionData>) => {
    setFormDefinitions(prev => prev.map(f => f.id === id ? { ...f, ...data, lastUpdatedAt: new Date().toISOString() } as FormDefinition : f));
    toast({ title: 'Formulario Actualizado' });
  }, [toast]);

  const deleteFormDefinition = useCallback((id: string) => {
    setFormDefinitions(prev => prev.filter(f => f.id !== id));
    toast({ title: 'Formulario Eliminado' });
  }, [toast]);

  const value: AppContextType = {
    reports,
    currentUser,
    users,
    companies,
    teamMembers: teamMembers,
    plans,
    invoicePacks,
    supportTickets,
    formDefinitions,
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
    addSupportTicket,
    // User functions
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    inviteTeamMember,
    // Super Admin functions
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
    createFormDefinition,
    updateFormDefinition,
    deleteFormDefinition,
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
