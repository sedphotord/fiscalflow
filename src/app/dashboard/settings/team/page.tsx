
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import ManageTeamPageClient from './client';

export default function ManageTeamPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <ManageTeamPageClient />
    </Suspense>
  )
}
