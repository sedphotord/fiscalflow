'use client';

import { useAppContext } from '@/context/app-provider';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';

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
