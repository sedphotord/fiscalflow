
'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Filter, TrendingUp, Users, Wallet } from 'lucide-react';
import { format } from 'date-fns';

const mockTransactions = [
  { id: 'txn_1', user: 'Empresa ABC SRL', plan: 'Pro', amount: 2500, status: 'Completado', date: new Date('2024-07-20') },
  { id: 'txn_2', user: 'Juan Perez', plan: 'Gratis', amount: 0, status: 'Completado', date: new Date('2024-07-19') },
  { id: 'txn_3', user: 'Contadores Asociados', plan: 'Despacho', amount: 6500, status: 'Completado', date: new Date('2024-07-18') },
  { id: 'txn_4', user: 'Nuevo Cliente Web', plan: 'Pro', amount: 2500, status: 'Fallido', date: new Date('2024-07-17') },
  { id: 'txn_5', user: 'Innovaciones Tech', plan: 'Pro', amount: 2500, status: 'Completado', date: new Date('2024-07-16') },
];


export default function AdminPaymentAnalyticsPage() {
    const getBadgeVariant = (status: string) => {
        if (status === 'Completado') return 'default';
        if (status === 'Fallido') return 'destructive';
        return 'secondary';
    };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Análisis de Pagos"
        description="Visualice las métricas de pagos y suscripciones."
      >
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
            </Button>
             <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar
            </Button>
        </div>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RD$ 1,250,000</div>
            <p className="text-xs text-muted-foreground">Desde el inicio</p>
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
            <CardTitle className="text-sm font-medium">Ingreso Mensual Recurrente (MRR)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RD$ 45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% que el mes pasado</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Historial de Transacciones</CardTitle>
            <CardDescription>Lista de los pagos más recientes procesados en la plataforma.</CardDescription>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
