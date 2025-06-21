import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function AdminPaymentAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Análisis de Pagos"
        description="Visualice las métricas de pagos y suscripciones."
      />
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-96">
            <div className="text-center text-muted-foreground">
                <Construction className="mx-auto h-12 w-12" />
                <p className="mt-4">La sección de análisis de pagos está en construcción.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
