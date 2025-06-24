
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import NewVentaPageClient from './client';

export default function NewVentaPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <NewVentaPageClient />
    </Suspense>
  );
}
