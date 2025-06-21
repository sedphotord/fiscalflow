'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Palette, Bot } from 'lucide-react';


export default function AdminTemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Plantillas"
        description="Modifique el contenido y la apariencia de las páginas públicas."
      />
       <Alert>
        <Palette className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          La creación de un editor visual completo es una tarea compleja. Por ahora, puede solicitar cambios específicos en el contenido o diseño de la página de inicio directamente a través del chat.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
            <CardTitle>¿Qué puedo cambiar?</CardTitle>
            <CardDescription>Puede solicitar cambios en textos, colores, imágenes o la disposición de los elementos en la página de inicio.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Por ejemplo, puede decir: <span className="italic">"Cambia el título principal a 'Tu Aliado Fiscal en la Nube'"</span> o <span className="italic">"Actualiza el color primario a un azul más oscuro"</span>.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
