
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import { FilePlus2, Plug } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';
import { CtaBanner } from '@/components/dashboard/cta-banner';

const ReportTable = dynamic(
  () => import('@/components/dashboard/report-table').then((mod) => mod.ReportTable),
  { 
    ssr: false,
    loading: () => <ReportTableSkeleton />,
  }
);

export default function VentasPage() {
  const { reports } = useAppContext();
  const reportes607 = useMemo(() => reports.filter(r => r.type === '607'), [reports]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 607 - Ventas de Bienes y Servicios"
        description="Gestione y genere sus reportes de ventas."
      >
        <Link href="/dashboard/ventas/new" passHref>
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nuevo Reporte 607
          </Button>
        </Link>
      </PageHeader>

      <CtaBanner
        title="Genera tu 607 sin complicaciones"
        description="Crea tus reportes de ventas de forma rápida y segura. Próximamente podrás conectar tus sistemas de facturación para una automatización completa."
        imageUrl="https://cdn1.alegra.com/websites/green-banner-background-2.webp"
      >
        <Button asChild size="lg" variant="secondary">
            <Link href="/dashboard/ventas/new"><FilePlus2 className="mr-2"/>Crear Reporte 607</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
            <Link href="/dashboard/integrations"><Plug className="mr-2"/>Ver Integraciones</Link>
        </Button>
      </CtaBanner>

      <ReportTable data={reportes607} />
    </div>
  );
}
