import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, FileText } from 'lucide-react';

const annualForms = [
  "IR-2 - Sociedades", "IR-1 - Personas Físicas", "Activos - Declaración Jurada de Activos", "RST - Régimen Simplificado de Tributación",
  "ISFL - Instituciones Sin Fines de Lucro",
];

export default function DeclaracionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Declaraciones Anuales"
        description="Gestione las declaraciones juradas anuales de sus clientes."
      />
      <Card>
        <CardHeader>
          <CardTitle>Declaraciones Juradas Principales</CardTitle>
          <CardDescription>
            La implementación de estos formularios está planificada para futuras actualizaciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {annualForms.map((form, index) => (
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
          Estamos trabajando para incluir el soporte a las declaraciones anuales. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
    </div>
  );
}
