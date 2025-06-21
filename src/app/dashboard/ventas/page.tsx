'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2 } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';

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
      <ReportTable data={reportes607} />
    </div>
  );
}
