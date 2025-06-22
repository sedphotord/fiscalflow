'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-provider';
import Image from 'next/image';
import { Pencil } from 'lucide-react';

const InfoField = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="grid gap-1">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-base">{value || <span className="text-muted-foreground/70">No registrado</span>}</p>
  </div>
);

export default function EmpresaPage() {
  const { currentUser, showToast } = useAppContext();

  const handleEditClick = () => {
    showToast({
      title: "Función en desarrollo",
      description: "La edición de los datos de la empresa estará disponible próximamente.",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Datos de tu empresa"
        description="Conoce la información que tienes registrada sobre tu empresa."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información general</CardTitle>
            <Button variant="outline" onClick={handleEditClick}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-[150px_1fr] gap-8 pt-2">
            <div className="flex flex-col items-center gap-4 pt-4">
               <div className="relative group w-32 h-32">
                <Image
                    src="https://placehold.co/300x300.png"
                    alt="Logo de la empresa"
                    width={128}
                    height={128}
                    className="rounded-full object-cover border"
                    data-ai-hint="company logo"
                />
                 <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleEditClick}>
                    <Pencil className="h-6 w-6 text-white" />
                 </button>
               </div>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoField label="Razón social *" value={currentUser.name} />
              <InfoField label="RNC o Cédula" value={currentUser.rnc} />
              <InfoField label="Nombre comercial" value="No registrado" />
              <InfoField label="Teléfono *" value="+1 809-555-1234" />
              <InfoField label="Correo electrónico" value={currentUser.email} />
              <InfoField label="Sitio web" value="No registrado" />
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Dirección</CardTitle>
            <Button variant="outline" onClick={handleEditClick}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
             <div className="md:col-span-2">
                <InfoField label="Dirección" value="Av. Winston Churchill 123, Santo Domingo" />
            </div>
            <InfoField label="Provincia" value="Distrito Nacional" />
            <InfoField label="Municipio" value="Distrito Nacional" />
          </CardContent>
        </Card>

        <Card>
           <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información básica</CardTitle>
            <Button variant="outline" onClick={handleEditClick}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
            </Button>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoField label="Régimen" value="Régimen general" />
            <InfoField label="Sector" value="Tecnología" />
            <InfoField label="Número de empleados" value="1 - 15" />
            <InfoField label="Moneda *" value="Dominican Republic Peso (DOP)" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
