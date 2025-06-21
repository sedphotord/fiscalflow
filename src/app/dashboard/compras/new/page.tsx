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
import { Form606Schema } from '@/lib/schemas';
import { PlusCircle, Trash2, Save, FileDown } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useEffect } from 'react';
import { TIPO_BIENES_SERVICIOS, FORMAS_PAGO } from '@/lib/constants';

type FormValues = z.infer<typeof Form606Schema>;

const defaultRow = {
  rncCedula: '',
  tipoId: '1' as const,
  tipoBienesServicios: '09' as const,
  ncf: '',
  ncfModificado: '',
  fechaComprobante: '',
  fechaPago: '',
  montoFacturado: 0,
  itbisFacturado: 0,
  itbisRetenido: 0,
  itbisSujetoProporcionalidad: 0,
  itbisLlevadoCosto: 0,
  itbisPorAdelantar: 0,
  itbisPercibidoCompras: 0,
  retencionRenta: 0,
  isc: 0,
  impuestoSelectivoConsumo: 0,
  otrosImpuestos: 0,
  montoPropinaLegal: 0,
  formaPago: 'efectivo' as const,
};

export default function NewCompraPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addReport, getReport, updateReport, showToast, settings } = useAppContext();
  const reportId = searchParams.get('id');

  const form = useForm<FormValues>({
    resolver: zodResolver(Form606Schema),
    defaultValues: {
      rnc: settings.rnc || '',
      periodo: '',
      compras: [defaultRow],
    },
  });

  useEffect(() => {
    if (reportId) {
      const report = getReport(reportId);
      if (report && report.type === '606') {
        form.reset(report);
      }
    }
  }, [reportId, getReport, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'compras',
  });

  const onSubmit = (data: FormValues) => {
    if (reportId) {
      updateReport(reportId, { ...data, estado: 'Completado' });
      showToast({ title: 'Reporte Actualizado', description: 'El reporte 606 ha sido actualizado exitosamente.' });
    } else {
      addReport({ ...data, estado: 'Completado', type: '606' });
      showToast({ title: 'Reporte Generado', description: 'El reporte 606 ha sido generado exitosamente.' });
    }
    router.push('/dashboard/compras');
  };

  const onSaveDraft = () => {
    const data = form.getValues();
     if (reportId) {
      updateReport(reportId, { ...data, estado: 'Borrador' });
    } else {
      addReport({ ...data, estado: 'Borrador', type: '606' });
    }
    showToast({ title: 'Borrador Guardado', description: 'Su progreso ha sido guardado como un borrador.' });
    router.push('/dashboard/compras');
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <PageHeader
          title={reportId ? "Editar Reporte 606" : "Nuevo Reporte 606"}
          description="Complete la información para generar el reporte de compras."
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
                  <FormLabel>RNC o Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder="Su RNC o Cédula" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="periodo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Período Fiscal (AAAAMM)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 202305" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalle de Compras</CardTitle>
            <CardDescription>Agregue cada una de las compras de bienes o servicios. Puede expandir la tabla para ver todos los campos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>RNC/Cédula Prov.</TableHead>
                    <TableHead>Tipo ID</TableHead>
                    <TableHead>Tipo Bien/Servicio</TableHead>
                    <TableHead>NCF</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>ITBIS</TableHead>
                    <TableHead>Forma de Pago</TableHead>
                    <TableHead>Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`compras.${index}.rncCedula`} render={({ field }) => <Input {...field} placeholder="RNC del Proveedor" />} />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                         <FormField control={form.control} name={`compras.${index}.tipoId`} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="1">RNC</SelectItem><SelectItem value="2">Cédula</SelectItem></SelectContent>
                            </Select>
                          )} />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                         <FormField control={form.control} name={`compras.${index}.tipoBienesServicios`} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger></FormControl>
                              <SelectContent>{TIPO_BIENES_SERVICIOS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                          )} />
                      </TableCell>
                      <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`compras.${index}.ncf`} render={({ field }) => <Input {...field} placeholder="B01000..." />} />
                      </TableCell>
                       <TableCell className="min-w-[150px]">
                        <FormField control={form.control} name={`compras.${index}.fechaComprobante`} render={({ field }) => <Input type="date" {...field} />} />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <FormField control={form.control} name={`compras.${index}.montoFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                      </TableCell>
                       <TableCell className="min-w-[120px]">
                        <FormField control={form.control} name={`compras.${index}.itbisFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                      </TableCell>
                       <TableCell className="min-w-[150px]">
                         <FormField control={form.control} name={`compras.${index}.formaPago`} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Forma de pago" /></SelectTrigger></FormControl>
                              <SelectContent>{FORMAS_PAGO.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                            </Select>
                          )} />
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
            {form.formState.errors.compras?.root && (
                <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.compras.root.message}</p>
            )}
             {form.formState.errors.compras && !form.formState.errors.compras.root && (
                <p className="text-sm font-medium text-destructive mt-2">Hay errores en algunas filas. Por favor, revise los campos marcados en rojo.</p>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
