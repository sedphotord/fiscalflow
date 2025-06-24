
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import AdminUsersPageClient from './client';

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<ReportTableSkeleton />}>
      <AdminUsersPageClient />
    </Suspense>
  );
}
