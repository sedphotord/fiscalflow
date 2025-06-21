'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Line, LineChart, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const salesByPlanData = [
  { name: 'Gratis', value: 120, fill: 'var(--color-gratis)' },
  { name: 'Pro', value: 85, fill: 'var(--color-pro)' },
  { name: 'Despacho', value: 30, fill: 'var(--color-despacho)' },
];

const churnRateData = [
  { month: 'Ene', rate: 4.5 }, { month: 'Feb', rate: 3.8 }, { month: 'Mar', rate: 5.1 },
  { month: 'Abr', rate: 4.2 }, { month: 'May', rate: 3.5 }, { month: 'Jun', rate: 3.2 },
];

const ltvData = [
  { month: 'Ene', ltv: 8500 }, { month: 'Feb', ltv: 8750 }, { month: 'Mar', ltv: 9100 },
  { month: 'Abr', ltv: 9500 }, { month: 'May', ltv: 9800 }, { month: 'Jun', ltv: 10200 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];


export default function AdminSalesAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Análisis de Ventas"
        description="Revise los datos de ventas y crecimiento."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ventas por Plan</CardTitle>
            <CardDescription>Distribución de nuevos clientes por plan este mes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              gratis: { label: 'Gratis', color: 'hsl(var(--chart-1))' },
              pro: { label: 'Pro', color: 'hsl(var(--chart-2))' },
              despacho: { label: 'Despacho', color: 'hsl(var(--chart-3))' },
            }} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                    <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={salesByPlanData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2}>
                        {salesByPlanData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Tasa de Abandono (Churn Rate)</CardTitle>
                <CardDescription>Porcentaje de clientes que cancelaron su suscripción por mes.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{ rate: { label: 'Tasa (%)', color: 'hsl(var(--destructive))' } }} className="h-[250px] w-full">
                    <LineChart data={churnRateData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Valor de Vida del Cliente (LTV)</CardTitle>
                <CardDescription>Ingreso promedio esperado de un cliente durante su vida.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{ ltv: { label: 'LTV (RD$)', color: 'hsl(var(--primary))' } }} className="h-[250px] w-full">
                    <BarChart data={ltvData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `RD$${value/1000}k`} />
                        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="ltv" fill="var(--color-ltv)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
