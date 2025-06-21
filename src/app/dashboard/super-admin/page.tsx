
'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, MoreHorizontal, Wallet, UserPlus, UserX } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { format } from 'date-fns';

const salesData = [
  { month: 'Ene', revenue: 25000 }, { month: 'Feb', revenue: 28000 }, { month: 'Mar', revenue: 32000 },
  { month: 'Abr', revenue: 35000 }, { month: 'May', revenue: 41000 }, { month: 'Jun', revenue: 45000 },
];
const newUsersData = [
  { month: 'Ene', users: 22 }, { month: 'Feb', users: 35 }, { month: 'Mar', users: 41 },
  { month: 'Abr', users: 55 }, { month: 'May', users: 62 }, { month: 'Jun', users: 78 },
];
const planDistributionData = [
  { name: 'Gratis', value: 120, fill: 'var(--color-gratis)' },
  { name: 'Pro', value: 85, fill: 'var(--color-pro)' },
  { name: 'Despacho', value: 30, fill: 'var(--color-despacho)' },
];
const COLORS = ['hsl(var(--chart-3))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Ingresos Mensuales</CardTitle>
                <CardDescription>Evolución de los ingresos recurrentes mensuales (MRR).</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={{ revenue: { label: 'Ingresos (RD$)', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
                    <BarChart data={salesData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `RD$${value/1000}k`} />
                        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
             <CardHeader>
                <CardTitle>Distribución de Planes Activos</CardTitle>
                <CardDescription>Cómo se distribuyen los usuarios entre los planes.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    gratis: { label: 'Gratis', color: 'hsl(var(--chart-3))' },
                    pro: { label: 'Pro', color: 'hsl(var(--chart-1))' },
                    despacho: { label: 'Despacho', color: 'hsl(var(--chart-2))' },
                }} className="mx-auto aspect-square h-[250px]">
                    <PieChart>
                        <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={planDistributionData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2}>
                            {planDistributionData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
      
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
