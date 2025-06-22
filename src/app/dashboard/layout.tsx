'use client';

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';
import { BottomNav } from '@/components/dashboard/bottom-nav';
import { SuperAdminSidebar } from '@/components/dashboard/super-admin/super-admin-sidebar';
import { SuperAdminHeader } from '@/components/dashboard/super-admin/super-admin-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSuperAdmin = pathname.startsWith('/dashboard/super-admin');

  if (isSuperAdmin) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden md:block">
            <SuperAdminSidebar />
          </div>
          <div className="flex flex-col h-screen overflow-hidden">
            <SuperAdminHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/30 pb-20 md:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
