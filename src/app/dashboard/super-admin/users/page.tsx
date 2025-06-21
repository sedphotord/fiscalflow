
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCreateUserSchema, AdminInviteTeamMemberSchema } from '@/lib/schemas';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
  
  const createUserForm = useForm<CreateUserFormValues>({ resolver: zodResolver(AdminCreateUserSchema), defaultValues: { name: '', email: '', password: '', plan: 'Gratis', invoiceLimit: 50 }});
  const inviteMemberForm = useForm<InviteMemberFormValues>({ resolver: zodResolver(AdminInviteTeamMemberSchema), defaultValues: { email: '', role: 'Editor' }});


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
                    <TableCell>{format(new Date(user.registeredAt), 'dd/MM/yyyy')}</TableCell>
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
        <DialogContent>
          <DialogHeader><DialogTitle>Crear Nuevo Usuario</DialogTitle><DialogDescription>Complete los datos para registrar un nuevo usuario en la plataforma.</DialogDescription></DialogHeader>
          <Form {...createUserForm}>
            <form onSubmit={createUserForm.handleSubmit(onCreateUserSubmit)} className="space-y-4 py-4">
               <FormField control={createUserForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nombre Completo</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={createUserForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="usuario@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={createUserForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Contraseña</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>)} />
               <FormField control={createUserForm.control} name="plan" render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Inicial</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un plan..." /></SelectTrigger></FormControl>
                        <SelectContent>{plans.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
                      </Select>
                  <FormMessage />
                </FormItem>)} />
               <FormField control={createUserForm.control} name="invoiceLimit" render={({ field }) => (<FormItem><FormLabel>Límite de Facturas</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} /></FormControl><FormMessage /></FormItem>)} />
              <DialogFooter><Button type="button" variant="ghost" onClick={() => setIsCreateUserOpen(false)}>Cancelar</Button><Button type="submit">Crear Usuario</Button></DialogFooter>
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
          <DialogHeader><DialogTitle>Invitar Miembro a Equipo de {selectedUser?.name}</DialogTitle></DialogHeader>
          <Form {...inviteMemberForm}>
            <form onSubmit={inviteMemberForm.handleSubmit(onInviteMemberSubmit)} className="space-y-4 py-4">
              <FormField control={inviteMemberForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo del Miembro</FormLabel><FormControl><Input type="email" placeholder="miembro@ejemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={inviteMemberForm.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Rol</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Seleccione un rol" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Admin">Admin</SelectItem><SelectItem value="Editor">Editor</SelectItem><SelectItem value="Solo Lectura">Solo Lectura</SelectItem></SelectContent>
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
