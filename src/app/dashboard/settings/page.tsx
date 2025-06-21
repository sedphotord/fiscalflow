
'use client';

import { useForm } from 'react-hook-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-provider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sun, Moon, Laptop, Building, ArrowRight, UserCog } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

const SettingsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  rnc: z.string().min(9, 'El RNC/Cédula debe tener 9 u 11 dígitos').max(11, 'El RNC/Cédula debe tener 9 u 11 dígitos'),
});

type FormValues = z.infer<typeof SettingsSchema>;

type ActivityLog = {
    id: number;
    member: string;
    action: string;
    date: Date;
};

export default function SettingsPage() {
  const { currentUser, updateCurrentUser, theme, setTheme, showToast } = useAppContext();
  const [isClient, setIsClient] = useState(false);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Generate mock data client-side to prevent hydration errors
    setActivityLog([
        { id: 1, member: 'Usuario Principal', action: 'Creó el reporte 606 para el período 202405', date: new Date() },
        { id: 2, member: 'asistente@fiscalflow.app', action: 'Escaneó 5 facturas en lote', date: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { id: 3, member: 'Usuario Principal', action: 'Actualizó los datos de la empresa "Cliente de Ejemplo"', date: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        { id: 4, member: 'asistente@fiscalflow.app', action: 'Generó reporte 607 para el período 202404', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        { id: 5, member: 'Usuario Principal', action: 'Cambió el tema de la aplicación a Oscuro', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    ]);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(SettingsSchema),
    values: {
      name: currentUser.name,
      rnc: currentUser.rnc,
    }
  });

  const onSubmit = (data: FormValues) => {
    updateCurrentUser(data);
    showToast({
      title: 'Ajustes Guardados',
      description: 'Su información ha sido actualizada.',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ajustes"
        description="Gestione la configuración de su cuenta y de la aplicación."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6">
            <Card>
            <CardHeader>
                <CardTitle>Perfil del Contribuyente Principal</CardTitle>
                <CardDescription>
                Esta información se usará como su perfil por defecto en los reportes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nombre o Razón Social</FormLabel>
                        <FormControl>
                            <Input placeholder="Su nombre completo o el de su empresa" {...field} />
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
                        <FormLabel>RNC o Cédula por Defecto</FormLabel>
                        <FormControl>
                            <Input placeholder="RNC/Cédula para los reportes" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Guardar Cambios</Button>
                </form>
                </Form>
            </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Seguridad</CardTitle>
                    <CardDescription>Configura tu contraseña y protege tu cuenta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" type="email" value={currentUser.email || 'cargando...'} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="flex items-center gap-2">
                            <Input id="password" type="password" value="••••••••••" disabled />
                            <Button variant="outline" onClick={() => showToast({ title: 'Función en desarrollo', description: 'La opción para cambiar contraseña estará disponible pronto.' })}>Cambiar</Button>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                    <h3 className="text-base font-semibold">Autenticación</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="font-medium">Autenticación en dos pasos</p>
                                <p className="text-sm text-muted-foreground">Añade una capa de seguridad extra a tu cuenta.</p>
                            </div>
                            <Switch
                            id="two-factor"
                            onCheckedChange={(checked) => showToast({ title: `Autenticación de dos pasos ${checked ? 'activada' : 'desactivada'}`, description: "Esta función estará disponible próximamente." })}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="font-medium">Inicio de sesión con Google</p>
                                <p className="text-sm text-muted-foreground">
                                {currentUser.email ? `Conectado como ${currentUser.email}` : 'Conecta tu cuenta para un inicio de sesión más rápido.'}
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => showToast({ title: 'Función en desarrollo', description: 'La conexión con Google estará disponible pronto.' })}>
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 74.7C309 93.5 280.7 80 248 80c-73.2 0-133.1 61.2-133.1 176s59.9 176 133.1 176c78.8 0 110.9-61.2 114.9-92.4h-114.9v-94.7h216.5c1.9 11.6 3.5 24.1 3.5 38.2z"></path></svg>
                            {currentUser.email ? 'Desconectar' : 'Conectar'}
                            </Button>
                        </div>
                    </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Operaciones</CardTitle>
                    <CardDescription>Registro de las últimas actividades realizadas en su cuenta.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Miembro</TableHead>
                                <TableHead>Acción</TableHead>
                                <TableHead>Fecha y Hora</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activityLog.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">{log.member}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>
                                        {isClient ? format(log.date, 'dd MMM, yyyy - hh:mm a', { locale: es }) : <Skeleton className="h-4 w-32" />}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
        <div className="lg:col-span-1 grid gap-6 content-start">
            <Card>
            <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>Personalice la apariencia de la aplicación.</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Tema</Label>
                <RadioGroup
                value={theme}
                onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}
                className="grid max-w-md grid-cols-1 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-1"
                >
                <FormItem>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label
                    htmlFor="light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    <Sun className="mb-3 h-6 w-6" />
                    Claro
                    </Label>
                </FormItem>
                <FormItem>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label
                    htmlFor="dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    <Moon className="mb-3 h-6 w-6" />
                    Oscuro
                    </Label>
                </FormItem>
                <FormItem>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label
                    htmlFor="system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    <Laptop className="mb-3 h-6 w-6" />
                    Sistema
                    </Label>
                </FormItem>
                </RadioGroup>
            </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Gestión de Empresas</CardTitle>
                    <CardDescription>Administre los perfiles de sus empresas y clientes.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/dashboard/settings/companies" passHref>
                        <div className="flex justify-between items-center p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <Building className="h-6 w-6 text-primary" />
                                <div>
                                    <h3 className="font-semibold">Empresas</h3>
                                    <p className="text-sm text-muted-foreground">Gestione sus perfiles.</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
