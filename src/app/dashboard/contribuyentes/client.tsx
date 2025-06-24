
'use client';

import { useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2, Loader2, ShieldCheck, FileText, Search } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CompanySchema } from '@/lib/schemas';
import type { Company, Report } from '@/lib/types';
import { lookupRnc } from '@/ai/flows/lookup-rnc-flow';
import { searchCompanies } from '@/ai/flows/search-companies-flow';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';

type FormValues = z.infer<typeof CompanySchema>;

export default function ContribuyentesPageClient() {
  const { currentUser, companies, addCompany, updateCompany, deleteCompany, showToast, reports } = useAppContext();
  
  // State for dialogs and editing
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  
  // State for AI lookups
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [searchResults, setSearchResults] = useState<{name: string, rnc: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);

  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Client-side rendering state
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      handleOpenDialog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const form = useForm<FormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: { name: '', rnc: '', email: '', whatsapp: '' },
  });
  
  const nameValue = form.watch('name');

  useEffect(() => {
    if (nameValue.length < 2) {
      setSearchResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchCompanies({ query: nameValue });
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [nameValue]);

  const allCompanies = useMemo(() => [
    { ...currentUser, id: 'main', type: 'Principal' },
    ...companies.filter(c => c.ownerId === currentUser.id).map(c => ({ ...c, type: 'Cliente' }))
  ], [currentUser, companies]);
  
  const filteredCompanies = useMemo(() => {
    let results = allCompanies;
    
    if (typeFilter !== 'all') {
      results = results.filter(company => company.type === typeFilter);
    }
    
    if (!searchQuery) return results;

    const lowercasedQuery = searchQuery.toLowerCase();
    return results.filter(company => {
        const companyRecord = company as Company; // Type assertion to access optional fields
        return company.name.toLowerCase().includes(lowercasedQuery) ||
        company.rnc.includes(lowercasedQuery) ||
        company.type.toLowerCase().includes(lowercasedQuery) ||
        (companyRecord.email && companyRecord.email.toLowerCase().includes(lowercasedQuery)) ||
        (companyRecord.whatsapp && companyRecord.whatsapp.includes(lowercasedQuery));
    });
  }, [searchQuery, typeFilter, allCompanies]);

  const lastActivityMap = useMemo(() => {
    const activityMap = new Map<string, Report>();
    reports.forEach(report => {
      const existing = activityMap.get(report.rnc);
      if (!existing || new Date(report.fechaCreacion) > new Date(existing.fechaCreacion)) {
        activityMap.set(report.rnc, report);
      }
    });
    return activityMap;
  }, [reports]);

  const handleOpenDialog = (company: Company | null = null) => {
    setEditingCompany(company);
    if (company) {
      form.reset({ name: company.name, rnc: company.rnc, email: company.email || '', whatsapp: company.whatsapp || '' });
    } else {
      form.reset({ name: '', rnc: '', email: '', whatsapp: '' });
    }
    setSearchResults([]);
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    if (editingCompany) {
      await updateCompany(editingCompany.id, data);
    } else {
      await addCompany(data);
    }
    setIsDialogOpen(false);
  };

  const handleValidateAndAutocomplete = async () => {
    const rnc = form.getValues('rnc');
    form.clearErrors('rnc');
    const rncValidation = z.string().refine(val => (val.length === 9 || val.length === 11) && /^\d+$/.test(val), {
        message: 'El RNC debe ser numérico y tener 9 u 11 dígitos.',
    }).safeParse(rnc);

    if (!rncValidation.success) {
      form.setError('rnc', { type: 'manual', message: rncValidation.error.errors[0].message });
      return;
    }
    
    setIsLookingUp(true);
    try {
      const result = await lookupRnc({ rnc });
      if (result && result.razonSocial) {
        form.setValue('name', result.razonSocial, { shouldValidate: true });
        showToast({ title: 'RNC Válido', description: `Empresa encontrada: ${result.razonSocial}` });
      } else {
        showToast({ variant: 'destructive', title: 'RNC no encontrado', description: 'No se pudo encontrar la razón social para este RNC.' });
      }
    } catch (error) {
      console.error('Error looking up RNC:', error);
      showToast({ variant: 'destructive', title: 'Error de Búsqueda', description: 'Ocurrió un problema al validar el RNC.' });
    } finally {
      setIsLookingUp(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Gestión de Contribuyentes"
          description="Añada, edite y visualice todos sus perfiles de empresa y su actividad."
        >
          <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Agregar Contribuyente
          </Button>
        </PageHeader>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Contribuyentes</CardTitle>
            <CardDescription>
              Empresas registradas en su cuenta.
            </CardDescription>
            <div className="pt-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nombre, RNC, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los Tipos</SelectItem>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre / Razón Social</TableHead>
                  <TableHead>RNC / Cédula</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Última Actividad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          {searchQuery ? "No se encontraron contribuyentes." : "No hay contribuyentes registrados."}
                        </TableCell>
                    </TableRow>
                ) : filteredCompanies.map((company) => {
                  const lastActivity = lastActivityMap.get(company.rnc);
                  return (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.rnc}</TableCell>
                      <TableCell>
                        <Badge variant={company.type === 'Principal' ? 'default' : 'secondary'}>
                          {company.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {lastActivity ? (
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground"/>
                            <span>
                              Reporte {lastActivity.type} - {isClient ? format(new Date(lastActivity.fechaCreacion), "dd MMM, yyyy", { locale: es }) : <Skeleton className="h-4 w-24 inline-block" />}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Sin actividad reciente</span>
                        )}
                      </TableCell>
                       <TableCell className="text-right">
                        {company.type !== 'Principal' && (
                          <AlertDialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleOpenDialog(company as Company)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente la empresa y todos sus datos asociados.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteCompany(company.id)} className="bg-destructive hover:bg-destructive/90">
                                  Sí, eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCompany ? 'Editar Contribuyente' : 'Agregar Nuevo Contribuyente'}</DialogTitle>
              <DialogDescription>
                Complete los datos para {editingCompany ? 'actualizar el' : 'registrar un nuevo'} contribuyente.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                  control={form.control}
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
                            {isSearching ? (
                              <div className="p-4 text-sm text-center">Buscando...</div>
                            ) : searchResults.length > 0 ? (
                              <ul className="max-h-60 overflow-y-auto p-1">
                                {searchResults.map((company) => (
                                  <li
                                    key={company.rnc}
                                    className="p-2 text-sm hover:bg-accent rounded-sm cursor-pointer"
                                    onMouseDown={() => {
                                      form.setValue('name', company.name, { shouldValidate: true });
                                      form.setValue('rnc', company.rnc, { shouldValidate: true });
                                      setSearchResults([]);
                                    }}
                                  >
                                    {company.name}
                                  </li>
                                ))}
                              </ul>
                            ) : nameValue.length > 1 ? (
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
                  control={form.control}
                  name="rnc"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>RNC / Cédula</FormLabel>
                        <div className="flex items-center gap-2">
                        <FormControl>
                            <Input placeholder="RNC o Cédula de la empresa" {...field} />
                        </FormControl>
                         <Button type="button" variant="outline" onClick={handleValidateAndAutocomplete} disabled={isLookingUp}>
                            {isLookingUp ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                            <span className="hidden sm:inline ml-2">Validar</span>
                        </Button>
                        </div>
                        <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico (Opcional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contacto@empresa.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Número de WhatsApp con código de país" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                  <DialogClose asChild>
                      <Button type="button" variant="ghost">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">{editingCompany ? 'Guardar Cambios' : 'Agregar Contribuyente'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
      </Dialog>
    </>
  );
}
