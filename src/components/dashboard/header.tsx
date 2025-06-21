'use client';

import { useRouter } from 'next/navigation';
import { CircleUser, Menu, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
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


export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you would clear the user's session here.
    router.push('/');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
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
      <div className="w-full flex-1 flex justify-center">
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative w-full max-w-sm cursor-pointer">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                        <h4 className="font-medium leading-none mb-2">Búsqueda Global</h4>
                        <p className="text-sm text-muted-foreground">Escribe para buscar y aplica filtros.</p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar..."
                            className="pl-10"
                        />
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
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Ver notificaciones</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Ajustes</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard/support')}>Soporte</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
