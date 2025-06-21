'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

const salesData = [
  { month: 'Ene', revenue: 25000 }, { month: 'Feb', revenue: 28000 }, { month: 'Mar', revenue: 32000 },
  { month: 'Abr', revenue: 35000 }, { month: 'May', revenue: 41000 }, { month: 'Jun', revenue: 45000 },
];

const planDistributionData = [
  { name: 'Gratis', value: 120, fill: 'var(--color-gratis)' },
  { name: 'Pro', value: 85, fill: 'var(--color-pro)' },
  { name: 'Despacho', value: 30, fill: 'var(--color-despacho)' },
];
const COLORS = ['hsl(var(--chart-3))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export function AdminCharts() {
    return (
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
    )
}
