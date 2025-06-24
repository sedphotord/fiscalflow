
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import NewCompraPageClient from './client';

export default function NewCompraPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <NewCompraPageClient />
    </Suspense>
  );
}
