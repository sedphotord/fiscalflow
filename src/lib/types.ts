import { type z } from 'zod';
import { type Form606Schema, type Form607Schema } from './schemas';
import { type toast } from '@/hooks/use-toast';

export type Report606 = z.infer<typeof Form606Schema> & {
    id: string;
    type: '606';
    fechaCreacion: string;
    estado: 'Completado' | 'Borrador';
};

export type Report607 = z.infer<typeof Form607Schema> & {
    id: string;
    type: '607';
    fechaCreacion: string;
    estado: 'Completado' | 'Borrador';
};

export type Report = Report606 | Report607;

export type UserSettings = {
    name: string;
    rnc: string;
    theme: 'light' | 'dark' | 'system';
};

export type Company = {
    id: string;
    name: string;
    rnc: string;
};

export type AppContextType = {
  reports: Report[];
  settings: UserSettings;
  companies: Company[];
  theme: UserSettings['theme'];
  setTheme: (theme: UserSettings['theme']) => void;
  addReport: (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => void;
  updateReport: (id: string, reportData: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => Report | undefined;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  addCompany: (companyData: Omit<Company, 'id'>) => Company;
  updateCompany: (id: string, companyData: Partial<Omit<Company, 'id'>>) => void;
  deleteCompany: (id: string) => void;
  showToast: typeof toast;
};
