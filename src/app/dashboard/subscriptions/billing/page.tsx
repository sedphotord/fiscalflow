'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/app-provider';
import { BillingSchema } from '@/lib/schemas';

type FormValues = z.infer<typeof BillingSchema>;

export default function BillingPage() {
  const { showToast } = useAppContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      name: '',
      rnc: '',
      address: '',
      city: '',
      province: '',
      zip: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Billing data submitted:', data);
    showToast({
      title: 'Datos Guardados',
      description: 'Su información de facturación ha sido actualizada correctamente.',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Datos de Facturación"
        description="Gestione su información para la emisión de facturas."
      />
       <Card>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Información Fiscal</CardTitle>
                  <CardDescription>
                    Esta información aparecerá en sus facturas de servicio de FiscalFlow.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Nombre o Razón Social</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre completo o de la empresa" {...field} />
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
                            <Input placeholder="Su identificador fiscal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder="Calle, Número, Sector" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciudad</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: Santo Domingo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provincia</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione una provincia..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Distrito Nacional">Distrito Nacional</SelectItem>
                              <SelectItem value="Santo Domingo">Santo Domingo</SelectItem>
                              <SelectItem value="Santiago">Santiago</SelectItem>
                              <SelectItem value="La Altagracia">La Altagracia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código Postal</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej: 10101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit">Guardar Cambios</Button>
                </CardFooter>
            </form>
        </Form>
      </Card>
    </div>
  );
}
