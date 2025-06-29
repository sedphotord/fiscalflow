
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
  Shield,
  Users,
  BookMarked,
  LifeBuoy,
  FileX,
  Plane,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Gauge,
  Wallet,
  Plug,
  Calculator,
  Percent,
  Building2,
  TrendingUp,
  Landmark,
  AlertTriangle,
  Archive,
  UploadCloud,
  FileEdit,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface AppSidebarProps {
  onLinkClick?: () => void;
}

export function AppSidebar({ onLinkClick }: AppSidebarProps) {
  const pathname = usePathname();

  const isEnvioActive = ['/compras', '/ventas', '/ncf-anulados', '/pagos-exterior', '/otros', '/batch-upload', '/forms'].some(p => pathname.startsWith(`/dashboard${p}`));
  const isDeclaracionesActive = pathname.startsWith('/dashboard/declaraciones');
  const isSuscripcionesActive = pathname.startsWith('/dashboard/subscriptions');
  const isCalculatorsActive = pathname.startsWith('/dashboard/calculators');
  const isSettingsActive = pathname.startsWith('/dashboard/settings');

  const calculators = [
    { title: 'Retenciones', icon: Percent, href: '/dashboard/calculators/retenciones', isImplemented: true },
    { title: 'Constitución de Compañías', icon: Building2, href: '/dashboard/calculators/constitucion-companias', isImplemented: true },
    { title: 'Variación Capital Social', icon: TrendingUp, href: '/dashboard/calculators/variacion-capital', isImplemented: true },
    { title: 'Transferencia Inmobiliaria', icon: Landmark, href: '#', isImplemented: false },
    { title: 'Recargos e Intereses', icon: AlertTriangle, href: '#', isImplemented: false },
    { title: 'Régimen Simplificado (RST)', icon: FileText, href: '#', isImplemented: false },
  ];

  return (
    <div className="border-r bg-background">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={onLinkClick}>
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            
              <Link
                href="/dashboard"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === '/dashboard' && 'bg-muted text-primary'
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/reports"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/reports') && 'bg-muted text-primary'
                )}
              >
                <Archive className="h-4 w-4" />
                Historial de Reportes
              </Link>
              <Accordion type="multiple" className="w-full" defaultValue={
                [
                  isEnvioActive ? 'formatos-envio' : '',
                  isDeclaracionesActive ? 'declaraciones-anuales' : '',
                  isSuscripcionesActive ? 'suscripciones' : '',
                  isCalculatorsActive ? 'calculators' : '',
                  isSettingsActive ? 'settings' : '',
                ].filter(Boolean)
                }>
              <AccordionItem value="formatos-envio" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180",
                  isEnvioActive && 'text-primary'
                  )}>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" />
                    <span>Formatos de Envío</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                  <nav className="grid gap-1">
                    <Link
                      href="/dashboard/compras"
                      onClick={onLinkClick}
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
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/ventas') && 'bg-muted text-primary'
                      )}
                    >
                      <DollarSign className="h-4 w-4" />
                      607 - Ventas
                    </Link>
                    <Link
                      href="/dashboard/ncf-anulados"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/ncf-anulados') && 'bg-muted text-primary'
                      )}
                    >
                      <FileX className="h-4 w-4" />
                      608 - NCF Anulados
                    </Link>
                    <Link
                      href="/dashboard/pagos-exterior"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/pagos-exterior') && 'bg-muted text-primary'
                      )}
                    >
                      <Plane className="h-4 w-4" />
                      609 - Pagos al Exterior
                    </Link>
                     <Link
                      href="/dashboard/otros"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/otros') && 'bg-muted text-primary'
                      )}
                    >
                      <Package className="h-4 w-4" />
                      Otros Formatos
                    </Link>
                    <Link
                      href="/dashboard/batch-upload"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/batch-upload') && 'bg-muted text-primary'
                      )}
                    >
                      <UploadCloud className="h-4 w-4" />
                      Cargas en Lote
                    </Link>
                     <Link
                      href="/dashboard/forms"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/forms') && 'bg-muted text-primary'
                      )}
                    >
                      <FileEdit className="h-4 w-4" />
                      Mis Formularios
                    </Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="declaraciones-anuales" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180",
                  isDeclaracionesActive && 'text-primary'
                  )}>
                  <div className="flex items-center gap-3">
                    <BookMarked className="h-4 w-4" />
                    <span>Declaraciones Anuales</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                   <nav className="grid gap-1">
                    <Link
                      href="/dashboard/declaraciones"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/declaraciones') && 'bg-muted text-primary'
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      IR-2 / Declaración Anual
                    </Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="calculators" className="border-none">
                  <AccordionTrigger className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180",
                    isCalculatorsActive && 'text-primary'
                    )}>
                    <div className="flex items-center gap-3">
                      <Calculator className="h-4 w-4" />
                      <span>Calculadoras</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pt-1">
                    <nav className="grid gap-1">
                      {calculators.map(calc => (
                        <Link
                          key={calc.title}
                          href={calc.isImplemented ? calc.href : '/dashboard/calculators'}
                          onClick={onLinkClick}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            calc.isImplemented && pathname.startsWith(calc.href) && 'bg-muted text-primary',
                          )}
                        >
                          <calc.icon className="h-4 w-4" />
                          {calc.title}
                        </Link>
                      ))}
                    </nav>
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Link
                href="/dashboard/contribuyentes"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/contribuyentes') && 'bg-muted text-primary'
                )}
              >
                <Users className="h-4 w-4" />
                Contribuyentes
              </Link>
            <Link
                href="/dashboard/validator"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/validator') && 'bg-muted text-primary'
                )}
              >
                <ShieldCheck className="h-4 w-4" />
                Validador DGII
              </Link>
            <Link
                href="/dashboard/settings/team"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/settings/team') && 'bg-muted text-primary'
                )}
              >
                <Users className="h-4 w-4" />
                Equipo
            </Link>
            <Link
                href="/dashboard/empresa"
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname.startsWith('/dashboard/empresa') && 'bg-muted text-primary'
                )}
              >
                <Building2 className="h-4 w-4" />
                Empresa
            </Link>
              <Accordion type="multiple" className="w-full" defaultValue={
                [
                  isSuscripcionesActive ? 'suscripciones' : ''
                ].filter(Boolean)
                }>
              <AccordionItem value="suscripciones" className="border-none">
                <AccordionTrigger className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline [&[data-state=open]>svg]:rotate-180",
                  isSuscripcionesActive && 'text-primary'
                  )}>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4 w-4" />
                    <span>Suscripciones</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pt-1">
                   <nav className="grid gap-1">
                    <Link
                      href="/dashboard/subscriptions"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname === '/dashboard/subscriptions' && 'bg-muted text-primary'
                      )}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Resumen
                    </Link>
                     <Link
                      href="/dashboard/subscriptions/usage"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/subscriptions/usage') && 'bg-muted text-primary'
                      )}
                    >
                      <Gauge className="h-4 w-4" />
                      Consumo
                    </Link>
                    <Link
                      href="/dashboard/subscriptions/payment-methods"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/subscriptions/payment-methods') && 'bg-muted text-primary'
                      )}
                    >
                      <Wallet className="h-4 w-4" />
                      Métodos de Pago
                    </Link>
                    <Link
                      href="/dashboard/subscriptions/billing"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/subscriptions/billing') && 'bg-muted text-primary'
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      Datos de Facturación
                    </Link>
                    <Link
                      href="/dashboard/subscriptions/buy"
                      onClick={onLinkClick}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/dashboard/subscriptions/buy') && 'bg-muted text-primary'
                      )}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Comprar Facturas
                    </Link>
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="/dashboard/integrations"
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname.startsWith('/dashboard/integrations') && 'bg-muted text-primary'
              )}
            >
              <Plug className="h-4 w-4" />
              Integraciones
            </Link>
             <Link
              href="/dashboard/settings"
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname.startsWith('/dashboard/settings') && !pathname.startsWith('/dashboard/settings/team') && 'bg-muted text-primary'
              )}
            >
              <Settings className="h-4 w-4" />
              Ajustes
            </Link>
             <Link
              href="/dashboard/support"
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname.startsWith('/dashboard/support') && 'bg-muted text-primary'
              )}
            >
              <LifeBuoy className="h-4 w-4" />
              Soporte
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t">
             <div className="p-2 lg:p-4">
               <Link
                  href="/dashboard/super-admin"
                  onClick={onLinkClick}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === '/dashboard/super-admin' && 'bg-muted text-primary'
                  )}
                >
                  <Shield className="h-4 w-4" />
                  Admin Panel
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
