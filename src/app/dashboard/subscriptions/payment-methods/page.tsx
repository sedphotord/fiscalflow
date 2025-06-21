import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';

export default function PaymentMethodsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Métodos de Pago"
        description="Añada y gestione sus tarjetas de crédito o débito."
      />
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para habilitar la gestión de métodos de pago. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
       <Card>
        <CardHeader>
          <CardTitle>Funcionalidad Futura</CardTitle>
          <CardDescription>
            Próximamente podrá agregar y seleccionar su método de pago preferido para sus suscripciones y compras.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Podrá guardar de forma segura sus tarjetas para procesar pagos automáticamente.</p>
        </CardContent>
      </Card>
    </div>
  );
}
