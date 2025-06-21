'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, Server, MoreHorizontal } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';
import type { Report, UserSettings } from '@/lib/types';

// Mock data to simulate a multi-user environment
const mockUsers: UserSettings[] = [
  { name: 'Empresa ABC SRL', rnc: '131223344', theme: 'light' },
  { name: 'Juan Perez', rnc: '00112345678', theme: 'dark' },
  { name: 'Contadores Asociados', rnc: '130987654', theme: 'system' },
];

const mockReports: Report[] = [
    // @ts-ignore
    { id: crypto.randomUUID(), type: '606', rnc: '131223344', periodo: '202304', estado: 'Completado', fechaCreacion: new Date('2023-05-10').toISOString(), compras: [] },
    // @ts-ignore
    { id: crypto.randomUUID(), type: '607', rnc: '00112345678', periodo: '202304', estado: 'Borrador', fechaCreacion: new Date('2023-05-11').toISOString(), ventas: [] },
    // @ts-ignore
    { id: crypto.randomUUID(), type: '606', rnc: '130987654', periodo: '202305', estado: 'Completado', fechaCreacion: new Date('2023-06-05').toISOString(), compras: [] },
];


export default function SuperAdminPage() {
  const { settings, reports } = useAppContext();

  const allUsers = useMemo(() => [settings, ...mockUsers], [settings]);
  const allReports = useMemo(() => [...reports, ...mockReports], [reports]);

  const getBadgeVariant = (estado: Report['estado']) => {
    switch (estado) {
      case 'Completado':
        return 'default';
      case 'Borrador':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Panel de Super Administración"
        description="Gestión y monitoreo centralizado de la aplicación."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground">Usuarios registrados en el sistema.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Generados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allReports.length}</div>
            <p className="text-xs text-muted-foreground">Reportes creados por todos los usuarios.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del Sistema</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
              Operacional
            </div>
            <p className="text-xs text-muted-foreground">Todos los servicios funcionan correctamente.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
          <CardDescription>Administre y supervise las cuentas de los usuarios.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Razón Social</TableHead>
                <TableHead>RNC / Cédula</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.rnc}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Administrar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista General de Reportes</CardTitle>
          <CardDescription>Monitoree todos los reportes generados en la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Reporte</TableHead>
                <TableHead>Usuario (RNC)</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium hidden sm:table-cell">{report.id.substring(0,8)}...</TableCell>
                   <TableCell>{report.rnc}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{report.periodo}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(report.estado)}>{report.estado}</Badge>
                  </TableCell>
                  <TableCell>
                     <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
