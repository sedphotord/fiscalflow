'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, UserSettings, Company, AppContextType } from '@/lib/types';
import { toast, useToast } from "@/hooks/use-toast"
import { Toaster } from '@/components/ui/toaster';

const APP_STATE_KEY = 'fiscalFlowAppState';

type AppState = {
  reports: Report[];
  settings: UserSettings;
  companies: Company[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [appState, setAppState] = useLocalStorage<AppState>(APP_STATE_KEY, {
    reports: [],
    settings: { name: 'Usuario Demo', rnc: '131999999', theme: 'system' },
    companies: [
      { id: 'mock-1', name: 'Ferretería Don José', rnc: '130876543' },
      { id: 'mock-2', name: 'Colmado El Vecino', rnc: '131123456' },
    ],
  });
  
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    const theme = appState.settings.theme;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [appState.settings.theme, isMounted]);


  const addReport = useCallback((reportData: Omit<Report, 'id' | 'fechaCreacion'>) => {
    const newReport: Report = {
        ...reportData,
        id: crypto.randomUUID(),
        fechaCreacion: new Date().toISOString(),
    } as Report;
    setAppState(prev => ({ ...prev, reports: [newReport, ...prev.reports] }));
  }, [setAppState]);

  const updateReport = useCallback((id: string, reportData: Partial<Report>) => {
    setAppState(prev => ({
      ...prev,
      reports: prev.reports.map(r => r.id === id ? { ...r, ...reportData } : r),
    }));
  }, [setAppState]);

  const deleteReport = useCallback((id: string) => {
    setAppState(prev => ({ ...prev, reports: prev.reports.filter(r => r.id !== id) }));
  }, [setAppState]);

  const getReport = useCallback((id: string) => {
    return appState.reports.find(r => r.id === id);
  }, [appState.reports]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setAppState(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
  }, [setAppState]);
  
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);

  const addCompany = useCallback((companyData: Omit<Company, 'id'>): Company => {
    const newCompany: Company = {
        ...companyData,
        id: crypto.randomUUID(),
    };
    setAppState(prev => ({ ...prev, companies: [...prev.companies, newCompany] }));
    toast({ title: 'Empresa Agregada', description: `La empresa ${newCompany.name} ha sido agregada.` });
    return newCompany;
  }, [setAppState, toast]);

  const updateCompany = useCallback((id: string, companyData: Partial<Omit<Company, 'id'>>) => {
    setAppState(prev => ({
        ...prev,
        companies: prev.companies.map(c => c.id === id ? { ...c, ...companyData } : c),
    }));
    toast({ title: 'Empresa Actualizada', description: 'Los datos de la empresa han sido actualizados.' });
  }, [setAppState, toast]);

  const deleteCompany = useCallback((id: string) => {
    setAppState(prev => ({ ...prev, companies: prev.companies.filter(c => c.id !== id) }));
    toast({ title: 'Empresa Eliminada', description: 'La empresa ha sido eliminada.' });
  }, [setAppState, toast]);
  
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

  if (!isMounted) {
    return null; // or a loading spinner
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
