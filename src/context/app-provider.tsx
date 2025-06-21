
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, UserSettings, Company, AppContextType } from '@/lib/types';
import { type toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

// --- MOCK DATA FOR DEBUGGING MODE ---
const mockSettings: UserSettings = { name: 'Usuario (Modo Depuración)', rnc: '987654321', theme: 'system' };
const mockCompanies: Company[] = [
    { id: 'comp-1', name: 'Cliente de Ejemplo (Depuración)', rnc: '101000001', email: 'cliente@ejemplo.com', whatsapp: '+18095551234' },
];
const mockReports: Report[] = [
    // @ts-ignore
    { id: 'rep-1', type: '606', rnc: '987654321', periodo: '202312', estado: 'Completado', fechaCreacion: new Date('2023-12-28').toISOString(), compras: [{ rncCedula: '111222333', tipoId: '1', tipoBienesServicios: '09', ncf: 'B0100000001', fechaComprobante: '2023-12-15', fechaPago: '2023-12-15', montoFacturado: 5000, itbisFacturado: 900, formaPago: 'credito' }] },
    // @ts-ignore
    { id: 'rep-2', type: '607', rnc: '987654321', periodo: '202312', estado: 'Borrador', fechaCreacion: new Date('2023-12-27').toISOString(), ventas: [{ rncCedula: '444555666', tipoId: '1', ncf: 'B0100000002', fechaComprobante: '2023-12-20', montoFacturado: 12000, itbisFacturado: 2160 }] },
];

const defaultInitialState = {
    reports: mockReports,
    settings: mockSettings,
    companies: mockCompanies,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState(defaultInitialState);
  const [isLoading, setIsLoading] = useState(false); // No loading needed for mock data
  const { toast } = useToast();

  useEffect(() => {
    toast({
        title: "Modo de Depuración Activo",
        description: "La conexión con Firebase está deshabilitada. Usando datos de muestra.",
        duration: 5000,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // This effect is only for setting the theme, it's safe.
    const root = window.document.documentElement;
    const theme = appState.settings.theme;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [appState.settings.theme]);

  const addReport = useCallback(async (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => {
    const newReport = {
        ...reportData,
        id: crypto.randomUUID(),
        fechaCreacion: new Date().toISOString(),
    } as Report;
    setAppState(prev => ({ ...prev, reports: [newReport, ...prev.reports] }));
    toast({ title: 'Reporte Agregado (Modo Depuración)' });
  }, [toast]);

  const updateReport = useCallback(async (id: string, reportData: Partial<Report>) => {
    setAppState(prev => ({
        ...prev,
        reports: prev.reports.map(r => r.id === id ? { ...r, ...reportData } as Report : r),
    }));
    toast({ title: 'Reporte Actualizado (Modo Depuración)' });
  }, [toast]);

  const deleteReport = useCallback(async (id: string) => {
    setAppState(prev => ({ ...prev, reports: prev.reports.filter(r => r.id !== id) }));
    toast({ title: 'Reporte Eliminado (Modo Depuración)' });
  }, [toast]);

  const getReport = useCallback((id: string) => {
    return appState.reports.find(r => r.id === id);
  }, [appState.reports]);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    setAppState(prev => ({ ...prev, settings: {...prev.settings, ...newSettings} }));
    toast({ title: 'Ajustes Actualizados (Modo Depuración)' });
  }, [toast]);
  
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);

  const addCompany = useCallback(async (companyData: Omit<Company, 'id'>): Promise<Company | undefined> => {
    const newCompany: Company = { ...companyData, id: crypto.randomUUID() };
    setAppState(prev => ({ ...prev, companies: [...prev.companies, newCompany] }));
    toast({ title: 'Empresa Agregada (Modo Depuración)' });
    return newCompany;
  }, [toast]);

  const updateCompany = useCallback(async (id: string, companyData: Partial<Omit<Company, 'id'>>) => {
     setAppState(prev => ({
        ...prev,
        companies: prev.companies.map(c => c.id === id ? { ...c, ...companyData } as Company : c),
    }));
    toast({ title: 'Empresa Actualizada (Modo Depuración)' });
  }, [toast]);

  const deleteCompany = useCallback(async (id: string) => {
     setAppState(prev => ({ ...prev, companies: prev.companies.filter(c => c.id !== id) }));
     toast({ title: 'Empresa Eliminada (Modo Depuración)' });
  }, [toast]);
  
  const value: AppContextType = {
    reports: appState.reports,
    settings: appState.settings,
    companies: appState.companies,
    theme: appState.settings.theme,
    setTheme,
    addReport,
    updateReport,
    deleteReport,
    getReport,
    updateSettings,
    addCompany,
    updateCompany,
    deleteCompany,
    showToast: toast,
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
