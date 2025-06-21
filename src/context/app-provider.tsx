
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, UserSettings, Company, AppContextType } from '@/lib/types';
import { type toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from '@/components/ui/toaster';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

// Mock user ID until authentication is added
const MOCK_USER_ID = 'default-user';

// Mock data to use as a fallback if Firestore connection fails
const MOCK_REPORTS: Report[] = [
    // @ts-ignore
    { id: 'mock-606-1', type: '606', rnc: '131999999', periodo: '202404', estado: 'Completado', fechaCreacion: new Date().toISOString(), compras: [] },
    // @ts-ignore
    { id: 'mock-607-1', type: '607', rnc: '131999999', periodo: '202404', estado: 'Borrador', fechaCreacion: new Date(Date.now() - 86400000).toISOString(), ventas: [] },
];
const MOCK_COMPANIES: Company[] = [
    { id: 'mock-comp-1', name: 'Cliente de Muestra', rnc: '101000001' }
];

type AppState = {
  reports: Report[];
  settings: UserSettings;
  companies: Company[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultInitialState: AppState = {
    reports: [],
    settings: { name: 'Usuario Demo', rnc: '131999999', theme: 'system' },
    companies: [],
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState<AppState>(defaultInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch initial data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!db) {
        console.warn("Firestore is not initialized. Running in offline mode.");
        toast({
          variant: 'destructive',
          title: 'Modo sin Conexión',
          description: 'No se pudo conectar a Firebase. La app se ejecutará con datos de muestra.',
          duration: 999999,
        });
        setAppState({
            settings: defaultInitialState.settings,
            companies: MOCK_COMPANIES,
            reports: MOCK_REPORTS,
        });
        setIsLoading(false);
        return;
      }
      try {
        
        // ---- DEBUG: Add snapshot listener to test connection ----
        const debugDocRef = doc(db, 'users', MOCK_USER_ID);
        console.log("Setting up snapshot listener for debugging...");
        const unsubscribe = onSnapshot(debugDocRef, 
          (doc) => {
            console.log("DEBUG: Snapshot data received:", doc.data());
            toast({ title: '¡Conexión Exitosa!', description: 'Snapshot de Firestore recibido correctamente.' });
          }, 
          (error) => {
            console.error("DEBUG: Error with snapshot listener:", error);
            toast({ variant: 'destructive', title: 'Error de Snapshot', description: `No se pudo establecer el listener en tiempo real. Código: ${error.code}` });
          }
        );
        // ---- END DEBUG ----

        const userRef = doc(db, 'users', MOCK_USER_ID);
        const companiesRef = collection(userRef, 'companies');
        const reportsRef = collection(userRef, 'reports');

        // Fetch settings
        const userDoc = await getDoc(userRef);
        let settings = defaultInitialState.settings;
        if (userDoc.exists()) {
            settings = { ...settings, ...userDoc.data() };
        } else {
            // If settings don't exist for the user, create them
            await setDoc(userRef, settings);
        }

        // Fetch companies
        const companiesSnapshot = await getDocs(companiesRef);
        const companies = companiesSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Company));
        
        // Fetch reports, ordered by creation date
        const reportsQuery = query(reportsRef, orderBy('fechaCreacion', 'desc'));
        const reportsSnapshot = await getDocs(reportsQuery);
        const reports = reportsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));

        setAppState({ settings, companies, reports });

      } catch (error: any) {
        const errorCode = error.code || 'desconocido';
        
        console.error(`Código de error de Firebase: ${errorCode}`);
        
        toast({
          variant: 'destructive',
          title: `Error de Carga (Código: ${errorCode})`,
          description: 'No se pudo conectar a Firestore. Verifique su conexión y las reglas de seguridad de la base de datos.',
          duration: 999999,
        });
        // Fallback to mock data on error
        setAppState({
            settings: defaultInitialState.settings,
            companies: MOCK_COMPANIES,
            reports: MOCK_REPORTS,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se puede guardar el reporte.' });
        return;
    }
    const newReportData = {
        ...reportData,
        fechaCreacion: new Date().toISOString(),
    };
    try {
        const userRef = doc(db, 'users', MOCK_USER_ID);
        const reportsRef = collection(userRef, 'reports');
        const docRef = await addDoc(reportsRef, newReportData);
        const newReport = { ...newReportData, id: docRef.id } as Report;
        setAppState(prev => ({ ...prev, reports: [newReport, ...prev.reports] }));
    } catch (error) {
        console.error("Error adding report to Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el reporte.' });
    }
  }, [toast]);

  const updateReport = useCallback(async (id: string, reportData: Partial<Report>) => {
    if (!db) {
        toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se puede actualizar el reporte.' });
        return;
    }
     try {
        const reportRef = doc(db, 'users', MOCK_USER_ID, 'reports', id);
        await updateDoc(reportRef, reportData);
        setAppState(prev => ({
            ...prev,
            reports: prev.reports.map(r => r.id === id ? { ...r, ...reportData } as Report : r),
        }));
    } catch (error) {
        console.error("Error updating report in Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el reporte.' });
    }
  }, [toast]);

  const deleteReport = useCallback(async (id: string) => {
    if (!db) {
      toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se puede eliminar el reporte.' });
      return;
    }
    try {
        const reportRef = doc(db, 'users', MOCK_USER_ID, 'reports', id);
        await deleteDoc(reportRef);
        setAppState(prev => ({ ...prev, reports: prev.reports.filter(r => r.id !== id) }));
    } catch (error) {
        console.error("Error deleting report from Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar el reporte.' });
    }
  }, [toast]);

  const getReport = useCallback((id: string) => {
    return appState.reports.find(r => r.id === id);
  }, [appState.reports]);

  const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    if (!db) {
       toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se pueden guardar los ajustes.' });
       // Still update local state in offline mode
       setAppState(prev => ({ ...prev, settings: {...prev.settings, ...newSettings} }));
       return;
    };
    const updatedSettings = { ...appState.settings, ...newSettings };
     try {
        const userRef = doc(db, 'users', MOCK_USER_ID);
        await setDoc(userRef, updatedSettings, { merge: true });
        setAppState(prev => ({ ...prev, settings: updatedSettings }));
    } catch (error) {
        console.error("Error updating settings in Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron guardar los ajustes.' });
    }
  }, [appState.settings, toast]);
  
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);

  const addCompany = useCallback(async (companyData: Omit<Company, 'id'>): Promise<Company | undefined> => {
    if (!db) {
      toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se puede agregar la empresa.' });
      return undefined;
    }
    try {
        const userRef = doc(db, 'users', MOCK_USER_ID);
        const companiesRef = collection(userRef, 'companies');
        const docRef = await addDoc(companiesRef, companyData);
        const newCompany: Company = { ...companyData, id: docRef.id };
        setAppState(prev => ({ ...prev, companies: [...prev.companies, newCompany] }));
        toast({ title: 'Empresa Agregada', description: `La empresa ${newCompany.name} ha sido agregada.` });
        return newCompany;
    } catch (error) {
        console.error("Error adding company to Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo agregar la empresa.' });
        return undefined;
    }
  }, [toast]);

  const updateCompany = useCallback(async (id: string, companyData: Partial<Omit<Company, 'id'>>) => {
    if (!db) {
       toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se puede actualizar la empresa.' });
       return;
    }
     try {
        const companyRef = doc(db, 'users', MOCK_USER_ID, 'companies', id);
        await updateDoc(companyRef, companyData);
        setAppState(prev => ({
            ...prev,
            companies: prev.companies.map(c => c.id === id ? { ...c, ...companyData } as Company : c),
        }));
        toast({ title: 'Empresa Actualizada', description: 'Los datos de la empresa han sido actualizados.' });
    } catch (error) {
        console.error("Error updating company in Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar la empresa.' });
    }
  }, [toast]);

  const deleteCompany = useCallback(async (id: string) => {
    if (!db) {
       toast({ variant: 'destructive', title: 'Error', description: 'Modo sin conexión. No se pudo eliminar la empresa.' });
       return;
    }
     try {
        const companyRef = doc(db, 'users', MOCK_USER_ID, 'companies', id);
        await deleteDoc(companyRef);
        setAppState(prev => ({ ...prev, companies: prev.companies.filter(c => c.id !== id) }));
        toast({ title: 'Empresa Eliminada', description: 'La empresa ha sido eliminada.' });
    } catch (error) {
        console.error("Error deleting company from Firestore:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo eliminar la empresa.' });
    }
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
