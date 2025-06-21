
'use client';

import { useRouter } from 'next/navigation';
import {
  CircleUser,
  Menu,
  Settings,
  LifeBuoy,
  LogOut,
  Bell,
  Search,
  UserPlus,
  CreditCard,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function SuperAdminHeader() {
  const router = useRouter();
  const { currentUser } = useAppContext();

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
        <Popover>
          <PopoverTrigger asChild>
             <div className="relative w-full max-w-sm cursor-pointer">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar usuarios, RNC, email, planes..."
                className="pl-10"
                readOnly
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80">
             <div className="grid gap-4">
              <div>
                <h4 className="mb-2 font-medium leading-none">
                  Búsqueda de Administrador
                </h4>
                <p className="text-sm text-muted-foreground">
                  Busca en toda la base de datos de la aplicación.
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar por email, RNC, Cédula, plan..." className="pl-10" />
              </div>
               <div className="grid gap-3">
                <h4 className="font-medium leading-none">Filtros Avanzados</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-admin-users" />
                  <Label htmlFor="filter-admin-users">Usuarios</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-admin-teams" />
                  <Label htmlFor="filter-admin-teams">Equipos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filter-admin-plans" />
                  <Label htmlFor="filter-admin-plans">Planes</Label>
                </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-admin-payments" />
                  <Label htmlFor="filter-admin-payments">Facturas de Pago</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                  <Checkbox id="filter-admin-errors" />
                  <Label htmlFor="filter-admin-errors">Errores del Sistema</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative">
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
              <UserPlus className="mt-1 h-4 w-4 text-green-500" />
              <div>
                <p className="font-medium">Nuevo Usuario Registrado</p>
                <p className="text-xs text-muted-foreground">usuario.nuevo@ejemplo.com</p>
              </div>
            </DropdownMenuItem>
             <DropdownMenuItem className="flex items-start gap-3">
              <CreditCard className="mt-1 h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Pago Recibido</p>
                <p className="text-xs text-muted-foreground">Empresa ABC SRL - Plan Pro</p>
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
                {currentUser.name} (Admin)
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {currentUser.email}
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
