'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, LifeBuoy, HelpCircle, Mail } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Soporte y Ayuda"
        description="Encuentre respuestas a sus preguntas y contáctenos."
      />
      <Card>
        <CardHeader>
          <CardTitle>Centro de Ayuda</CardTitle>
          <CardDescription>
            Estamos construyendo una base de conocimientos completa para ayudarle.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <HelpCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-lg font-semibold">Preguntas Frecuentes (FAQ)</h3>
                    <p className="text-muted-foreground">Encuentre respuestas rápidas a las preguntas más comunes sobre el uso de FiscalFlow.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 rounded-lg border p-4">
                <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="text-lg font-semibold">Contáctenos</h3>
                    <p className="text-muted-foreground">¿Necesita ayuda personalizada? Envíenos un correo y nuestro equipo le asistirá.</p>
                </div>
            </div>
        </CardContent>
      </Card>
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          El centro de ayuda, tutoriales y el sistema de contacto directo estarán disponibles próximamente. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
    </div>
  );
}
