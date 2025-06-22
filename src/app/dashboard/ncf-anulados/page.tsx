
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { FilePlus2 } from 'lucide-react';
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

export default function NcfAnuladosPage() {
  const { reports } = useAppContext();
  const reportes608 = useMemo(() => reports.filter(r => r.type === '608'), [reports]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 608 - Comprobantes Anulados"
        description="Gestione los reportes de Números de Comprobante Fiscal (NCF) anulados."
      >
        <Link href="/dashboard/ncf-anulados/new" passHref>
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nuevo Reporte 608
          </Button>
        </Link>
      </PageHeader>

      <CtaBanner
        title="Mantén tus registros al día"
        description="Registra fácilmente los comprobantes que has anulado durante el período para generar tu Formato 608 y cumplir con la normativa."
        imageUrl="https://cdn1.alegra.com/websites/green-banner-background-2.webp"
      >
          <Button asChild size="lg" variant="secondary">
              <Link href="/dashboard/ncf-anulados/new"><FilePlus2 className="mr-2"/>Crear Reporte 608</Link>
          </Button>
      </CtaBanner>

      <ReportTable data={reportes608} />
    </div>
  );
}
