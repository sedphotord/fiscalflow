'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Construction, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

export default function PagosExteriorPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 609 - Pagos al Exterior"
        description="Gestione los reportes de pagos por servicios a proveedores en el exterior."
      >
         <Button disabled>
            Generar Reporte 609
        </Button>
      </PageHeader>
      
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
           Estamos trabajando para incluir el soporte completo para el Formato 609. Por ahora, la funcionalidad de guardado y exportación está deshabilitada. ¡Gracias por su paciencia!
        </AlertDescription>
      </Alert>

      <fieldset disabled className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Información del Contribuyente</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="rnc">RNC / Cédula</Label>
                    <Input id="rnc" placeholder="RNC de la empresa" />
                </div>
                 <div>
                    <Label htmlFor="periodo">Período Fiscal (AAAAMM)</Label>
                    <Input id="periodo" placeholder="Ej: 202407" />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Detalle de Pagos al Exterior</CardTitle>
                <CardDescription>Agregue los pagos realizados a proveedores del exterior.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Razón Social Proveedor</TableHead>
                        <TableHead>Fecha de Pago</TableHead>
                        <TableHead>Monto Pagado</TableHead>
                        <TableHead>ISR Retenido</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Input placeholder="Nombre del proveedor en el exterior" /></TableCell>
                            <TableCell><Input type="date"/></TableCell>
                            <TableCell><Input type="number" placeholder="0.00" /></TableCell>
                            <TableCell><Input type="number" placeholder="0.00" /></TableCell>
                            <TableCell>
                                <Button type="button" variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Fila
              </Button>
            </CardContent>
        </Card>
       </fieldset>

    </div>
  );
}
