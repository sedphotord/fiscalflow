import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Ajustes"
        description="Gestione la configuración de su cuenta y de la aplicación."
      />
      <Card>
        <CardHeader>
          <CardTitle>Configuración de la Cuenta</CardTitle>
          <CardDescription>
            Aquí podrá cambiar su información de perfil, contraseña y preferencias.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert>
                <Construction className="h-4 w-4" />
                <AlertTitle>Página en Construcción</AlertTitle>
                <AlertDescription>
                    La sección de ajustes está siendo desarrollada y estará disponible próximamente.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
