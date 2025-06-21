'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2 } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';

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
      <ReportTable data={reportes608} />
    </div>
  );
}
