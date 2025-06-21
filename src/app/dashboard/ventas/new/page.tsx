import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';


export default function NewVentaPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nuevo Reporte 607"
        description="Complete la información para generar el reporte de ventas."
      />
      <Card>
        <CardHeader>
          <CardTitle>Detalle de Ventas</CardTitle>
          <CardDescription>
            Agregue cada una de las ventas de bienes o servicios.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Alert>
                <Construction className="h-4 w-4" />
                <AlertTitle>Página en Construcción</AlertTitle>
                <AlertDescription>
                    El formulario para el reporte 607 está siendo desarrollado y estará disponible próximamente.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
