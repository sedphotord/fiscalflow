'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2 } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';

export default function PagosExteriorPage() {
  const { reports } = useAppContext();
  const reportes609 = useMemo(() => reports.filter(r => r.type === '609'), [reports]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 609 - Pagos al Exterior"
        description="Gestione los reportes de pagos por servicios a proveedores en el exterior."
      >
        <Link href="/dashboard/pagos-exterior/new" passHref>
          <Button>
            <FilePlus2 className="mr-2 h-4 w-4" />
            Nuevo Reporte 609
          </Button>
        </Link>
      </PageHeader>
      <ReportTable data={reportes609} />
    </div>
  );
}
