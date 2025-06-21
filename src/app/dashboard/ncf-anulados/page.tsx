import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';

export default function NcfAnuladosPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 608 - Comprobantes Anulados"
        description="Gestione los reportes de Números de Comprobante Fiscal (NCF) anulados."
      />
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir el soporte completo para el Formato 608. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
       <Card>
        <CardHeader>
          <CardTitle>Funcionalidad Futura</CardTitle>
          <CardDescription>
            Próximamente podrá registrar, gestionar y generar el archivo TXT para el reporte 608 directamente desde aquí.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Podrá ingresar los NCF anulados, el motivo de la anulación y generar el reporte mensual correspondiente.</p>
        </CardContent>
      </Card>
    </div>
  );
}
