import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2 } from 'lucide-react';

const mockReports = [
    { id: 'REP001', periodo: '202305', fechaCreacion: '2023-06-10', estado: 'Completado', url: '#' },
    { id: 'REP002', periodo: '202304', fechaCreacion: '2023-05-11', estado: 'Completado', url: '#' },
    { id: 'REP003', periodo: '202303', fechaCreacion: '2023-04-09', estado: 'Completado', url: '#' },
    { id: 'REP004', periodo: '202306', fechaCreacion: '2023-07-01', estado: 'Borrador', url: '#' },
];

export default function ComprasPage() {
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
      <ReportTable data={mockReports} />
    </div>
  );
}
