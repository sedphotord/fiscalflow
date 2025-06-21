import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Datos de Facturación"
        description="Gestione su información para la emisión de facturas."
      />
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para que pueda gestionar sus datos de facturación. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
       <Card>
        <CardHeader>
          <CardTitle>Funcionalidad Futura</CardTitle>
          <CardDescription>
            Próximamente podrá editar su dirección, RNC y otra información fiscal para sus facturas de servicio.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Sus facturas se emitirán automáticamente con los datos que configure aquí.</p>
        </CardContent>
      </Card>
    </div>
  );
}
