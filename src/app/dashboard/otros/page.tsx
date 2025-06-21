'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, FileText } from 'lucide-react';
import Link from 'next/link';

const otherForms = [
  { name: "623 - Retenciones del Estado", status: "Planificado", href: "#" },
  { name: "Envío de Datos de ITBIS", status: "Planificado", href: "#" },
  { name: "Norma 02-05 (Retenciones)", status: "Planificado", href: "#" },
  { name: "651 - Detalle de Cobros de Minerales", status: "Planificado", href: "#" },
  { name: "650 - Detalle de Ventas de Minerales", status: "Planificado", href: "#" },
  { name: "647 - Información Estadística", status: "Planificado", href: "#" },
  { name: "642 - Créditos Impuestos Exterior", status: "Planificado", href: "#" },
  { name: "641 - Retenciones Ganancia de Capital", status: "Planificado", href: "#" },
  { name: "616 - Comisiones Aseguradoras", status: "Planificado", href: "#" },
  { name: "649 - Transferencias Alcohol", status: "Planificado", href: "#" },
  { name: "648 - Transferencias Tabaco", status: "Planificado", href: "#" },
  { name: "643 - Herramienta Envío de Datos", status: "Planificado", href: "#" },
  { name: "632 - DIOR", status: "Planificado", href: "#" },
  { name: "629 - Siniestros Vehículos", status: "Planificado", href: "#" },
  { name: "644 - Compra Combustible", status: "Planificado", href: "#" },
  { name: "645 - Venta Combustible", status: "Planificado", href: "#" },
  { name: "612 - Compras de Divisas", status: "Planificado", href: "#" },
  { name: "613 - Ventas de Divisas", status: "Planificado", href: "#" },
  { name: "615 - Reembolsos o Pagos", status: "Planificado", href: "#" },
];

export default function OtrosFormatosPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Otros Formatos de Envío"
        description="Consulte otros formatos requeridos por la DGII."
      />
       <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir todos los formatos de envío de datos requeridos. ¡Vuelva pronto!
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Formatos Adicionales</CardTitle>
          <CardDescription>
            La implementación de estos formatos está planificada para futuras actualizaciones.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {otherForms.map((form, index) => (
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
