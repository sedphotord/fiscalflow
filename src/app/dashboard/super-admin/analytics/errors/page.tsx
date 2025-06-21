'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown, Filter } from 'lucide-react';

const mockErrors = [
  { id: 'err_1', code: 500, message: 'AI flow "extractInvoiceFlow" failed: Upstream API timeout.', path: '/api/genkit/flows/extractInvoiceFlow', count: 12, lastSeen: 'Hace 5 minutos' },
  { id: 'err_2', code: 401, message: 'Authentication failed for user: test@example.com', path: '/login', count: 3, lastSeen: 'Hace 1 hora' },
  { id: 'err_3', code: 429, message: 'Rate limit exceeded for DGII validation API.', path: '/api/dgii/validate', count: 88, lastSeen: 'Hace 3 horas' },
  { id: 'err_4', code: 502, message: 'Bad Gateway connecting to storage service.', path: '/api/upload', count: 2, lastSeen: 'Hace 1 día' },
  { id: 'err_5', code: 400, message: 'Zod validation failed: Invalid NCF format.', path: '/dashboard/compras/new', count: 25, lastSeen: 'Hace 2 días' },
];

const getBadgeVariant = (code: number) => {
  if (code >= 500) return 'destructive';
  if (code >= 400) return 'secondary';
  return 'outline';
};

export default function AdminErrorAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Análisis de Errores"
        description="Monitoree los errores de la aplicación y del sistema."
      >
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar por Fecha
            </Button>
            <Button>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar
            </Button>
        </div>
      </PageHeader>
      <Card>
        <CardHeader>
            <CardTitle>Registro de Errores</CardTitle>
            <CardDescription>Lista de los errores más recientes registrados en la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Mensaje</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead className="text-right">Conteo</TableHead>
                <TableHead className="text-right">Última Vez</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>
                    <Badge variant={getBadgeVariant(error.code)}>{error.code}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{error.message}</TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">{error.path}</TableCell>
                  <TableCell className="text-right">{error.count}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{error.lastSeen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
