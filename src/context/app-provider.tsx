
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Report, User, Company, TeamMember, AppContextType, UserPlan, TeamMemberRole } from '@/lib/types';
import { type toast as toastFn } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Usuario Principal', rnc: '987654321', email: 'usuario.demo@fiscalflow.app', theme: 'system', plan: 'Pro', status: 'Activo', invoiceUsage: { current: 120, limit: 500 }, registeredAt: new Date('2023-01-15').toISOString() },
    { id: 'user-2', name: 'Empresa ABC', rnc: '131223344', email: 'contacto@empresa-abc.com', theme: 'light', plan: 'Despacho', status: 'Activo', invoiceUsage: { current: 1500, limit: 10000 }, registeredAt: new Date('2022-11-20').toISOString() },
    { id: 'user-3', name: 'Juan Perez', rnc: '40212345678', email: 'juan.perez@email.com', theme: 'dark', plan: 'Gratis', status: 'Activo', invoiceUsage: { current: 25, limit: 50 }, registeredAt: new Date('2024-03-10').toISOString() },
    { id: 'user-4', name: 'Consultores RD', rnc: '101000001', email: 'info@consultores.do', theme: 'system', plan: 'Pro', status: 'Pago pendiente', invoiceUsage: { current: 501, limit: 500 }, registeredAt: new Date('2023-08-01').toISOString() },
    { id: 'user-5', name: 'Ex-Cliente S.A.', rnc: '111222333', email: 'baja@excliente.com', theme: 'light', plan: 'Pro', status: 'Cancelado', invoiceUsage: { current: 0, limit: 500 }, registeredAt: new Date('2023-05-05').toISOString() },
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
const mockReports: Report[] = [
    // @ts-ignore
    { id: 'rep-1', type: '606', rnc: '987654321', periodo: '202312', estado: 'Completado', fechaCreacion: new Date('2023-12-28').toISOString(), compras: [{ rncCedula: '111222333', tipoId: '1', tipoBienesServicios: '09', ncf: 'B0100000001', fechaComprobante: '2023-12-15', fechaPago: '2023-12-15', montoFacturado: 5000, itbisFacturado: 900, formaPago: 'credito' }] },
    // @ts-ignore
    { id: 'rep-2', type: '607', rnc: '987654321', periodo: '202312', estado: 'Borrador', fechaCreacion: new Date('2023-12-27').toISOString(), ventas: [{ rncCedula: '444555666', tipoId: '1', ncf: 'B0100000002', fechaComprobante: '2023-12-20', montoFacturado: 12000, itbisFacturado: 2160 }] },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [reports, setReports] = useState<Report[]>(mockReports);
  
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
  const updateUserPlan = useCallback((userId: string, plan: UserPlan) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan } : u));
    toast({ title: 'Plan de Usuario Actualizado' });
  }, [toast]);

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

  const value: AppContextType = {
    reports,
    currentUser,
    users,
    companies,
    teamMembers: teamMembers.filter(tm => tm.ownerId === currentUser.id),
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
    updateUserPlan,
    assignInvoices,
    getAllCompaniesForUser,
    getTeamMembersForUser,
    updateUser,
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
