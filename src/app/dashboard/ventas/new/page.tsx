'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/dashboard/page-header';
import { Form607Schema } from '@/lib/schemas';
import { PlusCircle, Trash2, Save, FileDown } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useEffect, useMemo } from 'react';

type FormValues = z.infer<typeof Form607Schema>;

const defaultRow = {
  rncCedula: '',
  tipoId: '1' as const,
  ncf: '',
  ncfModificado: '',
  fechaComprobante: '',
  montoFacturado: 0,
  itbisFacturado: 0,
};

export default function NewVentaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addReport, getReport, updateReport, showToast, settings, companies } = useAppContext();
  const reportId = searchParams.get('id');

  const allCompanies = useMemo(() => [
    { ...settings, id: 'main', name: `${settings.name} (Principal)` }, 
    ...companies
  ], [settings, companies]);

  const form = useForm<FormValues>({
    resolver: zodResolver(Form607Schema),
    defaultValues: {
      rnc: settings.rnc || '',
      periodo: '',
      ventas: [defaultRow],
    },
  });

  useEffect(() => {
    if (reportId) {
      const report = getReport(reportId);
      if (report && report.type === '607') {
        form.reset(report);
      }
    }
  }, [reportId, getReport, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ventas',
  });

  const onSubmit = (data: FormValues) => {
    if (reportId) {
      updateReport(reportId, { ...data, estado: 'Completado' });
      showToast({ title: 'Reporte Actualizado', description: 'El reporte 607 ha sido actualizado exitosamente.' });
    } else {
      addReport({ ...data, estado: 'Completado', type: '607' });
      showToast({ title: 'Reporte Generado', description: 'El reporte 607 ha sido generado exitosamente.' });
    }
    router.push('/dashboard/ventas');
  };

  const onSaveDraft = () => {
    const data = form.getValues();
     if (reportId) {
      updateReport(reportId, { ...data, estado: 'Borrador' });
    } else {
      addReport({ ...data, estado: 'Borrador', type: '607' });
    }
    showToast({ title: 'Borrador Guardado', description: 'Su progreso ha sido guardado como un borrador.' });
    router.push('/dashboard/ventas');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <PageHeader
          title={reportId ? "Editar Reporte 607" : "Nuevo Reporte 607"}
          description="Complete la información para generar el reporte de ventas."
        >
          <Button type="button" variant="outline" onClick={onSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>
          <Button type="submit">
            <FileDown className="mr-2 h-4 w-4" />
            {reportId ? "Actualizar Reporte" : "Generar Reporte"}
          </Button>
        </PageHeader>

        <Card>
          <CardHeader>
            <CardTitle>Información del Contribuyente</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="rnc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contribuyente</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una empresa o perfil..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCompanies.map((company) => (
                          <SelectItem key={company.id} value={company.rnc}>
                            {company.name} ({company.rnc})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField control={form.control} name="periodo" render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Fiscal (AAAAMM)</FormLabel>
                  <FormControl><Input placeholder="Ej: 202305" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalle de Ventas</CardTitle>
            <CardDescription>Agregue cada una de las ventas de bienes o servicios.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RNC/Cédula Cliente</TableHead>
                    <TableHead>Tipo ID</TableHead>
                    <TableHead>NCF</TableHead>
                    <TableHead>NCF Modificado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>ITBIS</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`ventas.${index}.rncCedula`} render={({ field }) => <Input {...field} placeholder="RNC del Cliente" />} />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                         <FormField control={form.control} name={`ventas.${index}.tipoId`} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="1">RNC</SelectItem><SelectItem value="2">Cédula</SelectItem></SelectContent>
                            </Select>
                          )} />
                      </TableCell>
                       <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`ventas.${index}.ncf`} render={({ field }) => <Input {...field} placeholder="B0100..." />} />
                      </TableCell>
                       <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`ventas.${index}.ncfModificado`} render={({ field }) => <Input {...field} placeholder="B0100... (Opcional)" />} />
                      </TableCell>
                       <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`ventas.${index}.fechaComprobante`} render={({ field }) => <Input type="date" {...field} />} />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <FormField control={form.control} name={`ventas.${index}.montoFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                      </TableCell>
                       <TableCell className="min-w-[120px]">
                        <FormField control={form.control} name={`ventas.${index}.itbisFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append(defaultRow)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Fila
            </Button>
            {form.formState.errors.ventas?.root && (
                <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.ventas.root.message}</p>
            )}
             {form.formState.errors.ventas && !form.formState.errors.ventas.root && (
                <p className="text-sm font-medium text-destructive mt-2">Hay errores en algunas filas. Por favor, revise los campos marcados en rojo.</p>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
