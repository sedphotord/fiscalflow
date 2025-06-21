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
          <SuperAdminSidebar />
          <div className="flex flex-col">
            <SuperAdminHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
              {children}
            </main>
          </div>
        </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/30 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
