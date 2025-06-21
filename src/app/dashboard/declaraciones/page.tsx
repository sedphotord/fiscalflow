'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, FileText } from 'lucide-react';
import Link from 'next/link';

const annualForms = [
  { name: "IR-2 - Sociedades", status: "Planificado", href: "#" },
  { name: "IR-1 - Personas Físicas", status: "Planificado", href: "#" },
  { name: "Activos - Declaración Jurada", status: "Planificado", href: "#" },
  { name: "RST - Régimen Simplificado", status: "Planificado", href: "#" },
  { name: "ISFL - Instituciones Sin Fines de Lucro", status: "Planificado", href: "#" },
];

export default function DeclaracionesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Declaraciones Anuales"
        description="Gestione las declaraciones juradas anuales de sus clientes."
      />
       <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir el soporte a las declaraciones anuales. La interfaz para cada una se habilitará progresivamente. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Declaraciones Juradas Principales</CardTitle>
          <CardDescription>
            La implementación de estos formularios está planificada para futuras actualizaciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {annualForms.map((form, index) => (
            <Link href={form.href} key={index}>
              <div className="flex items-center justify-between gap-3 rounded-lg border p-4 text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{form.name}</span>
                  </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
