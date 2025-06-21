'use client';

import dynamic from 'next/dynamic';
import { useAppContext } from '@/context/app-provider';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Skeleton } from '@/components/ui/skeleton';
import { CtaBanner } from '@/components/dashboard/cta-banner';
import { Button } from '@/components/ui/button';
import { LifeBuoy, Zap } from 'lucide-react';
import Link from 'next/link';

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
  () => import('@/components/dashboard/analytics-charts'), 
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
      
      <CtaBanner
        title={<span>Contabilidad Inteligente es <span className="font-bold">trabajo en equipo.</span></span>}
        description="Descubre cómo nuestra plataforma facilita la colaboración entre clientes y contadores, permitiendo trabajar en tiempo real desde cualquier lugar."
        imageUrl="https://cdn1.alegra.com/websites/green-banner-background-2.webp"
      >
        <Button asChild size="lg" variant="secondary">
          <Link href="/dashboard/settings/team"><Zap className="mr-2"/>Invitar al Equipo</Link>
        </Button>
        <Button asChild size="lg" variant="ghost" className="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
          <Link href="/dashboard/support"><LifeBuoy className="mr-2"/>Contactar Soporte</Link>
        </Button>
      </CtaBanner>
      
      <QuickActions />

      <AnalyticsCharts reports={reports} />
      
      <RecentActivity reports={reports} />
    </div>
  );
}
