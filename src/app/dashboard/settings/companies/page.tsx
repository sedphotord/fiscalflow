'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CompanySchema } from '@/lib/schemas';
import type { Company } from '@/lib/types';

type FormValues = z.infer<typeof CompanySchema>;

export default function ManageCompaniesPage() {
  const { settings, companies, addCompany, updateCompany, deleteCompany } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      rnc: '',
    },
  });

  const handleOpenDialog = (company: Company | null = null) => {
    setEditingCompany(company);
    if (company) {
      form.reset({ name: company.name, rnc: company.rnc });
    } else {
      form.reset({ name: '', rnc: '' });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (editingCompany) {
      updateCompany(editingCompany.id, data);
    } else {
      addCompany(data);
    }
    setIsDialogOpen(false);
  };
  
  const allCompanies = [
    { ...settings, id: 'main', type: 'Principal' },
    ...companies.map(c => ({ ...c, type: 'Cliente' }))
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
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.rnc}</TableCell>
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
                      <FormControl>
                        <Input placeholder="Nombre de la empresa cliente" {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Input placeholder="RNC o Cédula de la empresa" {...field} />
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
