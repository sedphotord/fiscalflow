import { type z } from 'zod';
import { type Form606Schema, type Form607Schema } from './schemas';

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
