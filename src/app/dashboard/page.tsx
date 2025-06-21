'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus2, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';

export default function DashboardPage() {
  const { reports } = useAppContext();

  const count606 = reports.filter(r => r.type === '606').length;
  const count607 = reports.filter(r => r.type === '607').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes 606</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count606}</div>
            <p className="text-xs text-muted-foreground">Reportes de compras creados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes 607</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count607}</div>
            <p className="text-xs text-muted-foreground">Reportes de ventas creados</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otros Reportes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Otros formatos generados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Inicie un nuevo reporte con un solo clic.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link href="/dashboard/compras/new" passHref>
            <Button className="w-full justify-start" variant="outline">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Nuevo Reporte 606 (Compras)
            </Button>
          </Link>
           <Link href="/dashboard/ventas/new" passHref>
            <Button className="w-full justify-start" variant="outline">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Nuevo Reporte 607 (Ventas)
            </Button>
          </Link>
           <Link href="/dashboard/otros" passHref>
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Ver Otros Formatos
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
