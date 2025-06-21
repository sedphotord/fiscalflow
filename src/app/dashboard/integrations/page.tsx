'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Power } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import * as React from 'react';

// --- SVG Icons for Integrations ---
const GoogleSheetsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...props}>
        <path fill="#34A853" d="M725.333 128H298.667A106.667 106.667 0 0 0 192 234.667v554.666A106.667 106.667 0 0 0 298.667 896h426.666A106.667 106.667 0 0 0 832 789.333V234.667A106.667 106.667 0 0 0 725.333 128z"/>
        <path fill="#FFFFFF" d="M682.667 469.333h-128v85.334h128v42.666h-128v85.334h128v42.666H469.333V469.333h213.334zm-256 0v-85.333h85.333v85.333h-85.333zm128 170.667H426.667v85.333h128v-85.333zm-128-85.334H426.667v-85.333h128v85.333z"/>
    </svg>
);

const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 512 512" {...props}>
        <path fill="#EA4335" d="M48 392V120.3L248.4 288a48 48 0 0 0 55.2 0L504 120.3V392c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40z"/>
        <path fill="#4285F4" d="m504 120.3-255.6 167.7a48.002 48.002 0 0 1-55.2 0L48 120.3V120c0-22.1 17.9-40 40-40h416c22.1 0 40 17.9 40 40v.3z"/>
        <path fill="#FBBC04" d="m48 120.3 120 78.7L48 80v40.3z"/>
        <path fill="#34A853" d="m504 120.3-120 78.7L504 80v40.3z"/>
    </svg>
);

const GoogleCalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 512 512" {...props}>
        <path fill="#4285F4" d="M452 40h-28V12c0-6.6-5.4-12-12-12s-12 5.4-12 12v28H112V12c0-6.6-5.4-12-12-12s-12 5.4-12 12v28H60C26.9 40 0 66.9 0 100v352c0 33.1 26.9 60 60 60h392c33.1 0 60-26.9 60-60V100c0-33.1-26.9-60-60-60z"/>
        <path fill="#FFFFFF" d="M60 492c-22.1 0-40-17.9-40-40V192h472v260c0 22.1-17.9 40-40 40H60z"/>
        <path fill="#A6C9FF" d="M128 248h64v64h-64zM224 248h64v64h-64zM320 248h64v64h-64zM128 344h64v64h-64zM224 344h64v64h-64zM320 344h64v64h-64z"/>
        <path fill="#4285F4" d="M112 168h288v24H112z"/>
        <text x="256" y="150" fill="#fff" textAnchor="middle" fontSize="90" fontWeight="bold">31</text>
    </svg>
);


const integrations = [
    {
        name: "Google Sheets",
        icon: GoogleSheetsIcon,
        description: "Sincroniza tus reportes 606 y 607 directamente con tus hojas de cálculo de Google para un análisis más profundo.",
        comingSoon: false,
    },
    {
        name: "Gmail",
        icon: GmailIcon,
        description: "Envía tus reportes generados por correo electrónico a tus clientes o a ti mismo con un solo clic desde la plataforma.",
        comingSoon: false,
    },
    {
        name: "Google Calendar",
        icon: GoogleCalendarIcon,
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
                    <integration.icon className="h-8 w-8" />
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
