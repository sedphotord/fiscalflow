'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Report, UserSettings, Report606, Report607 } from '@/lib/types';
import { toast, useToast } from "@/hooks/use-toast"
import { Toaster } from '@/components/ui/toaster';

const APP_STATE_KEY = 'fiscalFlowAppState';

type AppState = {
  reports: Report[];
  settings: UserSettings;
};

type AppContextType = {
  reports: Report[];
  settings: UserSettings;
  theme: UserSettings['theme'];
  setTheme: (theme: UserSettings['theme']) => void;
  addReport: (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => void;
  updateReport: (id: string, reportData: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => Report | undefined;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  showToast: typeof toast;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
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

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
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
  });
  
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const theme = appState.settings.theme;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [appState.settings.theme]);


  const addReport = useCallback((reportData: Omit<Report, 'id' | 'fechaCreacion'>) => {
    const newReport: Report = {
        ...reportData,
        id: crypto.randomUUID(),
        fechaCreacion: new Date().toISOString(),
    } as Report;
    setAppState({ ...appState, reports: [newReport, ...appState.reports] });
  }, [appState, setAppState]);

  const updateReport = useCallback((id: string, reportData: Partial<Report>) => {
    setAppState({
      ...appState,
      reports: appState.reports.map(r => r.id === id ? { ...r, ...reportData } : r),
    });
  }, [appState, setAppState]);

  const deleteReport = useCallback((id: string) => {
    setAppState({ ...appState, reports: appState.reports.filter(r => r.id !== id) });
  }, [appState, setAppState]);

  const getReport = useCallback((id: string) => {
    return appState.reports.find(r => r.id === id);
  }, [appState.reports]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setAppState({ ...appState, settings: { ...appState.settings, ...newSettings } });
  }, [appState, setAppState]);
  
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    updateSettings({ theme });
  }, [updateSettings]);
  
  const value = {
    reports: appState.reports,
    settings: appState.settings,
    theme: appState.settings.theme,
    setTheme,
    addReport,
    updateReport,
    deleteReport,
    getReport,
    updateSettings,
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
