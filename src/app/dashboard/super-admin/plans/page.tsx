
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import ManagePlansPageClient from './client';

export default function ManagePlansPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <ManagePlansPageClient />
    </Suspense>
  );
}
