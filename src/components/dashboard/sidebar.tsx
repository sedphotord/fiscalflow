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
  ShieldCheck,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function AppSidebar() {
  const pathname = usePathname();

  // Determine if the accordion should be open by default
  const isEnvioActive = ['/compras', '/ventas', '/otros'].some(p => pathname.startsWith(`/dashboard${p}`));

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Accordion type="multiple" className="w-full" defaultValue={isEnvioActive ? ['formatos-envio'] : []}>
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
              <AccordionItem value="formatos-envio" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180",
                  isEnvioActive && 'text-primary'
                  )}>
                  <FileText className="h-4 w-4" />
                  Formatos de Envío
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link
                      href="/dashboard/compras"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/compras') && 'bg-muted text-primary'
                      )}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      606 - Compras
                    </Link>
                     <Link
                      href="/dashboard/ventas"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/ventas') && 'bg-muted text-primary'
                      )}
                    >
                      <DollarSign className="h-4 w-4" />
                      607 - Ventas
                    </Link>
                     <Link
                      href="/dashboard/otros"
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/otros') && 'bg-muted text-primary'
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
        <div className="mt-auto border-t">
             <div className="p-2 lg:p-4">
               <Link
                  href="/dashboard/super-admin"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === '/dashboard/super-admin' && 'bg-muted text-primary'
                  )}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
