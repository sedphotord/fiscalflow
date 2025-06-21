'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, Mail, Calendar, Power } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';

const integrations = [
    {
        name: "Google Sheets",
        icon: Sheet,
        description: "Sincroniza tus reportes 606 y 607 directamente con tus hojas de cálculo de Google para un análisis más profundo.",
        comingSoon: false,
    },
    {
        name: "Gmail",
        icon: Mail,
        description: "Envía tus reportes generados por correo electrónico a tus clientes o a ti mismo con un solo clic desde la plataforma.",
        comingSoon: false,
    },
    {
        name: "Google Calendar",
        icon: Calendar,
        description: "Crea recordatorios automáticos en tu calendario para las fechas de vencimiento de impuestos y nunca olvides una declaración.",
        comingSoon: true,
    }
]

export default function IntegrationsPage() {
    const { showToast } = useAppContext();

    const handleConnect = (name: string) => {
        showToast({
            title: `Conectando con ${name}...`,
            description: `La integración con ${name} estará disponible próximamente.`
        });
    }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Integraciones"
        description="Conecta FiscalFlow con tus herramientas favoritas para automatizar tu flujo de trabajo."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
            <Card key={integration.name}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <integration.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{integration.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <CardDescription>{integration.description}</CardDescription>
                    <Button 
                        variant="outline" 
                        className="mt-auto"
                        onClick={() => handleConnect(integration.name)}
                        disabled={integration.comingSoon}
                    >
                        <Power className="mr-2 h-4 w-4" />
                        {integration.comingSoon ? "Próximamente" : "Conectar"}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
