
import { Suspense } from 'react';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';
import ManageFormsPageClient from './client';

export default function ManageFormsPage() {
    return (
        <Suspense fallback={<ReportTableSkeleton />}>
            <ManageFormsPageClient />
        </Suspense>
    )
}
