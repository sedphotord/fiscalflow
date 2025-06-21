'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Settings, Zap } from 'lucide-react';
import Image from 'next/image';

const plugins = [
    {
        name: "Sincronización con QuickBooks",
        icon: "/quickbooks-icon.png",
        description: "Sincroniza automáticamente tus reportes 606 y 607 con tu cuenta de QuickBooks Online.",
        installed: true,
    },
    {
        name: "Conector de Zapier",
        icon: "/zapier-icon.png",
        description: "Conecta FiscalFlow con miles de otras aplicaciones a través de Zapier para automatizar flujos de trabajo.",
        installed: false,
    },
    {
        name: "Pasarela de Pagos Stripe",
        icon: "/stripe-icon.png",
        description: "Módulo para procesar los pagos de suscripción de los usuarios.",
        installed: true,
    }
]

export default function AdminPluginsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Plugins"
        description="Añada o elimine plugins y extensiones de la plataforma."
      />

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plugins.map((plugin) => (
            <Card key={plugin.name} className="flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className="w-12 h-12 flex-shrink-0 relative">
                      <Image src={plugin.icon} alt={`${plugin.name} icon`} layout="fill" objectFit="contain" data-ai-hint="logo"/>
                    </div>
                    <div className="flex-1">
                      <CardTitle>{plugin.name}</CardTitle>
                      <CardDescription>{plugin.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Placeholder for more content */}
                </CardContent>
                <CardFooter>
                    {plugin.installed ? (
                        <Button variant="outline" className="w-full">
                            <Settings className="mr-2 h-4 w-4" />
                            Configurar
                        </Button>
                    ) : (
                         <Button className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Instalar
                        </Button>
                    )}
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
