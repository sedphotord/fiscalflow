'use client';

import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUp, ScanLine, FileText } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const historicalUsageData = [
  { month: 'Ene', facturas: 95 },
  { month: 'Feb', facturas: 150 },
  { month: 'Mar', facturas: 210 },
  { month: 'Abr', facturas: 180 },
  { month: 'May', facturas: 250 },
  { month: 'Jun', facturas: 120 },
];

const recentActivityData = [
    { type: 'Escaneo', description: 'Factura de Ferretería XYZ', date: 'Hace 5 minutos' },
    { type: 'Reporte 606', description: 'Generado para Período 202405', date: 'Hace 2 horas' },
    { type: 'Subida de archivo', description: 'factura-proveedor.pdf', date: 'Hace 1 día' },
    { type: 'Reporte 607', description: 'Generado para Período 202405', date: 'Hace 2 días' },
    { type: 'Escaneo', description: 'Factura de Supermercado ABC', date: 'Hace 3 días' },
];

const iconMap = {
    'Escaneo': ScanLine,
    'Subida de archivo': FileUp,
    'Reporte 606': FileText,
    'Reporte 607': FileText,
}

export default function UsagePage() {
    const currentUsage = 120;
    const planLimit = 500;
    const usagePercentage = (currentUsage / planLimit) * 100;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Consumo del Plan"
        description="Revise el detalle del uso de su plan actual."
      />
      
       <Card>
        <CardHeader>
          <CardTitle>Consumo de Facturas (Mes Actual)</CardTitle>
          <CardDescription>
            Ha utilizado {currentUsage} de {planLimit} facturas incluidas en su plan Pro.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Progress value={usagePercentage} className="h-4" />
             <p className="text-sm text-muted-foreground mt-2">
                {usagePercentage.toFixed(0)}% de la cuota mensual utilizada.
            </p>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Historial de Consumo</CardTitle>
          <CardDescription>Uso de facturas en los últimos 6 meses.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ facturas: { label: 'Facturas', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalUsageData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="facturas" fill="var(--color-facturas)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Actividad</CardTitle>
          <CardDescription>Últimas operaciones que consumieron facturas de su plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivityData.map((activity, index) => {
                  const Icon = iconMap[activity.type as keyof typeof iconMap] || FileText;
                  return (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-2 font-medium">
                                <Icon className="h-4 w-4 text-muted-foreground"/>
                                {activity.type}
                            </div>
                        </TableCell>
                        <TableCell>{activity.description}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{activity.date}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
