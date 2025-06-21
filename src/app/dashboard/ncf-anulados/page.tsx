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

const motivosAnulacion = [
    { value: "01", label: "01 - Deterioro de Factura" },
    { value: "02", label: "02 - Errores de Impresión (Factura Pre-impresa)" },
    { value: "03", label: "03 - Impresión Defectuosa" },
    { value: "04", label: "04 - Cese de Operaciones" },
    { value: "05", label: "05 - Pérdida o Hurto de Factura" },
];

export default function NcfAnuladosPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Formato 608 - Comprobantes Anulados"
        description="Gestione los reportes de Números de Comprobante Fiscal (NCF) anulados."
      >
        <Button disabled>
            Generar Reporte 608
        </Button>
      </PageHeader>
      
      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Sección en Desarrollo</AlertTitle>
        <AlertDescription>
          Estamos trabajando para incluir el soporte completo para el Formato 608. Por ahora, la funcionalidad de guardado y exportación está deshabilitada. ¡Gracias por su paciencia!
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
                <CardTitle>Detalle de NCF Anulados</CardTitle>
                <CardDescription>Agregue los comprobantes que fueron anulados durante el período.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>NCF Anulado</TableHead>
                        <TableHead>Fecha de Anulación</TableHead>
                        <TableHead>Motivo de Anulación</TableHead>
                        <TableHead>Acción</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell><Input placeholder="B01000..." /></TableCell>
                            <TableCell><Input type="date"/></TableCell>
                            <TableCell>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Seleccione un motivo..." /></SelectTrigger>
                                    <SelectContent>
                                        {motivosAnulacion.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </TableCell>
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
