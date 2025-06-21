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
import { Form609Schema } from '@/lib/schemas';
import { PlusCircle, Trash2, Save, FileDown } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useEffect, useMemo } from 'react';
import { TIPOS_RENTA_609 } from '@/lib/constants';


type FormValues = z.infer<typeof Form609Schema>;

const defaultRow = {
  razonSocialBeneficiario: '',
  tipoRenta: '01' as const,
  fechaPago: '',
  montoPagado: 0,
  isrRetenido: 0,
};

export default function NewPagoExteriorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addReport, getReport, updateReport, showToast, currentUser, companies } = useAppContext();
  const reportId = searchParams.get('id');

  const allCompanies = useMemo(() => [
    { id: currentUser.id, name: `${currentUser.name} (Principal)`, rnc: currentUser.rnc }, 
    ...companies.filter(c => c.ownerId === currentUser.id)
  ], [currentUser, companies]);

  const form = useForm<FormValues>({
    resolver: zodResolver(Form609Schema),
    defaultValues: {
      rnc: currentUser.rnc || '',
      periodo: '',
      pagos: [defaultRow],
    },
  });

  useEffect(() => {
    if (reportId) {
      const report = getReport(reportId);
      if (report && report.type === '609') {
        form.reset(report);
      }
    }
  }, [reportId, getReport, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'pagos',
  });

  const onSubmit = (data: FormValues) => {
    if (reportId) {
      updateReport(reportId, { ...data, estado: 'Completado' });
      showToast({ title: 'Reporte Actualizado', description: 'El reporte 609 ha sido actualizado exitosamente.' });
    } else {
      addReport({ ...data, estado: 'Completado', type: '609' });
      showToast({ title: 'Reporte Generado', description: 'El reporte 609 ha sido generado exitosamente.' });
    }
    router.push('/dashboard/pagos-exterior');
  };

  const onSaveDraft = () => {
    const data = form.getValues();
     if (reportId) {
      updateReport(reportId, { ...data, estado: 'Borrador' });
    } else {
      addReport({ ...data, estado: 'Borrador', type: '609' });
    }
    showToast({ title: 'Borrador Guardado', description: 'Su progreso ha sido guardado como un borrador.' });
    router.push('/dashboard/pagos-exterior');
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <PageHeader
            title={reportId ? "Editar Reporte 609" : "Nuevo Reporte 609"}
            description="Complete la información para generar el reporte de pagos al exterior."
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
                       <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                    <FormControl><Input placeholder="Ej: 202407" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalle de Pagos al Exterior</CardTitle>
              <CardDescription>Agregue los pagos realizados a proveedores del exterior.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Razón Social Proveedor</TableHead>
                      <TableHead>Tipo de Renta</TableHead>
                      <TableHead>Fecha de Pago</TableHead>
                      <TableHead>Monto Pagado</TableHead>
                      <TableHead>ISR Retenido</TableHead>
                      <TableHead>Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="min-w-[250px]">
                          <FormField control={form.control} name={`pagos.${index}.razonSocialBeneficiario`} render={({ field }) => <Input {...field} placeholder="Nombre del proveedor en el exterior" />} />
                        </TableCell>
                         <TableCell className="min-w-[250px]">
                          <FormField control={form.control} name={`pagos.${index}.tipoRenta`} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un tipo..." /></SelectTrigger></FormControl>
                                <SelectContent>{TIPOS_RENTA_609.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                          )} />
                        </TableCell>
                         <TableCell className="min-w-[180px]">
                          <FormField control={form.control} name={`pagos.${index}.fechaPago`} render={({ field }) => <Input type="date" {...field} />} />
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <FormField control={form.control} name={`pagos.${index}.montoPagado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                           <FormField control={form.control} name={`pagos.${index}.isrRetenido`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
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
              {form.formState.errors.pagos?.root && (
                  <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.pagos.root.message}</p>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
  );
}
