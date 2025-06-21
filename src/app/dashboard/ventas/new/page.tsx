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
import { Form607Schema, CompanySchema } from '@/lib/schemas';
import { PlusCircle, Trash2, Save, FileDown, Loader2, ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { lookupRnc } from '@/ai/flows/lookup-rnc-flow';
import { searchCompanies } from '@/ai/flows/search-companies-flow';


type FormValues = z.infer<typeof Form607Schema>;
type CompanyFormValues = z.infer<typeof CompanySchema>;

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
  const { addReport, getReport, updateReport, showToast, currentUser, companies, addCompany } = useAppContext();
  const reportId = searchParams.get('id');
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);
  const [isCompanyLookup, setIsCompanyLookup] = useState(false);

  const [companySearchResults, setCompanySearchResults] = useState<{name: string, rnc: string}[]>([]);
  const [isCompanySearching, setIsCompanySearching] = useState(false);
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);

  const allCompanies = useMemo(() => [
    { id: currentUser.id, name: `${currentUser.name} (Principal)`, rnc: currentUser.rnc }, 
    ...companies.filter(c => c.ownerId === currentUser.id)
  ], [currentUser, companies]);

  const form = useForm<FormValues>({
    resolver: zodResolver(Form607Schema),
    defaultValues: {
      rnc: currentUser.rnc || '',
      periodo: '',
      ventas: [defaultRow],
    },
  });

  const addCompanyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: { name: '', rnc: '' },
  });

  const companyNameValue = addCompanyForm.watch('name');

  useEffect(() => {
    if (reportId) {
      const report = getReport(reportId);
      if (report && report.type === '607') {
        form.reset(report);
      }
    }
  }, [reportId, getReport, form]);
  
  useEffect(() => {
    if (companyNameValue.length < 2) {
      setCompanySearchResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setIsCompanySearching(true);
      const results = await searchCompanies({ query: companyNameValue });
      setCompanySearchResults(results);
      setIsCompanySearching(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [companyNameValue]);

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
  
  const handleAddNewCompany = async (data: CompanyFormValues) => {
    const newCompany = await addCompany(data);
    if (newCompany) {
      form.setValue('rnc', newCompany.rnc, { shouldValidate: true });
      setIsAddCompanyDialogOpen(false);
      addCompanyForm.reset();
    }
  };

  const handleCompanyValidateAndAutocomplete = async () => {
    const rnc = addCompanyForm.getValues('rnc');
    addCompanyForm.clearErrors('rnc');
     const rncValidation = z.string().refine(val => (val.length === 9 || val.length === 11) && /^\d+$/.test(val), {
        message: 'El RNC debe ser numérico y tener 9 u 11 dígitos.',
    }).safeParse(rnc);

    if (!rncValidation.success) {
      addCompanyForm.setError('rnc', { type: 'manual', message: rncValidation.error.errors[0].message });
      return;
    }

    setIsCompanyLookup(true);
    try {
      const result = await lookupRnc({ rnc });
      if (result && result.razonSocial) {
        addCompanyForm.setValue('name', result.razonSocial, { shouldValidate: true });
        showToast({ title: 'RNC Válido', description: `Empresa encontrada: ${result.razonSocial}` });
      } else {
        showToast({ variant: 'destructive', title: 'RNC no encontrado', description: 'No se pudo encontrar la razón social para este RNC.' });
      }
    } catch (error) {
      console.error('Error looking up RNC:', error);
      showToast({ variant: 'destructive', title: 'Error de Búsqueda', description: 'Ocurrió un problema al validar el RNC.' });
    } finally {
      setIsCompanyLookup(false);
    }
  };

  return (
    <>
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
                       <Select 
                        onValueChange={(value) => {
                           if (value === 'add-new') {
                             setIsAddCompanyDialogOpen(true);
                           } else {
                             field.onChange(value);
                           }
                        }} 
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
                          <Separator className="my-1" />
                           <SelectItem value="add-new">
                              <span className="flex items-center gap-2 text-primary">
                                <PlusCircle className="h-4 w-4" />
                                Agregar nueva empresa
                              </span>
                           </SelectItem>
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

      <Dialog open={isAddCompanyDialogOpen} onOpenChange={setIsAddCompanyDialogOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Empresa</DialogTitle>
              <DialogDescription>
                  Añada un nuevo perfil de empresa para usar en los reportes.
              </DialogDescription>
            </DialogHeader>
            <Form {...addCompanyForm}>
              <form onSubmit={addCompanyForm.handleSubmit(handleAddNewCompany)} className="space-y-4">
                <FormField
                  control={addCompanyForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre / Razón Social</FormLabel>
                       <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Buscar o escribir nombre de empresa..."
                            {...field}
                            onFocus={() => setIsNameInputFocused(true)}
                            onBlur={() => setTimeout(() => setIsNameInputFocused(false), 200)}
                            autoComplete="off"
                          />
                        </FormControl>
                         {isNameInputFocused && (
                          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                            {isCompanySearching ? (
                              <div className="p-4 text-sm text-center">Buscando...</div>
                            ) : companySearchResults.length > 0 ? (
                              <ul className="max-h-60 overflow-y-auto p-1">
                                {companySearchResults.map((company) => (
                                  <li
                                    key={company.rnc}
                                    className="p-2 text-sm hover:bg-accent rounded-sm cursor-pointer"
                                    onMouseDown={() => {
                                      addCompanyForm.setValue('name', company.name, { shouldValidate: true });
                                      addCompanyForm.setValue('rnc', company.rnc, { shouldValidate: true });
                                      setCompanySearchResults([]);
                                    }}
                                  >
                                    {company.name}
                                  </li>
                                ))}
                              </ul>
                            ) : companyNameValue.length > 1 ? (
                              <div className="p-4 text-sm text-center text-muted-foreground">No se encontraron resultados.</div>
                            ) : null}
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={addCompanyForm.control}
                    name="rnc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RNC / Cédula</FormLabel>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input placeholder="RNC o Cédula" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" onClick={handleCompanyValidateAndAutocomplete} disabled={isCompanyLookup}>
                                    {isCompanyLookup ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                                    <span className="hidden sm:inline ml-2">Validar</span>
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsAddCompanyDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit">Agregar Empresa</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
