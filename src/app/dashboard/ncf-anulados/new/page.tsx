
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import NewNcfAnuladoPageClient from './client';

export default function NewNcfAnuladoPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <NewNcfAnuladoPageClient />
    </Suspense>
  );
}
