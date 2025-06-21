'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2, Loader2, ShieldCheck } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CompanySchema } from '@/lib/schemas';
import type { Company } from '@/lib/types';
import { lookupRnc } from '@/ai/flows/lookup-rnc-flow';
import { searchCompanies } from '@/ai/flows/search-companies-flow';

type FormValues = z.infer<typeof CompanySchema>;

export default function ManageCompaniesPage() {
  const { currentUser, companies, addCompany, updateCompany, deleteCompany, showToast } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const [searchResults, setSearchResults] = useState<{name: string, rnc: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNameInputFocused, setIsNameInputFocused] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      rnc: '',
      email: '',
      whatsapp: '',
    },
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
  
  const allCompanies = [
    { ...currentUser, id: 'main', type: 'Principal' },
    ...companies.filter(c => c.ownerId === currentUser.id).map(c => ({ ...c, type: 'Cliente' }))
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestionar Empresas"
        description="Añada, edite y organice las empresas de sus clientes."
      >
        <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Empresa
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>
            Estas son las empresas que ha registrado en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Razón Social</TableHead>
                <TableHead>RNC / Cédula</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.rnc}</TableCell>
                  <TableCell>{(company as Company).email || '-'}</TableCell>
                  <TableCell>{(company as Company).whatsapp || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={company.type === 'Principal' ? 'default' : 'secondary'}>
                        {company.type}
                    </Badge>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCompany ? 'Editar Empresa' : 'Agregar Nueva Empresa'}</DialogTitle>
              <DialogDescription>
                Complete los datos para {editingCompany ? 'actualizar la' : 'registrar una nueva'} empresa.
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
                  <Button type="submit">{editingCompany ? 'Guardar Cambios' : 'Agregar Empresa'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
      </Dialog>
    </div>
  );
}
