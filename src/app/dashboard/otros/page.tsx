import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, FileText } from 'lucide-react';

const otherForms = [
  "623 - Retenciones del Estado", "Formato de Envío de ITBIS", "Norma 2-05 (Retenciones a Terceros)",
  "651 - Detalle de Cobros de Minerales", "650 - Detalle de Ventas de Minerales", "647 - Información Estadística",
  "642 - Créditos Impuestos Exterior", "641 - Retenciones Ganancia de Capital", "616 - Comisiones Aseguradoras",
  "609 - Pagos al Exterior", "608 - NCF Anulados", "649 - Transferencias Alcohol", "648 - Transferencias Tabaco",
  "643 - Herramienta Envío de Datos", "632 - DIOR", "629 - Siniestros Vehículos", "644 - Compra Combustible",
  "645 - Venta Combustible", "612 - Compras de Divisas", "613 - Ventas de Divisas", "615 - Reembolsos o Pagos"
];

export default function OtrosFormatosPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Otros Formatos de Envío"
        description="Consulte otros formatos requeridos por la DGII."
      />
      <Card>
        <CardHeader>
          <CardTitle>Formatos Adicionales</CardTitle>
          <CardDescription>
            La implementación de estos formatos está planificada para futuras actualizaciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherForms.map((form, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg border p-3 text-muted-foreground">
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{form}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir todos los formatos de envío de datos requeridos. ¡Vuelva pronto!
        </AlertDescription>
      </Alert>
    </div>
  );
}
