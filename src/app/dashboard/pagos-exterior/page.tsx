import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';

export default function PagosExteriorPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 609 - Pagos al Exterior"
        description="Gestione los reportes de pagos por servicios a proveedores en el exterior."
      />
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir el soporte completo para el Formato 609. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
       <Card>
        <CardHeader>
          <CardTitle>Funcionalidad Futura</CardTitle>
          <CardDescription>
            Próximamente podrá registrar los pagos a proveedores del exterior y generar el archivo TXT para el reporte 609.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Podrá detallar el RNC del proveedor, el tipo de servicio, el monto pagado y las retenciones aplicadas.</p>
        </CardContent>
      </Card>
    </div>
  );
}
