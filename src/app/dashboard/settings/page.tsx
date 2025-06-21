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
import { Sun, Moon, Laptop, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';


const SettingsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  rnc: z.string().min(9, 'El RNC/Cédula debe tener 9 u 11 dígitos').max(11, 'El RNC/Cédula debe tener 9 u 11 dígitos'),
});

type FormValues = z.infer<typeof SettingsSchema>;

export default function SettingsPage() {
  const { settings, updateSettings, theme, setTheme, showToast } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(SettingsSchema),
    values: {
      name: settings.name,
      rnc: settings.rnc,
    }
  });

  const onSubmit = (data: FormValues) => {
    updateSettings(data);
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
      <div className="grid gap-6 lg:grid-cols-2">
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
            <CardTitle>Apariencia</CardTitle>
            <CardDescription>Personalice la apariencia de la aplicación.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Tema</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}
              className="grid max-w-md grid-cols-1 gap-4 pt-2 sm:grid-cols-3"
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
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Gestión de Empresas</CardTitle>
                <CardDescription>Administre múltiples perfiles de empresa para sus clientes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/dashboard/settings/companies" passHref>
                    <div className="flex justify-between items-center p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Building className="h-6 w-6 text-primary" />
                            <div>
                                <h3 className="font-semibold">Gestionar Perfiles de Empresas</h3>
                                <p className="text-sm text-muted-foreground">Añada, edite y elimine los perfiles de las empresas que gestiona.</p>
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </Link>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
