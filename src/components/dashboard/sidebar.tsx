'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  FileText,
  Settings,
  Package,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Formatos de Envío',
    icon: FileText,
    subItems: [
      { href: '/dashboard/compras', label: '606 - Compras', icon: ShoppingCart },
      { href: '/dashboard/ventas', label: '607 - Ventas', icon: DollarSign },
      { href: '/dashboard/otros', label: 'Otros Formatos', icon: Package },
    ],
  },
  { href: '/dashboard/settings', label: 'Ajustes', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Accordion type="multiple" className="w-full" defaultValue={['item-1']}>
              <Link
                href="/dashboard"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === '/dashboard' && 'bg-muted text-primary'
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  <FileText className="h-4 w-4" />
                  Formatos de Envío
                </AccordionTrigger>
                <AccordionContent className="pl-8">
                  <nav className="grid gap-1">
                    <Link
                      href="/dashboard/compras"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === '/dashboard/compras' && 'bg-muted text-primary'
                      )}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      606 - Compras
                    </Link>
                     <Link
                      href="/dashboard/ventas"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === '/dashboard/ventas' && 'bg-muted text-primary'
                      )}
                    >
                      <DollarSign className="h-4 w-4" />
                      607 - Ventas
                    </Link>
                     <Link
                      href="/dashboard/otros"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === '/dashboard/otros' && 'bg-muted text-primary'
                      )}
                    >
                      <Package className="h-4 w-4" />
                      Otros Formatos
                    </Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
               <Link
                href="/dashboard/settings"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === '/dashboard/settings' && 'bg-muted text-primary'
                )}
              >
                <Settings className="h-4 w-4" />
                Ajustes
              </Link>
            </Accordion>
          </nav>
        </div>
      </div>
    </div>
  );
}
