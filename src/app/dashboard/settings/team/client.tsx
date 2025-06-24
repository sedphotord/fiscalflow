
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash2, Send, Edit, Mail } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TeamMemberSchema, InviteTeamMemberSchema } from '@/lib/schemas';
import type { TeamMember } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TEAM_ROLES } from '@/lib/constants';
import { Progress } from '@/components/ui/progress';
import { useSearchParams } from 'next/navigation';

type FormValues = z.infer<typeof TeamMemberSchema>;
type InviteFormValues = z.infer<typeof InviteTeamMemberSchema>;

export default function ManageTeamPageClient() {
  const { teamMembers, addTeamMember, updateTeamMember, currentUser, deleteTeamMember, inviteTeamMember } = useAppContext();
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const searchParams = useSearchParams();

  const planLimits = {
    'Gratis': 1,
    'Pro': 5,
    'Despacho': Infinity
  };

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
        handleOpenDialog(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const currentMemberCount = 1 + teamMembers.filter(m => m.ownerId === currentUser.id).length;
  const memberLimit = planLimits[currentUser.plan];
  const canAddMembers = currentMemberCount < memberLimit;

  const form = useForm<FormValues>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'Contable',
      invoiceLimit: 0,
    },
  });
  
  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(InviteTeamMemberSchema),
    defaultValues: {
      email: '',
      role: 'Contable',
    },
  });

  const handleOpenDialog = (member: TeamMember | null = null) => {
    setEditingMember(member);
    if (member) {
      form.reset({
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        invoiceLimit: member.invoiceUsage.limit,
      });
    } else {
      form.reset({
        name: '',
        email: '',
        role: 'Contable',
        invoiceLimit: 100, // Default limit for new members
      });
    }
    setIsAddEditDialogOpen(true);
  };

  const onAddEditSubmit = (data: FormValues) => {
    if (editingMember) {
      updateTeamMember(editingMember.id, data);
    } else {
      addTeamMember(data);
    }
    setIsAddEditDialogOpen(false);
  };

  const onInviteSubmit = (data: InviteFormValues) => {
    inviteTeamMember(data.email, data.role);
    setIsInviteDialogOpen(false);
    inviteForm.reset();
  };

  const getStatusVariant = (status: TeamMember['status']) => {
    return status === 'Activo' ? 'default' : 'secondary';
  };
  
  const userTeamMembers = teamMembers.filter(m => m.ownerId === currentUser.id);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Equipo"
        description="Añada, edite y gestione los miembros de su equipo y sus permisos."
      >
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(true)} disabled={!canAddMembers}>
                <Mail className="mr-2 h-4 w-4" />
                Invitar Miembro
            </Button>
            <Button onClick={() => handleOpenDialog(null)} disabled={!canAddMembers}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir Miembro
            </Button>
        </div>
      </PageHeader>
      
      {!canAddMembers && (
          <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/50">
              <CardHeader>
                  <CardTitle className="text-yellow-900 dark:text-yellow-300">Límite de Miembros Alcanzado</CardTitle>
                  <CardDescription className="text-yellow-800 dark:text-yellow-400">
                    Ha alcanzado el límite de {memberLimit} miembros para su plan {currentUser.plan}. Para agregar más, por favor actualice su plan.
                  </CardDescription>
              </CardHeader>
          </Card>
      )}


      <Card>
        <CardHeader>
          <CardTitle>Miembros del Equipo</CardTitle>
          <CardDescription>
            Personas que tienen acceso a esta cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Uso de Facturas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTeamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-24">
                        <Progress value={member.invoiceUsage.limit > 0 ? (member.invoiceUsage.current / member.invoiceUsage.limit) * 100 : 0} className="h-2"/>
                        <span className="text-xs text-muted-foreground text-center">{member.invoiceUsage.current} / {member.invoiceUsage.limit}</span>
                    </div>
                  </TableCell>
                   <TableCell>
                    <Badge variant={getStatusVariant(member.status)}>{member.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleOpenDialog(member)}>
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
                            Esta acción no se puede deshacer. Esto eliminará permanentemente al miembro del equipo.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteTeamMember(member.id)} className="bg-destructive hover:bg-destructive/90">
                            Sí, eliminar
                          </AlertDialogAction>
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
      
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Editar Miembro' : 'Añadir Nuevo Miembro'}</DialogTitle>
              <DialogDescription>
                {editingMember ? 'Actualice los datos del miembro.' : 'Ingrese los datos del nuevo miembro del equipo.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddEditSubmit)} className="space-y-4 pt-4">
                 <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="miembro@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TEAM_ROLES.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                <div className="flex flex-col">
                                  <span>{role.name}</span>
                                  <span className="text-xs text-muted-foreground">{role.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Límite Mensual de Facturas</FormLabel>
                       <FormControl>
                        <Input type="number" placeholder="100" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                  <DialogClose asChild>
                      <Button type="button" variant="ghost">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">
                      {editingMember ? 'Guardar Cambios' : 'Añadir Miembro'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
      </Dialog>

      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invitar Nuevo Miembro</DialogTitle>
              <DialogDescription>
                Se enviará una invitación por correo electrónico para que el nuevo miembro se una a su equipo y configure su cuenta.
              </DialogDescription>
            </DialogHeader>
            <Form {...inviteForm}>
              <form onSubmit={inviteForm.handleSubmit(onInviteSubmit)} className="space-y-4 pt-4">
                 <FormField
                  control={inviteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico del Invitado</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="invitado@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={inviteForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asignar Rol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un rol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TEAM_ROLES.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                <div className="flex flex-col">
                                  <span>{role.name}</span>
                                  <span className="text-xs text-muted-foreground">{role.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <DialogFooter>
                  <DialogClose asChild>
                      <Button type="button" variant="ghost">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Invitación
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
      </Dialog>

    </div>
  );
}
