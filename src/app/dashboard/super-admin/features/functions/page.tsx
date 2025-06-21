'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const features = [
  { id: 'ai-scanning', name: 'Escaneo de Facturas con IA', description: 'Permite a los usuarios subir y escanear facturas usando OCR.', enabled: true },
  { id: '607-generation', name: 'Generación de Formato 607', description: 'Habilita la creación de reportes de ventas.', enabled: true },
  { id: 'batch-scanning', name: 'Escaneo en Lote', description: 'Permite a los usuarios del plan Pro escanear múltiples facturas a la vez.', enabled: true },
  { id: 'api-access', name: 'Acceso a la API', description: 'Habilita el acceso a la API para planes de Despacho.', enabled: false },
  { id: 'user-registration', name: 'Registro de Nuevos Usuarios', description: 'Permite que nuevos usuarios se registren en la plataforma.', enabled: true },
  { id: 'google-login', name: 'Inicio de Sesión con Google', description: 'Permite el inicio de sesión usando cuentas de Google.', enabled: true },
];

export default function AdminFunctionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Funciones (Feature Flags)"
        description="Active, desactive o configure las funciones de la aplicación en tiempo real."
      />
      <Card>
        <CardHeader>
            <CardTitle>Funciones Globales</CardTitle>
            <CardDescription>Los cambios aquí afectan a todos los usuarios de la plataforma.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            {features.map(feature => (
                <div key={feature.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor={feature.id} className="text-base font-medium">{feature.name}</Label>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    <Switch id={feature.id} defaultChecked={feature.enabled} />
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
