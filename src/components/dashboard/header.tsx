'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CircleUser,
  Menu,
  Search,
  Bell,
  PlusCircle,
  User,
  Settings,
  Shield,
  LifeBuoy,
  LogOut,
  CheckCircle,
  FileWarning,
  CalendarClock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppSidebar } from './sidebar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext } from '@/context/app-provider';
import { Progress } from '@/components/ui/progress';

export function Header() {
  const router = useRouter();
  const { currentUser } = useAppContext();
  const usagePercentage = (currentUser.invoiceUsage.current / currentUser.invoiceUsage.limit) * 100;

  const handleLogout = () => {
    // In a real app, you would clear the user's session here.
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
          <AppSidebar />
        </SheetContent>
      </Sheet>
      <div className="flex w-full flex-1 items-center justify-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative w-full max-w-sm cursor-pointer">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar reportes, RNC, NCF..."
                className="pl-10"
                readOnly
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div>
                <h4 className="mb-2 font-medium leading-none">
                  Búsqueda Global
                </h4>
                <p className="text-sm text-muted-foreground">
                  Escribe para buscar y aplica filtros.
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-10" />
              </div>
              <div className="grid gap-3">
                <h4 className="font-medium leading-none">Filtros</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-reports" />
                  <Label htmlFor="filter-reports">Reportes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-contribuyentes" />
                  <Label htmlFor="filter-contribuyentes">Contribuyentes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-ncf" />
                  <Label htmlFor="filter-ncf">NCF</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">Añadir Nuevo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Crear Nuevo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/compras/new">Reporte 606 (Compras)</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/ventas/new">Reporte 607 (Ventas)</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/companies">Contribuyente</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="sr-only">Ver notificaciones</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
              <div>
                <p className="font-medium">Reporte 606 Generado</p>
                <p className="text-xs text-muted-foreground">Período 202312 completado exitosamente.</p>
              </div>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex items-start gap-3">
              <FileWarning className="mt-1 h-4 w-4 text-yellow-500" />
              <div>
                <p className="font-medium">Límite de Consumo Cerca</p>
                <p className="text-xs text-muted-foreground">Has usado el 85% de tu cuota de facturas.</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-3">
              <CalendarClock className="mt-1 h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Recordatorio de Fecha Límite</p>
                <p className="text-xs text-muted-foreground">La declaración del IT-1 vence en 3 días.</p>
              </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
                {currentUser.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-2">
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>Consumo del Plan</span>
              <span>{currentUser.invoiceUsage.current}/{currentUser.invoiceUsage.limit} Facturas</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Seguridad</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
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
