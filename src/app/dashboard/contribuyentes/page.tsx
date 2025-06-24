
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import ContribuyentesPageClient from './client';

export default function ContribuyentesPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <ContribuyentesPageClient />
    </Suspense>
  );
}
