'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScanLine, FolderSearch, History, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
    {
        href: '/dashboard/compras/new',
        icon: ScanLine,
        title: 'Escanear Facturas',
        description: 'Sube nuevas facturas o escanea con la cámara'
    },
    {
        href: '/dashboard/compras',
        icon: FolderSearch,
        title: 'Ver Formularios',
        description: 'Revisa y descarga formularios DGII'
    },
    {
        href: '/dashboard/compras',
        icon: History,
        title: 'Historial',
        description: 'Consulta facturas procesadas anteriormente'
    },
    {
        href: '/dashboard/compras/new',
        icon: Upload,
        title: 'Subir Archivo',
        description: 'Importa PDFs o imágenes desde tu dispositivo'
    }
];

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Inicie sus tareas más comunes con un solo clic.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {actions.map((action) => (
                         <Link key={action.title} href={action.href} passHref>
                            <Button className="w-full h-auto py-4 px-4 flex-col items-start text-left" variant="outline">
                                <div className="flex items-center gap-3">
                                    <action.icon className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-base">{action.title}</span>
                                </div>
                                <p className="text-sm font-normal text-muted-foreground mt-2 pl-[36px] whitespace-normal">{action.description}</p>
                            </Button>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
