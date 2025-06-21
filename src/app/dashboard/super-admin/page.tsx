'use client';

import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MoreHorizontal, Wallet, UserPlus, UserX } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';


function AdminChartsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Skeleton className="lg:col-span-4 h-[350px]" />
      <Skeleton className="lg:col-span-3 h-[350px]" />
    </div>
  );
}

const AdminCharts = dynamic(
  () => import('@/components/dashboard/super-admin/admin-charts').then(mod => mod.AdminCharts),
  {
    ssr: false,
    loading: () => <AdminChartsSkeleton />,
  }
);


const mockTransactions = [
  { id: 'txn_1', user: 'Empresa ABC SRL', plan: 'Pro', amount: 2500, status: 'Completado', date: new Date('2024-07-20') },
  { id: 'txn_2', user: 'Contadores Asociados', plan: 'Despacho', amount: 6500, status: 'Completado', date: new Date('2024-07-18') },
  { id: 'txn_3', user: 'Innovaciones Tech', plan: 'Pro', amount: 2500, status: 'Completado', date: new Date('2024-07-16') },
  { id: 'txn_4', user: 'Juan Perez', plan: 'Pro', amount: 2500, status: 'Completado', date: new Date('2024-07-15') },
];


export default function SuperAdminPage() {
  const getBadgeVariant = (status: string) => {
    return status === 'Completado' ? 'default' : 'destructive';
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Panel de Super Administración"
        description="Gestión y monitoreo centralizado de la aplicación."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos (Junio)</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RD$ 45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% que el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscripciones Activas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+180.1% que el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Usuarios (Mes)</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+78</div>
            <p className="text-xs text-muted-foreground">+18.7% que el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelaciones (Mes)</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2% menos que el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <AdminCharts />
      
       <Card>
        <CardHeader>
          <CardTitle>Registro de Ingresos</CardTitle>
          <CardDescription>Transacciones de pago más recientes.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.user}</TableCell>
                  <TableCell>{txn.plan}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(txn.status)}>{txn.status}</Badge>
                  </TableCell>
                  <TableCell>{format(txn.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right">RD$ {txn.amount.toFixed(2)}</TableCell>
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
