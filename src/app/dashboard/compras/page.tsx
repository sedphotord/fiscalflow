
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2, Camera, UploadCloud } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';
import { CtaBanner } from '@/components/dashboard/cta-banner';

export default function ComprasPage() {
  const { reports } = useAppContext();
  const reportes606 = useMemo(() => reports.filter(r => r.type === '606'), [reports]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 606 - Compras de Bienes y Servicios"
        description="Gestione y genere sus reportes de compras."
      >
        <Link href="/dashboard/compras/new" passHref>
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nuevo Reporte 606
          </Button>
        </Link>
      </PageHeader>
      
      <CtaBanner
        title="Acelera tu registro de compras con la IA"
        description="Utiliza nuestro escáner inteligente para extraer datos de tus facturas automáticamente. Sube una foto o PDF y olvídate de la digitación manual."
        imageUrl="https://placehold.co/1200x200.png"
      >
        <Button asChild size="lg" variant="secondary">
            <Link href="/dashboard/compras/new?action=scan"><Camera className="mr-2"/>Escanear Factura</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
            <Link href="/dashboard/batch-upload"><UploadCloud className="mr-2"/>Cargas en Lote</Link>
        </Button>
      </CtaBanner>

      <ReportTable data={reportes606} />
    </div>
  );
}
