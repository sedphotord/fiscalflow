import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';
import { ReportTable } from '@/components/dashboard/report-table';
import { FilePlus2 } from 'lucide-react';

const mockReports = [
    { id: 'REP005', periodo: '202305', fechaCreacion: '2023-06-10', estado: 'Completado', url: '#' },
    { id: 'REP006', periodo: '202304', fechaCreacion: '2023-05-11', estado: 'Completado', url: '#' },
];

export default function VentasPage() {
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
      <ReportTable data={mockReports} />
    </div>
  );
}
