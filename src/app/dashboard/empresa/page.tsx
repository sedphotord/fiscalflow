
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/app-provider';
import Image from 'next/image';
import { Pencil, Save, X, Upload } from 'lucide-react';
import { CompanyProfileSchema } from '@/lib/schemas';
import type { User } from '@/lib/types';

type FormValues = z.infer<typeof CompanyProfileSchema>;

export default function EmpresaPage() {
  const { currentUser, updateCurrentUser, showToast } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(CompanyProfileSchema),
    values: {
      name: currentUser.name || '',
      rnc: currentUser.rnc || '',
      commercialName: currentUser.commercialName || '',
      phone: currentUser.phone || '',
      email: currentUser.email || '',
      website: currentUser.website || '',
      addressStreet: currentUser.address?.street || '',
      addressCity: currentUser.address?.city || '',
      addressProvince: currentUser.address?.province || '',
      regime: currentUser.regime || '',
      sector: currentUser.sector || '',
      employeeCount: currentUser.employeeCount || '',
      currency: currentUser.currency || '',
    },
  });
  
  const onSubmit = (data: FormValues) => {
    const updatedUserData: Partial<User> = {
        name: data.name,
        rnc: data.rnc,
        email: data.email,
        commercialName: data.commercialName,
        phone: data.phone,
        website: data.website,
        address: {
            street: data.addressStreet,
            city: data.addressCity,
            province: data.addressProvince,
        },
        regime: data.regime,
        sector: data.sector,
        employeeCount: data.employeeCount,
        currency: data.currency,
    };
    updateCurrentUser(updatedUserData);
    showToast({
      title: 'Datos de la Empresa Guardados',
      description: 'Su información ha sido actualizada correctamente.',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
      setIsEditing(false);
      form.reset(); // Reset to default values (from context)
  }

  const handleLogoUpload = () => {
      showToast({ title: 'Función en desarrollo', description: 'La carga de logos estará disponible próximamente.' });
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
            <PageHeader
                title="Datos de tu empresa"
                description="Conoce la información que tienes registrada sobre tu empresa."
            >
                {isEditing ? (
                    <div className="flex gap-2">
                        <Button type="button" variant="ghost" onClick={handleCancel}>
                           <X className="mr-2 h-4 w-4" />
                           Cancelar
                        </Button>
                        <Button type="submit">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Cambios
                        </Button>
                    </div>
                ) : (
                    <Button type="button" onClick={() => setIsEditing(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                )}
            </PageHeader>

            <div className="space-y-6">
                <Card>
                <CardHeader>
                    <CardTitle>Información general</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-[150px_1fr] gap-8 pt-2">
                    <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="relative group w-32 h-32">
                        <Image
                            src={currentUser.logoUrl || "https://placehold.co/300x300.png"}
                            alt="Logo de la empresa"
                            width={128}
                            height={128}
                            className="rounded-full object-cover border"
                            data-ai-hint="company logo"
                        />
                        {isEditing && (
                            <Button type="button" size="sm" className="absolute bottom-0 right-0" onClick={handleLogoUpload}>
                                <Upload className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Razón social *</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="rnc" render={({ field }) => (<FormItem><FormLabel>RNC o Cédula</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="commercialName" render={({ field }) => (<FormItem><FormLabel>Nombre comercial</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo electrónico</FormLabel><FormControl><Input {...field} type="email" disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="website" render={({ field }) => (<FormItem><FormLabel>Sitio web</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Dirección</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField control={form.control} name="addressStreet" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Dirección</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="addressCity" render={({ field }) => (<FormItem><FormLabel>Municipio</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="addressProvince" render={({ field }) => (<FormItem><FormLabel>Provincia</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
                </Card>

                <Card>
                <CardHeader>
                    <CardTitle>Información básica</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField control={form.control} name="regime" render={({ field }) => (<FormItem><FormLabel>Régimen</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="sector" render={({ field }) => (<FormItem><FormLabel>Sector</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="employeeCount" render={({ field }) => (<FormItem><FormLabel>Número de empleados</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="currency" render={({ field }) => (<FormItem><FormLabel>Moneda *</FormLabel><FormControl><Input {...field} disabled={!isEditing} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
                </Card>
            </div>
            </div>
        </form>
    </Form>
  );
}
