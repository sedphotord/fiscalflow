
import { type z } from 'zod';
import { type Form606Schema, type Form607Schema, type AdminCreateUserSchema, type PlanSchema, type InvoicePackSchema } from './schemas';
import { type toast } from '@/hooks/use-toast';
import { TEAM_ROLES } from './constants';

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

export type UserPlan = 'Gratis' | 'Pro' | 'Despacho';
export type UserStatus = 'Activo' | 'Pago pendiente' | 'Cancelado';
export type TeamMemberRole = typeof TEAM_ROLES[number]['id'];

export type User = {
    id: string;
    name: string;
    rnc: string;
    email: string;
    theme: 'light' | 'dark' | 'system';
    plan: UserPlan;
    status: UserStatus;
    invoiceUsage: {
        current: number;
        limit: number;
    };
    teamMemberLimit: number;
    registeredAt: string;
};

export type Company = {
    id: string;
    ownerId: string; // ID of the user who owns/manages this company
    name: string;
    rnc: string;
    email?: string;
    whatsapp?: string;
};

export type TeamMember = {
    id: string;
    ownerId: string; // ID of the user who invited this member
    email: string;
    role: TeamMemberRole;
    status: 'Activo' | 'Pendiente';
};

export type Plan = {
    id: string;
    name: string;
    price: number;
    invoiceLimit: number;
    teamMemberLimit: number;
    description?: string;
    features: string[];
};

export type InvoicePack = z.infer<typeof InvoicePackSchema> & { id: string };
export type CreateUserByAdminData = z.infer<typeof AdminCreateUserSchema>;
export type PlanData = Omit<Plan, 'id'>;
export type InvoicePackData = z.infer<typeof InvoicePackSchema>;


export type AppContextType = {
  reports: Report[];
  currentUser: User;
  users: User[]; // For super-admin view
  companies: Company[];
  teamMembers: TeamMember[]; // All team members for all users
  plans: Plan[];
  invoicePacks: InvoicePack[];
  theme: User['theme'];
  setTheme: (theme: User['theme']) => void;
  addReport: (reportData: Omit<Report, 'id' | 'fechaCreacion'>) => void;
  updateReport: (id: string, reportData: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => Report | undefined;
  updateCurrentUser: (newSettings: Partial<User>) => void;
  addCompany: (companyData: Omit<Company, 'id' | 'ownerId'>) => Promise<Company | undefined>;
  updateCompany: (id: string, companyData: Partial<Omit<Company, 'id'>>) => void;
  deleteCompany: (id: string) => void;
  showToast: typeof toast;
  // User functions
  inviteTeamMember: (email: string, role: TeamMemberRole) => void;
  deleteTeamMember: (id: string) => void;
  // Super Admin functions
  createUserByAdmin: (data: CreateUserByAdminData) => void;
  updateUserPlan: (userId: string, plan: UserPlan) => void;
  assignInvoices: (userId: string, amount: number) => void;
  getAllCompaniesForUser: (userId: string) => Company[];
  getTeamMembersForUser: (userId: string) => TeamMember[];
  updateUser: (userId: string, data: Partial<User>) => void;
  inviteTeamMemberForUser: (userId: string, email: string, role: TeamMemberRole) => void;
  createPlan: (data: PlanData) => void;
  updatePlan: (id: string, data: PlanData) => void;
  deletePlan: (id: string) => void;
  createInvoicePack: (data: InvoicePackData) => void;
  updateInvoicePack: (id: string, data: InvoicePackData) => void;
  deleteInvoicePack: (id: string) => void;
};
