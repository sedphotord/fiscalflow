'use client';

import dynamic from 'next/dynamic';
import { useAppContext } from '@/context/app-provider';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Skeleton } from '@/components/ui/skeleton';

function AnalyticsChartsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Skeleton className="h-[380px] lg:col-span-1" />
      <Skeleton className="h-[380px] lg:col-span-2" />
      <Skeleton className="h-[380px] lg:col-span-3" />
    </div>
  );
}

const AnalyticsCharts = dynamic(
  () => import('@/components/dashboard/analytics-charts').then(mod => mod.AnalyticsCharts), 
  { 
    ssr: false,
    loading: () => <AnalyticsChartsSkeleton />
  }
);

export default function DashboardPage() {
  const { reports } = useAppContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Visión General</h1>
      </div>
      
      <QuickActions />
      
      <AnalyticsCharts reports={reports} />
      
      <RecentActivity reports={reports} />
    </div>
  );
}
