
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2, GripVertical } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from '@/components/ui/select';
import { FormDefinitionSchema } from '@/lib/schemas';
import type { FormDefinition, FormDefinitionStatus } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

type FormValues = z.infer<typeof FormDefinitionSchema>;

export default function ManageFormsPage() {
  const { formDefinitions, createFormDefinition, updateFormDefinition, deleteFormDefinition } = useAppContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<FormDefinition | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const uniqueCategories = useMemo(() => {
    const categories = formDefinitions.map(f => f.category);
    return [...new Set(categories)];
  }, [formDefinitions]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(FormDefinitionSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      category: '',
      status: 'En Desarrollo',
      version: '1.0.0',
      fields: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields"
  });

  const handleOpenDialog = (formDef: FormDefinition | null = null) => {
    setEditingForm(formDef);
    setIsAddingNewCategory(false);
    setNewCategoryName('');
    if (formDef) {
      form.reset({ ...formDef, fields: formDef.fields || [] });
    } else {
      form.reset({
        code: '',
        name: '',
        description: '',
        category: '',
        status: 'En Desarrollo',
        version: '1.0.0',
        fields: [],
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    const finalData = { ...data };

    if (isAddingNewCategory) {
      if (!newCategoryName.trim()) {
        form.setError("category", { message: "Debe proveer un nombre para la nueva categoría." });
        return;
      }
      finalData.category = newCategoryName.trim();
    }
    
    if (!finalData.category) {
        form.setError("category", { message: "Debe seleccionar o crear una categoría." });
        return;
    }

    if (editingForm) {
      updateFormDefinition(editingForm.id, finalData);
    } else {
      createFormDefinition(finalData);
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

  const groupedForms = useMemo(() => {
    return formDefinitions.reduce((acc, formDef) => {
      const category = formDef.category || 'Sin Categoría';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(formDef);
      return acc;
    }, {} as Record<string, FormDefinition[]>);
  }, [formDefinitions]);

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
        
        <div className="grid gap-6">
          {Object.entries(groupedForms).map(([category, forms]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>
                  Listado de formularios en esta categoría.
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
                    {forms.map((formDef) => (
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
                              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
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
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
            setIsAddingNewCategory(false);
            setNewCategoryName('');
        }
      }}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingForm ? 'Editar Formulario' : 'Crear Nuevo Formulario'}</DialogTitle>
            <DialogDescription>
              Complete los metadatos y defina los campos del formulario.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4 max-h-[70vh] overflow-y-auto pr-4">
              <Card>
                <CardHeader>
                    <CardTitle>Información General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="code" render={({ field }) => (<FormItem><FormLabel>Código</FormLabel><FormControl><Input placeholder="606" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Formato 606 - Compras" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea placeholder="Descripción corta del propósito del formulario..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                     <div className="grid md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="category" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                if (value === '--add-new--') {
                                  setIsAddingNewCategory(true);
                                  field.onChange('');
                                } else {
                                  setIsAddingNewCategory(false);
                                  setNewCategoryName('');
                                  field.onChange(value);
                                }
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccione una categoría..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {uniqueCategories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                                <SelectSeparator />
                                <SelectItem value="--add-new--" className="focus:bg-transparent">
                                  <span className="flex items-center gap-2 text-primary">
                                    <PlusCircle className="h-4 w-4" />
                                    Añadir Nueva Categoría
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
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
                     {isAddingNewCategory && (
                        <FormItem>
                            <FormLabel>Nombre de la Nueva Categoría</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Escriba el nombre..."
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    autoFocus
                                />
                            </FormControl>
                        </FormItem>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Campos del Formulario</CardTitle>
                    <CardDescription>Defina la estructura de columnas para el archivo TXT o CSV.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-[auto_1fr_1fr_1fr_auto] items-end gap-3 p-3 border rounded-lg">
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <FormField control={form.control} name={`fields.${index}.columnOrder`} render={({ field }) => (<FormItem><FormLabel>Columna</FormLabel><FormControl><Input type="number" placeholder="#" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name={`fields.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Nombre del Campo</FormLabel><FormControl><Input placeholder="RNC_CEDULA" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name={`fields.${index}.type`} render={({ field }) => (
                                    <FormItem><FormLabel>Tipo de Dato</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Texto">Texto</SelectItem>
                                                <SelectItem value="Numero">Número</SelectItem>
                                                <SelectItem value="Fecha">Fecha (AAAAMMDD)</SelectItem>
                                                <SelectItem value="Moneda">Moneda (0.00)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage /></FormItem>
                                )} />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => append({ columnOrder: fields.length + 1, name: '', type: 'Texto' })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Campo
                    </Button>
                </CardContent>
              </Card>

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

