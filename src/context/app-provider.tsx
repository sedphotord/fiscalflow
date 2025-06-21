
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import type { Report, UserSettings, Company, AppContextType } from '@/lib/types';
import { type toast as toastFn } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { Loader2 } from 'lucide-react';

// --- DEFAULT STATES ---
const defaultSettings: UserSettings = { name: 'Nuevo Usuario', rnc: '', theme: 'system' };
const defaultInitialState = {
    reports: [] as Report[],
    settings: defaultSettings,
    companies: [] as Company[],
};

// --- MOCK DATA FOR OFFLINE/DEBUG MODE ---
const mockSettings: UserSettings = { name: 'Usuario (Modo Sin Conexión)', rnc: '987654321', theme: 'system' };
const mockCompanies: Company[] = [
    { id: 'comp-1', name: 'Cliente de Ejemplo', rnc: '101000001', email: 'cliente@ejemplo.com', whatsapp: '+18095551234' },
];
const mockReports: Report[] = [
    // @ts-ignore
    { id: 'rep-1', type: '606', rnc: '987654321', periodo: '202312', estado: 'Completado', fechaCreacion: new Date('2023-12-28').toISOString(), compras: [{ rncCedula: '111222333', tipoId: '1', tipoBienesServicios: '09', ncf: 'B0100000001', fechaComprobante: '2023-12-15', fechaPago: '2023-12-15', montoFacturado: 5000, itbisFacturado: 900, formaPago: 'credito' }] },
    // @ts-ignore
    { id: 'rep-2', type: '607', rnc: '987654321', periodo: '202312', estado: 'Borrador', fechaCreacion: new Date('2023-12-27').toISOString(), ventas: [{ rncCedula: '444555666', tipoId: '1', ncf: 'B0100000002', fechaComprobante: '2023-12-20', montoFacturado: 12000, itbisFacturado: 2160 }] },
];
const mockInitialState = {
    reports: mockReports,
    settings: mockSettings,
    companies: mockCompanies,
};


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState(defaultInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!db);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
        if (!db) {
            console.warn("Firebase no está disponible. Entrando en modo sin conexión.");
            setAppState(mockInitialState);
            setIsOffline(true);
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Modo Sin Conexión Activado",
                description: "No se pudo conectar a la base de datos. Se están usando datos de muestra.",
                duration: 9000,
            });
            return;
        }

        try {
            setIsLoading(true);
            const settingsDocRef = doc(db, 'settings', 'main-profile');
            const companiesQuery = query(collection(db, 'companies'), orderBy('name'));
            const reportsQuery = query(collection(db, 'reports'), orderBy('fechaCreacion', 'desc'));

            const [settingsSnap, companiesSnap, reportsSnap] = await Promise.all([
                getDoc(settingsDocRef),
                getDocs(companiesQuery),
                getDocs(reportsQuery),
            ]);

            const settings = settingsSnap.exists() ? (settingsSnap.data() as UserSettings) : defaultSettings;
            const companies = companiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Company[];
            const reports = reportsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Report[];
            
            setAppState({ settings, companies, reports });
            setIsOffline(false);

        } catch (error) {
            console.error("Error al cargar datos de Firebase:", error);
            setAppState(mockInitialState);
            setIsOffline(true);
            toast({
                variant: "destructive",
                title: "Error de Conexión",
                description: "No se pudieron cargar los datos. Revisa la consola para más detalles.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
  }, [toast]);

  useEffect(() => {
    if (isLoading) return;
    const root = window.document.documentElement;
    const theme = appState.settings.theme;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [appState.settings.theme, isLoading]);

  const addReport = useCallback(async (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'El reporte no se puede guardar.' });
        return;
    }
    const newReportData = { ...reportData, fechaCreacion: new Date().toISOString() };
    const docRef = await addDoc(collection(db, 'reports'), newReportData);
    const newReport = { ...newReportData, id: docRef.id } as Report;
    setAppState(prev => ({ ...prev, reports: [newReport, ...prev.reports] }));
    toast({ title: 'Reporte Guardado' });
  }, [isOffline, toast]);

  const updateReport = useCallback(async (id: string, reportData: Partial<Report>) => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'El reporte no se puede actualizar.' });
        return;
    }
    const reportRef = doc(db, 'reports', id);
    await updateDoc(reportRef, reportData);
    setAppState(prev => ({
        ...prev,
        reports: prev.reports.map(r => r.id === id ? { ...r, ...reportData } as Report : r),
    }));
    toast({ title: 'Reporte Actualizado' });
  }, [isOffline, toast]);

  const deleteReport = useCallback(async (id: string) => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'El reporte no se puede eliminar.' });
        return;
    }
    await deleteDoc(doc(db, 'reports', id));
    setAppState(prev => ({ ...prev, reports: prev.reports.filter(r => r.id !== id) }));
    toast({ title: 'Reporte Eliminado' });
  }, [isOffline, toast]);

  const getReport = useCallback((id: string) => {
    return appState.reports.find(r => r.id === id);
  }, [appState.reports]);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...appState.settings, ...newSettings };
    if (!isOffline) {
        await setDoc(doc(db, 'settings', 'main-profile'), updatedSettings);
    }
    setAppState(prev => ({ ...prev, settings: updatedSettings }));
    if (!isOffline) toast({ title: 'Ajustes Guardados' });
  }, [appState.settings, isOffline, toast]);
  
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);

  const addCompany = useCallback(async (companyData: Omit<Company, 'id'>): Promise<Company | undefined> => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'La empresa no se puede guardar.' });
        return undefined;
    }
    const docRef = await addDoc(collection(db, 'companies'), companyData);
    const newCompany = { ...companyData, id: docRef.id };
    setAppState(prev => ({ ...prev, companies: [...prev.companies, newCompany] }));
    toast({ title: 'Empresa Agregada' });
    return newCompany;
  }, [isOffline, toast]);

  const updateCompany = useCallback(async (id: string, companyData: Partial<Omit<Company, 'id'>>) => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'La empresa no se puede actualizar.' });
        return;
    }
     await updateDoc(doc(db, 'companies', id), companyData);
     setAppState(prev => ({
        ...prev,
        companies: prev.companies.map(c => c.id === id ? { ...c, ...companyData } as Company : c),
    }));
    toast({ title: 'Empresa Actualizada' });
  }, [isOffline, toast]);

  const deleteCompany = useCallback(async (id: string) => {
    if (isOffline) {
        toast({ title: 'Modo sin conexión', description: 'La empresa no se puede eliminar.' });
        return;
    }
     await deleteDoc(doc(db, 'companies', id));
     setAppState(prev => ({ ...prev, companies: prev.companies.filter(c => c.id !== id) }));
     toast({ title: 'Empresa Eliminada' });
  }, [isOffline, toast]);
  
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
