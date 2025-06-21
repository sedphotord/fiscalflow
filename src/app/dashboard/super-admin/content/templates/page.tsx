'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCode, Home, Mail, Palette } from 'lucide-react';
import Link from 'next/link';

const templates = [
    {
        name: 'Landing Page',
        description: 'La página principal de bienvenida para nuevos visitantes.',
        icon: Home,
        editUrl: '#'
    },
    {
        name: 'Plantilla de Email - Bienvenida',
        description: 'El correo que se envía a los nuevos usuarios registrados.',
        icon: Mail,
        editUrl: '#'
    },
    {
        name: 'Plantilla de Email - Resumen Mensual',
        description: 'El correo con el resumen de actividad para los suscriptores.',
        icon: Mail,
        editUrl: '#'
    },
    {
        name: 'Página de Precios',
        description: 'La página que muestra los diferentes planes y precios.',
        icon: FileCode,
        editUrl: '#'
    }
]


export default function AdminTemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Editor de Plantillas"
        description="Modifique visualmente las plantillas de las páginas (ej. Landing Page)."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map(template => (
            <Card key={template.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <template.icon className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Link href={template.editUrl} passHref>
                        <Button variant="outline" className="w-full">
                            <Palette className="mr-2 h-4 w-4" />
                            Editar Plantilla
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
