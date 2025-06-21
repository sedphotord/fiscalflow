'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Trash2, Send } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InviteTeamMemberSchema } from '@/lib/schemas';
import type { TeamMember, TeamMemberRole } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type FormValues = z.infer<typeof InviteTeamMemberSchema>;

export default function ManageTeamPage() {
  const { teamMembers, inviteTeamMember, deleteTeamMember, currentUser } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const planLimits = {
    'Gratis': 1,
    'Pro': 5,
    'Despacho': Infinity
  };

  const currentMemberCount = 1 + teamMembers.length; // Owner + team members
  const memberLimit = planLimits[currentUser.plan];
  const canAddMembers = currentMemberCount < memberLimit;

  const form = useForm<FormValues>({
    resolver: zodResolver(InviteTeamMemberSchema),
    defaultValues: {
      email: '',
      role: 'Editor',
    },
  });

  const onSubmit = (data: FormValues) => {
    inviteTeamMember(data.email, data.role);
    setIsDialogOpen(false);
    form.reset();
  };

  const getStatusVariant = (status: TeamMember['status']) => {
    return status === 'Activo' ? 'default' : 'secondary';
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestionar Equipo"
        description="Invite y gestione los miembros de su equipo y sus permisos."
      >
        <Button onClick={() => setIsDialogOpen(true)} disabled={!canAddMembers}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Invitar Miembro
        </Button>
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
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invitar Nuevo Miembro</DialogTitle>
              <DialogDescription>
                Ingrese el correo electrónico y asigne un rol al nuevo miembro.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Editor">Editor</SelectItem>
                            <SelectItem value="Solo Lectura">Solo Lectura</SelectItem>
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
