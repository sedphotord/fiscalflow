'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2, FileUp } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormDefinitionSchema } from '@/lib/schemas';
import type { FormDefinition, FormDefinitionStatus } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

type FormValues = z.infer<typeof FormDefinitionSchema>;

export default function ManageFormsPage() {
  const { formDefinitions, createFormDefinition, updateFormDefinition, deleteFormDefinition, showToast } = useAppContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormDefinition | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormDefinitionSchema),
  });

  const handleOpenDialog = (formDef: FormDefinition | null = null) => {
    setEditingForm(formDef);
    if (formDef) {
      form.reset({ ...formDef });
    } else {
      form.reset({
        code: '',
        name: '',
        description: '',
        status: 'En Desarrollo',
        version: '1.0.0',
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (editingForm) {
      updateFormDefinition(editingForm.id, data);
    } else {
      createFormDefinition(data);
    }
    setIsDialogOpen(false);
  };

  const getStatusVariant = (status: FormDefinitionStatus) => {
    switch (status) {
      case 'Disponible': return 'default';
      case 'En Desarrollo': return 'secondary';
      case 'Desactivado': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Gestión de Formularios"
          description="Añada, edite y gestione las plantillas y definiciones de los formularios fiscales."
        >
          <Button onClick={() => handleOpenDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Formulario
          </Button>
        </PageHeader>

        <Card>
          <CardHeader>
            <CardTitle>Formularios Disponibles</CardTitle>
            <CardDescription>
              Listado de todos los formularios de la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Versión</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formDefinitions.map((formDef) => (
                  <TableRow key={formDef.id}>
                    <TableCell className="font-mono">{formDef.code}</TableCell>
                    <TableCell className="font-medium">{formDef.name}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(formDef.status)}>{formDef.status}</Badge>
                    </TableCell>
                    <TableCell>{formDef.version}</TableCell>
                    <TableCell>
                      {isClient ? format(new Date(formDef.lastUpdatedAt), 'dd MMM yyyy, hh:mm a', { locale: es }) : <Skeleton className="h-4 w-32" />}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleOpenDialog(formDef)}><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                            <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente la definición del formulario.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteFormDefinition(formDef.id)} className="bg-destructive hover:bg-destructive/90">Sí, eliminar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingForm ? 'Editar Formulario' : 'Crear Nuevo Formulario'}</DialogTitle>
            <DialogDescription>
              Complete los metadatos y suba la plantilla del formulario.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4 max-h-[70vh] overflow-y-auto pr-4">
              <div className="grid md:grid-cols-3 gap-4">
                <FormField control={form.control} name="code" render={({ field }) => (<FormItem><FormLabel>Código</FormLabel><FormControl><Input placeholder="606" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="name" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Formato 606 - Compras" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea placeholder="Descripción corta del propósito del formulario..." {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="version" render={({ field }) => (<FormItem><FormLabel>Versión</FormLabel><FormControl><Input placeholder="1.0.0" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem><FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un estado" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="En Desarrollo">En Desarrollo</SelectItem>
                        <SelectItem value="Desactivado">Desactivado</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
              </div>
              <div>
                <Label>{editingForm ? 'Sustituir Plantilla' : 'Subir Plantilla'}</Label>
                <div 
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 cursor-pointer hover:border-primary"
                  onClick={() => showToast({ title: "Función en desarrollo", description: "La carga de archivos no está implementada."})}
                >
                  <div className="text-center">
                    <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                      <p className="pl-1">Arrastre y suelte el archivo aquí, o</p>
                      <button type="button" className="font-semibold text-primary hover:text-primary/80 ml-1">haga clic para buscar</button>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">.TXT, .XLSX, .CSV hasta 10MB</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="ghost">Cancelar</Button></DialogClose>
                <Button type="submit">{editingForm ? 'Guardar Cambios' : 'Crear Formulario'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
