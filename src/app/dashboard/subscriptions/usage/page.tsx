import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UsagePage() {
    const currentUsage = 120;
    const planLimit = 500;
    const usagePercentage = (currentUsage / planLimit) * 100;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Consumo del Plan"
        description="Revise el detalle del uso de su plan actual."
      />
      
       <Card>
        <CardHeader>
          <CardTitle>Consumo de Facturas (Mes Actual)</CardTitle>
          <CardDescription>
            Ha utilizado {currentUsage} de {planLimit} facturas incluidas en su plan Pro.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Progress value={usagePercentage} className="h-4" />
             <p className="text-sm text-muted-foreground mt-2">
                {usagePercentage.toFixed(0)}% de la cuota mensual utilizada.
            </p>
        </CardContent>
      </Card>

      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para mostrarle gráficos históricos de su consumo. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>

    </div>
  );
}
