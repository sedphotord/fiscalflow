
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { FilePlus2, Camera, UploadCloud } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';
import { CtaBanner } from '@/components/dashboard/cta-banner';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';

const ReportTable = dynamic(
  () => import('@/components/dashboard/report-table').then((mod) => mod.ReportTable),
  { 
    ssr: false,
    loading: () => <ReportTableSkeleton />,
  }
);

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
        imageUrl="https://cdn1.alegra.com/websites/green-banner-background-2.webp"
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
