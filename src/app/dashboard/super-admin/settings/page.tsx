'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ajustes Generales"
        description="Configure los parámetros globales de la aplicación."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Registro y Autenticación</CardTitle>
                <CardDescription>Controle cómo los usuarios acceden a la aplicación.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Permitir Registro de Nuevos Usuarios</Label>
                        <p className="text-xs text-muted-foreground">
                            Si se desactiva, solo los usuarios existentes podrán iniciar sesión.
                        </p>
                    </div>
                    <Switch defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Requerir Verificación de Correo</Label>
                         <p className="text-xs text-muted-foreground">
                            Los nuevos usuarios deben verificar su correo antes de acceder.
                        </p>
                    </div>
                    <Switch defaultChecked={true} />
                </div>
                 <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Forzar Autenticación de Dos Pasos</Label>
                         <p className="text-xs text-muted-foreground">
                            Obliga a todos los usuarios a configurar 2FA para mayor seguridad.
                        </p>
                    </div>
                    <Switch defaultChecked={false} />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Mantenimiento</CardTitle>
                <CardDescription>Ponga la aplicación en modo de mantenimiento si es necesario.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Activar Modo Mantenimiento</Label>
                        <p className="text-xs text-muted-foreground">
                            Bloqueará el acceso a los usuarios y mostrará una página de mantenimiento.
                        </p>
                    </div>
                    <Switch defaultChecked={false} />
                </div>
                 <div className="space-y-2 mt-4">
                    <Label htmlFor="maintenance-message">Mensaje de Mantenimiento</Label>
                    <Input id="maintenance-message" defaultValue="Estamos realizando mejoras. Volveremos pronto." />
                </div>
            </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
          <Button>
              <Save className="mr-2 h-4 w-4" />
              Guardar Todos los Cambios
          </Button>
      </div>
    </div>
  );
}
