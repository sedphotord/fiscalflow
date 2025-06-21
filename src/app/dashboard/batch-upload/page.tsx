
'use client';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, FileUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BatchUploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Carga en Lote"
        description="Sube múltiples documentos o datos desde plantillas."
      />
       <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para habilitar la carga masiva de facturas y datos desde plantillas de Excel/CSV. Esta funcionalidad te permitirá procesar cientos de documentos en minutos. ¡Gracias por tu paciencia!
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
          <CardDescription>
            Funcionalidades que estarán disponibles en esta sección.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border p-4">
                <FileUp className="h-8 w-8 text-primary"/>
                <div>
                    <h3 className="font-semibold">Carga desde Plantillas</h3>
                    <p className="text-sm text-muted-foreground">Sube tus datos de compras y ventas usando nuestros archivos de Excel o CSV.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
                <FileUp className="h-8 w-8 text-primary"/>
                <div>
                    <h3 className="font-semibold">Carga de Múltiples Archivos</h3>
                    <p className="text-sm text-muted-foreground">Arrastra y suelta múltiples archivos PDF o imágenes de facturas para escanearlas a la vez.</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
