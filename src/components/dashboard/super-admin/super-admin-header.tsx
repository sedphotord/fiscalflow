'use client';

import { useRouter } from 'next/navigation';
import {
  CircleUser,
  Menu,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SuperAdminSidebar } from './super-admin-sidebar';
import { useAppContext } from '@/context/app-provider';

export function SuperAdminHeader() {
  const router = useRouter();
  const { settings } = useAppContext();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SuperAdminSidebar />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Placeholder for header content like breadcrumbs */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {settings.name} (Admin)
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {settings.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <DropdownMenuItem onClick={() => router.push('/dashboard/super-admin/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Ajustes de Admin</span>
            </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/support')}>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Soporte</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
