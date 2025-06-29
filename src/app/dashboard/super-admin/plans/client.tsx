
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlanSchema, InvoicePackSchema } from '@/lib/schemas';
import type { Plan, InvoicePack, PlanData, InvoicePackData } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { ALL_PLAN_FEATURES } from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { FormDescription } from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';

type PlanFormValues = z.infer<typeof PlanSchema>;
type InvoicePackFormValues = z.infer<typeof InvoicePackSchema>;

export default function ManagePlansPageClient() {
  const { plans, invoicePacks, createPlan, updatePlan, deletePlan, createInvoicePack, updateInvoicePack, deleteInvoicePack } = useAppContext();
  
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  
  const [isPackDialogOpen, setIsPackDialogOpen] = useState(false);
  const [editingPack, setEditingPack] = useState<InvoicePack | null>(null);

  const [allFeatures, setAllFeatures] = useState(ALL_PLAN_FEATURES);
  const [newFeature, setNewFeature] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      handleOpenPlanDialog();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const planForm = useForm<PlanFormValues>({
    resolver: zodResolver(PlanSchema),
  });

  const packForm = useForm<InvoicePackFormValues>({
    resolver: zodResolver(InvoicePackSchema),
  });

  const handleOpenPlanDialog = (plan: Plan | null = null) => {
    setEditingPlan(plan);
    if (plan) {
      planForm.reset(plan);
    } else {
      planForm.reset({ name: '', price: 0, invoiceLimit: 0, teamMemberLimit: 0, description: '', features: [] });
    }
    setIsPlanDialogOpen(true);
  };
  
  const onPlanSubmit = (data: PlanFormValues) => {
    const planData: PlanData = {
        ...data,
        description: data.description || '',
        features: data.features || []
    };

    if (editingPlan) {
      updatePlan(editingPlan.id, planData);
    } else {
      createPlan(planData);
    }
    setIsPlanDialogOpen(false);
  };

  const handleOpenPackDialog = (pack: InvoicePack | null = null) => {
    setEditingPack(pack);
    if (pack) {
      packForm.reset(pack);
    } else {
      packForm.reset({ amount: 0, price: 0 });
    }
    setIsPackDialogOpen(true);
  };

  const onPackSubmit = (data: InvoicePackFormValues) => {
    if (editingPack) {
      updateInvoicePack(editingPack.id, data);
    } else {
      createInvoicePack(data);
    }
    setIsPackDialogOpen(false);
  }

  const handleAddNewFeature = () => {
    if (newFeature.trim() && !allFeatures.includes(newFeature.trim())) {
        setAllFeatures([...allFeatures, newFeature.trim()]);
    }
    setNewFeature('');
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Gestión de Planes y Precios"
          description="Añada, edite y elimine los planes de suscripción y los paquetes de facturas."
        />

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Planes de Suscripción</CardTitle>
                <CardDescription>Planes mensuales que los usuarios pueden contratar.</CardDescription>
              </div>
              <Button onClick={() => handleOpenPlanDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Precio (RD$/mes)</TableHead>
                  <TableHead>Límite Facturas</TableHead>
                  <TableHead>Límite Miembros</TableHead>
                  <TableHead>Beneficios</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.price.toFixed(2)}</TableCell>
                    <TableCell>{plan.invoiceLimit}</TableCell>
                    <TableCell>{plan.teamMemberLimit}</TableCell>
                    <TableCell>{plan.features.length} beneficios</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleOpenPlanDialog(plan)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>¿Eliminar Plan?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. El plan se eliminará permanentemente.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => deletePlan(plan.id)} className="bg-destructive hover:bg-destructive/90">Sí, eliminar</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex justify-between items-center">
              <div>
                <CardTitle>Paquetes de Facturas</CardTitle>
                <CardDescription>Paquetes de compra única para usuarios que exceden su límite.</CardDescription>
              </div>
              <Button onClick={() => handleOpenPackDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Paquete
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
               <TableHeader><TableRow><TableHead>Cantidad Facturas</TableHead><TableHead>Precio (RD$)</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
              <TableBody>
                {invoicePacks.map((pack) => (
                  <TableRow key={pack.id}>
                    <TableCell className="font-medium">{pack.amount}</TableCell>
                    <TableCell>{pack.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                       <AlertDialog>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                           <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleOpenPackDialog(pack)}><Pencil className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                            <AlertDialogTrigger asChild><DropdownMenuItem className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Eliminar</DropdownMenuItem></AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>
                         <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>¿Eliminar Paquete?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. El paquete se eliminará permanentemente.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => deleteInvoicePack(pack.id)} className="bg-destructive hover:bg-destructive/90">Sí, eliminar</AlertDialogAction></AlertDialogFooter>
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

      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingPlan ? 'Editar Plan' : 'Nuevo Plan'}</DialogTitle></DialogHeader>
          <Form {...planForm}>
            <form onSubmit={planForm.handleSubmit(onPlanSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={planForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nombre del Plan</FormLabel><FormControl><Input placeholder="Ej: Pro" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={planForm.control} name="price" render={({ field }) => (<FormItem><FormLabel>Precio (RD$/mes)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={planForm.control} name="invoiceLimit" render={({ field }) => (<FormItem><FormLabel>Límite de Facturas</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={planForm.control} name="teamMemberLimit" render={({ field }) => (<FormItem><FormLabel>Límite de Miembros de Equipo</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField control={planForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea placeholder="Breve descripción del plan..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                 <FormField
                  control={planForm.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <FormLabel>Beneficios y Accesos</FormLabel>
                      <div className="max-h-48 overflow-y-auto space-y-2 rounded-md border p-4 grid grid-cols-2">
                        {allFeatures.map((feature) => (
                          <FormField
                            key={feature}
                            control={planForm.control}
                            name="features"
                            render={({ field }) => {
                              return (
                                <FormItem key={feature} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), feature])
                                          : field.onChange(
                                              (field.value || []).filter(
                                                (value) => value !== feature
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormDescription>
                        Seleccione los beneficios para este plan.
                      </FormDescription>
                      <div className="flex items-center gap-2 pt-2">
                        <Input 
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Añadir nuevo beneficio..."
                        />
                        <Button type="button" variant="outline" onClick={handleAddNewFeature}>Añadir</Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <DialogFooter><DialogClose asChild><Button type="button" variant="ghost">Cancelar</Button></DialogClose><Button type="submit">Guardar</Button></DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
       <Dialog open={isPackDialogOpen} onOpenChange={setIsPackDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPack ? 'Editar Paquete' : 'Nuevo Paquete'}</DialogTitle></DialogHeader>
          <Form {...packForm}>
            <form onSubmit={packForm.handleSubmit(onPackSubmit)} className="space-y-4">
              <FormField control={packForm.control} name="amount" render={({ field }) => (<FormItem><FormLabel>Cantidad de Facturas</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={packForm.control} name="price" render={({ field }) => (<FormItem><FormLabel>Precio (RD$)</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
              <DialogFooter><DialogClose asChild><Button type="button" variant="ghost">Cancelar</Button></DialogClose><Button type="submit">Guardar</Button></DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
