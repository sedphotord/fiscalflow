'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Scale, FileText, BadgePercent, Coins } from 'lucide-react';

const RetencionesCalculatorSchema = z.object({
  ingreso: z.number({ required_error: 'El ingreso es requerido.' }).positive('El ingreso debe ser un número positivo.'),
  tipoIngreso: z.enum(['mensual', 'anual']),
  ano: z.string(),
});

type FormValues = z.infer<typeof RetencionesCalculatorSchema>;

// ISR Scales - Using data for 2023 onwards as an example
const isrScales: { [key: string]: { exempt: number; rates: { limit: number; percentage: number; fixed: number }[] } } = {
  "2024": {
    exempt: 416220.00,
    rates: [
      { limit: 624329.00, percentage: 0.15, fixed: 0 },
      { limit: 867123.00, percentage: 0.20, fixed: 31216.00 },
      { limit: Infinity, percentage: 0.25, fixed: 79776.00 },
    ]
  },
  "2023": {
    exempt: 416220.00,
    rates: [
      { limit: 624329.00, percentage: 0.15, fixed: 0 },
      { limit: 867123.00, percentage: 0.20, fixed: 31216.00 },
      { limit: Infinity, percentage: 0.25, fixed: 79776.00 },
    ]
  },
  "2022": {
    exempt: 416220.00,
    rates: [
        { limit: 624329.00, percentage: 0.15, fixed: 0 },
        { limit: 867123.00, percentage: 0.20, fixed: 31216.00 },
        { limit: Infinity, percentage: 0.25, fixed: 79776.00 },
    ]
  },
  "2021": {
    exempt: 416220.00,
    rates: [
        { limit: 624329.00, percentage: 0.15, fixed: 0 },
        { limit: 867123.00, percentage: 0.20, fixed: 31216.00 },
        { limit: Infinity, percentage: 0.25, fixed: 79776.00 },
    ]
  },
   "2020": {
    exempt: 416220.00,
    rates: [
        { limit: 624329.00, percentage: 0.15, fixed: 0 },
        { limit: 867123.00, percentage: 0.20, fixed: 31216.00 },
        { limit: Infinity, percentage: 0.25, fixed: 79776.00 },
    ]
  },
};

type CalculationResult = {
  ingresoAnual: number;
  retencionAnual: number;
  retencionMensual: number;
  salarioNetoMensual: number;
} | null;

export default function RetencionesCalculatorPage() {
  const [result, setResult] = useState<CalculationResult>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(RetencionesCalculatorSchema),
    defaultValues: {
      tipoIngreso: 'mensual',
      ano: new Date().getFullYear().toString(),
    },
  });
  
  const calculateISR = (ingresoAnual: number, scale: typeof isrScales.2024) => {
    if (ingresoAnual <= scale.exempt) {
      return 0;
    }

    let previousLimit = scale.exempt;
    for (const rate of scale.rates) {
      if (ingresoAnual <= rate.limit) {
        return ((ingresoAnual - previousLimit) * rate.percentage) + rate.fixed;
      }
      previousLimit = rate.limit;
    }
    return 0; // Should not be reached with limit: Infinity
  };

  const onSubmit = (data: FormValues) => {
    const ingresoAnual = data.tipoIngreso === 'mensual' ? data.ingreso * 12 : data.ingreso;
    const scale = isrScales[data.ano];
    
    if (!scale) {
        // Handle case where scale for the year is not available
        console.error(`ISR scale for year ${data.ano} not found.`);
        return;
    }

    const retencionAnual = calculateISR(ingresoAnual, scale);
    const retencionMensual = retencionAnual / 12;
    const ingresoMensual = ingresoAnual / 12;

    setResult({
      ingresoAnual,
      retencionAnual,
      retencionMensual,
      salarioNetoMensual: ingresoMensual - retencionMensual,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Calculadora de Retenciones de Salario (ISR)"
        description="Estime la retención del Impuesto Sobre la Renta para asalariados."
      />

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="description">
          <AccordionTrigger>Descripción</AccordionTrigger>
          <AccordionContent>
            Es una calculadora diseñada para darle al contribuyente la facilidad de conocer la retención correspondiente al salario recibido anual o mensual.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="additional-info">
          <AccordionTrigger>Información Adicional</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Base Legal:</strong> Título II Ley 11-92 d/f 16/05/1992 y sus modificaciones.</li>
              <li><strong>Requisitos:</strong> No aplica.</li>
              <li><strong>Pasos:</strong> Ingresar el monto de ingreso (mensual o anual) y seleccionar el año.</li>
              <li><strong>Precio:</strong> Gratis.</li>
              <li><strong>Tiempo de entrega:</strong> Inmediato.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Datos de Ingreso</CardTitle>
            <CardDescription>Proporcione los datos para el cálculo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="tipoIngreso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seleccionar tipo de ingreso:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mensual">INGRESOS MENSUALES</SelectItem>
                          <SelectItem value="anual">INGRESOS ANUALES</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ano"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seleccionar año:</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(isrScales).sort((a,b) => Number(b) - Number(a)).map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingreso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Introduzca el ingreso:</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ej: 50000"
                          {...field}
                          onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calcular
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Resultados del Cálculo</CardTitle>
                <CardDescription>Aquí se mostrará el desglose de su retención.</CardDescription>
            </CardHeader>
            <CardContent>
                {result ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                           <div className="flex items-center gap-3 text-muted-foreground">
                                <Scale className="h-5 w-5"/>
                                <span className="font-medium text-foreground">Ingreso Anual Bruto</span>
                           </div>
                           <span className="font-bold text-lg">RD${result.ingresoAnual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                         <div className="flex justify-between items-center border-b pb-2">
                           <div className="flex items-center gap-3 text-muted-foreground">
                                <FileText className="h-5 w-5"/>
                                <span className="font-medium text-foreground">Retención Anual (ISR)</span>
                           </div>
                           <span className="font-semibold text-lg text-destructive">RD${result.retencionAnual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                           <div className="flex items-center gap-3 text-muted-foreground">
                                <BadgePercent className="h-5 w-5"/>
                                <span className="font-medium text-foreground">Retención Mensual (ISR)</span>
                           </div>
                           <span className="font-semibold text-md text-destructive">RD${result.retencionMensual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                         <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                           <div className="flex items-center gap-3 text-muted-foreground">
                                <Coins className="h-5 w-5"/>
                                <span className="font-medium text-foreground">Salario Neto Mensual</span>
                           </div>
                           <span className="font-bold text-xl text-primary">RD${result.salarioNetoMensual.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-40 rounded-lg border-2 border-dashed bg-muted/50">
                        <p className="text-muted-foreground">Esperando cálculo...</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
