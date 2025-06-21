'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Bot,
  Plug,
  Settings,
  ArrowLeft,
  Palette,
  Newspaper,
  CreditCard,
  AlertTriangle,
  ShoppingBag,
  Users,
  Tags,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';

export function SuperAdminSidebar() {
  const pathname = usePathname();

  const isAnalyticsActive = pathname.startsWith('/dashboard/super-admin/analytics');
  const isContentActive = pathname.startsWith('/dashboard/super-admin/content');
  const isFeaturesActive = pathname.startsWith('/dashboard/super-admin/features');
  const isSettingsActive = pathname.startsWith('/dashboard/super-admin/settings');


  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard/super-admin" className="flex items-center gap-2 font-semibold">
            <Logo />
            <span className="text-sm text-muted-foreground ml-2">Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            
              <Link
                href="/dashboard/super-admin"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === '/dashboard/super-admin' && 'bg-accent text-accent-foreground'
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/super-admin/users"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/super-admin/users') && 'bg-accent text-accent-foreground'
                )}
              >
                <Users className="h-4 w-4" />
                Usuarios
              </Link>
               <Link
                href="/dashboard/super-admin/plans"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/super-admin/plans') && 'bg-accent text-accent-foreground'
                )}
              >
                <Tags className="h-4 w-4" />
                Gestión de Planes
              </Link>
              <Accordion type="multiple" className="w-full" defaultValue={
                [
                  isAnalyticsActive ? 'analytics' : '',
                  isContentActive ? 'content' : '',
                  isFeaturesActive ? 'features' : '',
                  isSettingsActive ? 'settings' : '',
                ].filter(Boolean)
                }>
              <AccordionItem value="analytics" className="border-none">
                 <AccordionTrigger className={cn(
                    "flex items-center w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                    isAnalyticsActive && 'text-primary'
                  )}>
                    <div className="flex items-center gap-3">
                        <BarChart2 className="h-4 w-4" />
                        <span>Analíticas</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link href="/dashboard/super-admin/analytics/payments" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/analytics/payments') && 'bg-accent text-accent-foreground')}><CreditCard className="h-4 w-4" />Pagos</Link>
                    <Link href="/dashboard/super-admin/analytics/errors" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/analytics/errors') && 'bg-accent text-accent-foreground')}><AlertTriangle className="h-4 w-4" />Errores</Link>
                    <Link href="/dashboard/super-admin/analytics/sales" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/analytics/sales') && 'bg-accent text-accent-foreground')}><ShoppingBag className="h-4 w-4" />Ventas</Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="content" className="border-none">
                <AccordionTrigger className={cn(
                    "flex items-center w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                    isContentActive && 'text-primary'
                  )}>
                   <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4" />
                        <span>Contenido</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link href="/dashboard/super-admin/content/templates" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/content/templates') && 'bg-accent text-accent-foreground')}><Palette className="h-4 w-4" />Plantillas</Link>
                    <Link href="/dashboard/super-admin/content/posts" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/content/posts') && 'bg-accent text-accent-foreground')}><Newspaper className="h-4 w-4" />Posts / Noticias</Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="features" className="border-none">
                 <AccordionTrigger className={cn(
                    "flex items-center w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                    isFeaturesActive && 'text-primary'
                  )}>
                    <div className="flex items-center gap-3">
                        <Bot className="h-4 w-4" />
                        <span>Funcionalidades</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link href="/dashboard/super-admin/features/functions" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/features/functions') && 'bg-accent text-accent-foreground')}>Funciones</Link>
                    <Link href="/dashboard/super-admin/features/plugins" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname.includes('/features/plugins') && 'bg-accent text-accent-foreground')}>Plugins</Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="settings" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline",
                  isSettingsActive && 'text-primary'
                )}>
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span>Ajustes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link href="/dashboard/super-admin/settings" className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary', pathname === '/dashboard/super-admin/settings' && 'bg-accent text-accent-foreground')}>Ajustes Generales</Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
             <Link
                href="/dashboard/super-admin/integrations"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/super-admin/integrations') && 'bg-accent text-accent-foreground'
                )}
              >
                <Plug className="h-4 w-4" />
                Integraciones
              </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
             <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Dashboard
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
