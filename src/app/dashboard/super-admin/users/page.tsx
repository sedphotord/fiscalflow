
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash2, Eye, FileWarning, CreditCard, User, Users, Upload } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import type { User as UserType, UserPlan, UserStatus, TeamMemberRole } from '@/lib/types';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCreateUserSchema, AdminInviteTeamMemberSchema } from '@/lib/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { TEAM_ROLES } from '@/lib/constants';

type CreateUserFormValues = z.infer<typeof AdminCreateUserSchema>;
type InviteMemberFormValues = z.infer<typeof AdminInviteTeamMemberSchema>;

export default function AdminUsersPage() {
  const { users, updateUserPlan, assignInvoices, showToast, updateUser, getAllCompaniesForUser, getTeamMembersForUser, plans, createUserByAdmin, inviteTeamMemberForUser } = useAppContext();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [invoicesToAdd, setInvoicesToAdd] = useState(50);
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isBatchCreateOpen, setIsBatchCreateOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setIsCreateUserOpen(true);
    }
  }, [searchParams]);

  
  const createUserForm = useForm<CreateUserFormValues>({ 
    resolver: zodResolver(AdminCreateUserSchema), 
    defaultValues: { 
      name: '', 
      email: '', 
      password: '', 
      plan: 'Gratis', 
      additionalInvoices: 0,
      additionalTeamMembers: 0,
      teamMembers: [],
    }
  });
  const { fields, append, remove } = useFieldArray({
    control: createUserForm.control,
    name: "teamMembers",
  });
  
  const inviteMemberForm = useForm<InviteMemberFormValues>({ resolver: zodResolver(AdminInviteTeamMemberSchema), defaultValues: { email: '', role: 'Contable' }});

  const selectedPlanName = createUserForm.watch('plan');
  const selectedPlan = plans.find(p => p.name === selectedPlanName);
  const additionalTeamMembers = createUserForm.watch('additionalTeamMembers');
  const totalTeamLimit = (selectedPlan?.teamMemberLimit || 0) + additionalTeamMembers;


  const getStatusVariant = (status: UserStatus) => {
    switch (status) {
      case 'Activo': return 'default';
      case 'Pago pendiente': return 'destructive';
      case 'Cancelado': return 'secondary';
      default: return 'outline';
    }
  };
  
  const getPlanVariant = (plan: UserPlan) => {
    switch (plan) {
      case 'Gratis': return 'secondary';
      case 'Pro': return 'outline';
      case 'Despacho': return 'default';
      default: return 'outline';
    }
  };

  const handleAssignInvoices = () => {
    if (selectedUser) {
        assignInvoices(selectedUser.id, invoicesToAdd);
    }
  }

  const handleViewDetails = (user: UserType) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  }

  const onCreateUserSubmit = (data: CreateUserFormValues) => {
    if (data.teamMembers && data.teamMembers.length > totalTeamLimit) {
      createUserForm.setError("teamMembers", { type: 'manual', message: 'Ha excedido el límite de miembros del equipo para este plan.' });
      return;
    }
    createUserByAdmin(data);
    setIsCreateUserOpen(false);
    createUserForm.reset();
  }

  const onInviteMemberSubmit = (data: InviteMemberFormValues) => {
    if (selectedUser) {
      inviteTeamMemberForUser(selectedUser.id, data.email, data.role);
    }
    setIsInviteMemberOpen(false);
    inviteMemberForm.reset();
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Gestión de Usuarios"
          description="Visualice, gestione y edite los usuarios de la plataforma."
        >
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsBatchCreateOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Crear en Lote
            </Button>
            <Button onClick={() => setIsCreateUserOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Crear Usuario
            </Button>
          </div>
        </PageHeader>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Usuarios</CardTitle>
            <CardDescription>Lista completa de usuarios registrados.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Uso de Facturas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Registrado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell><Badge variant={getPlanVariant(user.plan)}>{user.plan}</Badge></TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                           <Progress value={(user.invoiceUsage.current / user.invoiceUsage.limit) * 100} className="w-24 h-2"/>
                           <span className="text-xs text-muted-foreground">{user.invoiceUsage.current}/{user.invoiceUsage.limit}</span>
                        </div>
                    </TableCell>
                    <TableCell><Badge variant={getStatusVariant(user.status)}>{user.status}</Badge></TableCell>
                    <TableCell>{isClient ? format(new Date(user.registeredAt), 'dd/MM/yyyy') : <Skeleton className="h-4 w-20" />}</TableCell>
                    <TableCell className="text-right">
                       <Dialog>
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                    <Eye className="mr-2 h-4 w-4"/> Ver Detalles
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger><CreditCard className="mr-2 h-4 w-4"/> Asignar Plan</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            {plans.map(plan => (
                                                <DropdownMenuItem key={plan.id} onClick={() => updateUserPlan(user.id, plan.name as UserPlan)}>{plan.name}</DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem onSelect={() => setSelectedUser(user)}>
                                      <FileWarning className="mr-2 h-4 w-4" /> Asignar Facturas
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuSeparator />
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4"/> Suspender Usuario
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <AlertDialogContent>
                               <AlertDialogHeader>
                                  <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción cambiará el estado del usuario a 'Cancelado' y restringirá su acceso.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => updateUser(user.id, {status: 'Cancelado'})} className="bg-destructive hover:bg-destructive/90">
                                    Sí, suspender
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                           </AlertDialogContent>
                        </AlertDialog>
                         <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Asignar Facturas Adicionales</DialogTitle>
                                <DialogDescription>
                                    Añada facturas al límite mensual del plan de {selectedUser?.name}.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="invoices" className="text-right">Cantidad</Label>
                                    <Input id="invoices" type="number" value={invoicesToAdd} onChange={(e) => setInvoicesToAdd(Number(e.target.value))} className="col-span-3" />
                                </div>
                            </div>
                             <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancelar</Button>
                                </DialogClose>
                                <Button onClick={handleAssignInvoices}>Asignar</Button>
                            </DialogFooter>
                         </DialogContent>
                       </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalles de Usuario: {selectedUser?.name}</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
           <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Empresas Gestionadas</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow><TableHead>Nombre</TableHead><TableHead>RNC</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {selectedUser && getAllCompaniesForUser(selectedUser.id).map(company => (
                      <TableRow key={company.id}><TableCell>{company.name}</TableCell><TableCell>{company.rnc}</TableCell></TableRow>
                    ))}
                    {selectedUser && getAllCompaniesForUser(selectedUser.id).length === 0 && (
                      <TableRow><TableCell colSpan={2} className="text-center">Este usuario no gestiona empresas.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Miembros de Equipo</CardTitle>
                <Button size="sm" onClick={() => setIsInviteMemberOpen(true)}><PlusCircle className="mr-2 h-4 w-4"/>Invitar Miembro</Button>
              </CardHeader>
              <CardContent>
                 <Table>
                  <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Rol</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {selectedUser && getTeamMembersForUser(selectedUser.id).map(member => (
                      <TableRow key={member.id}><TableCell>{member.email}</TableCell><TableCell>{member.role}</TableCell><TableCell><Badge variant={member.status === 'Activo' ? 'default' : 'secondary'}>{member.status}</Badge></TableCell></TableRow>
                    ))}
                     {selectedUser && getTeamMembersForUser(selectedUser.id).length === 0 && (
                      <TableRow><TableCell colSpan={3} className="text-center">Este usuario no ha invitado a nadie.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>Crear Nuevo Usuario y Equipo</DialogTitle><DialogDescription>Complete los datos para registrar un nuevo usuario y sus miembros de equipo.</DialogDescription></DialogHeader>
          <Form {...createUserForm}>
            <form onSubmit={createUserForm.handleSubmit(onCreateUserSubmit)} className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
              <Card>
                <CardHeader><CardTitle>Datos del Dueño de la Cuenta</CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <FormField control={createUserForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={createUserForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="usuario@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={createUserForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Contraseña</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Configuración del Plan</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={createUserForm.control} name="plan" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Inicial</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un plan..." /></SelectTrigger></FormControl>
                        <SelectContent>{plans.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
                    </Select>
                    {selectedPlan && <p className="text-sm text-muted-foreground mt-2">{selectedPlan.description}</p>}
                    <FormMessage />
                  </FormItem>)} />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormItem>
                          <FormLabel>Facturas (Plan)</FormLabel>
                          <Input type="number" disabled value={selectedPlan?.invoiceLimit || 0}/>
                      </FormItem>
                      <FormField control={createUserForm.control} name="additionalInvoices" render={({ field }) => (<FormItem><FormLabel>Fact. Adicionales</FormLabel><FormControl><Input type="number" placeholder="0" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
                      <FormItem>
                          <FormLabel>Miembros (Plan)</FormLabel>
                          <Input type="number" disabled value={selectedPlan?.teamMemberLimit || 0}/>
                      </FormItem>
                      <FormField control={createUserForm.control} name="additionalTeamMembers" render={({ field }) => (<FormItem><FormLabel>Miembros Adic.</FormLabel><FormControl><Input type="number" placeholder="0" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Miembros del Equipo</CardTitle>
                            <CardDescription>Agregados: {fields.length} / Límite Total: {totalTeamLimit}</CardDescription>
                          </div>
                           <Button type="button" variant="outline" size="sm" onClick={() => append({ email: '', password: '', role: 'Contable' })} disabled={fields.length >= totalTeamLimit}>
                              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Miembro
                          </Button>
                      </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {fields.map((field, index) => (
                          <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded-lg relative">
                              <FormField control={createUserForm.control} name={`teamMembers.${index}.email`} render={({ field }) => (<FormItem><FormLabel>Correo del Miembro</FormLabel><FormControl><Input type="email" placeholder="miembro@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                              <FormField control={createUserForm.control} name={`teamMembers.${index}.password`} render={({ field }) => (<FormItem><FormLabel>Contraseña Inicial</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
                              <FormField control={createUserForm.control} name={`teamMembers.${index}.role`} render={({ field }) => (<FormItem><FormLabel>Rol</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleccione un rol" /></SelectTrigger></FormControl><SelectContent>{TEAM_ROLES.map(role => <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                      ))}
                       {createUserForm.formState.errors.teamMembers?.message && (
                          <p className="text-sm font-medium text-destructive">{createUserForm.formState.errors.teamMembers.message}</p>
                      )}
                  </CardContent>
              </Card>

              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsCreateUserOpen(false)}>Cancelar</Button>
                <Button type="submit">Crear Usuario y Equipo</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isBatchCreateOpen} onOpenChange={setIsBatchCreateOpen}>
        <DialogContent>
           <DialogHeader><DialogTitle>Crear Usuarios en Lote</DialogTitle><DialogDescription>Pegue los datos de los usuarios en formato CSV (nombre,email,plan).</DialogDescription></DialogHeader>
           <Textarea placeholder="John Doe,john.doe@example.com,Pro&#10;Jane Smith,jane.smith@example.com,Gratis" className="min-h-[200px]" />
           <DialogFooter>
             <Button type="button" variant="ghost" onClick={() => setIsBatchCreateOpen(false)}>Cancelar</Button>
             <Button onClick={() => { showToast({title: 'Función en desarrollo'}); setIsBatchCreateOpen(false); }}>Procesar y Crear</Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isInviteMemberOpen} onOpenChange={setIsInviteMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invitar Miembro a Equipo de {selectedUser?.name}</DialogTitle>
             <DialogDescription>
                {selectedUser && `El usuario ha usado ${getTeamMembersForUser(selectedUser.id).length} de ${selectedUser.teamMemberLimit} puestos de equipo.`}
             </DialogDescription>
          </DialogHeader>
          <Form {...inviteMemberForm}>
            <form onSubmit={inviteMemberForm.handleSubmit(onInviteMemberSubmit)} className="space-y-4 py-4">
              <FormField control={inviteMemberForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo del Miembro</FormLabel><FormControl><Input type="email" placeholder="miembro@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={inviteMemberForm.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Rol</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un rol" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {TEAM_ROLES.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              <div>
                                <p className="font-medium">{role.name}</p>
                                <p className="text-xs text-muted-foreground">{role.description}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <DialogFooter>
                 <Button type="button" variant="ghost" onClick={() => setIsInviteMemberOpen(false)}>Cancelar</Button>
                 <Button type="submit">Enviar Invitación</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
