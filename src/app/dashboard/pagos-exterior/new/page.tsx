
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import NewPagoExteriorPageClient from './client';

export default function NewPagoExteriorPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <NewPagoExteriorPageClient />
    </Suspense>
  );
}
