'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Report } from '@/lib/types';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

interface AnalyticsChartsProps {
  reports: Report[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))'];

export function AnalyticsCharts({ reports }: AnalyticsChartsProps) {
  const formDistribution = useMemo(() => {
    const counts = reports.reduce((acc, report) => {
      const key = `Formato ${report.type}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const data = Object.entries(counts).map(([name, value]) => ({ name, value, fill: `var(--color-${name.replace(/\s+/g, '')})` }));
    return data.length > 0 ? data : [{ name: 'Sin Datos', value: 1, fill: 'var(--color-SinDatos)' }];

  }, [reports]);

  const formDistributionConfig = useMemo(() => {
      const config: any = {};
      formDistribution.forEach(item => {
          config[item.name.replace(/\s+/g, '')] = {
              label: item.name,
          }
      });
      if (formDistribution.length === 1 && formDistribution[0].name === 'Sin Datos') {
         config['SinDatos'] = { label: 'Sin Datos' };
      }
      return config;
  }, [formDistribution]);


  const weeklyActivity = useMemo(() => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const activity = days.map(day => ({ name: day, total: 0 }));
    reports.forEach(report => {
      const dayIndex = new Date(report.fechaCreacion).getDay();
      const count = report.type === '606' ? report.compras.length : report.ventas.length;
      activity[dayIndex].total += count;
    });
    return activity;
  }, [reports]);
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Distribución de Formularios</CardTitle>
          <CardDescription>Cantidad de reportes generados por tipo.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={formDistributionConfig} className="mx-auto aspect-square h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={formDistribution} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2} >
                  {formDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Actividad Semanal</CardTitle>
          <CardDescription>Facturas procesadas por día de la semana.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ total: { label: 'Facturas', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="total" fill="var(--color-total)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
         <CardHeader>
          <CardTitle>Tendencia de Errores</CardTitle>
          <CardDescription>Evolución de errores de validación detectados en el tiempo (función futura).</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[250px] bg-muted/50 rounded-md border-2 border-dashed">
            <p className="text-muted-foreground">Gráfico de tendencias de errores próximamente.</p>
        </CardContent>
      </Card>
    </div>
  );
}
