
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Report } from '@/lib/types';
import { format } from 'date-fns';
import { FileText, FileUp, ScanLine, Loader2 } from 'lucide-react';

interface RecentActivityProps {
  reports: Report[];
}

type Activity = {
    id: string;
    type: string;
    description: string;
    date: string;
    icon: React.ElementType;
};

export function RecentActivity({ reports }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This logic now runs only on the client, after the initial render.
    // This prevents any mismatch between server and client rendering.
    
    const getReportTypeLabel = (type: Report['type']) => {
        switch (type) {
            case '606': return 'Compra (606)';
            case '607': return 'Venta (607)';
            case '608': return 'Anulado (608)';
            case '609': return 'Pago Exterior (609)';
            default: return 'Reporte';
        }
    };
    
    const generatedActivities: Activity[] = reports.slice(0, 5).map(report => {
      let count = 0;
      switch (report.type) {
        case '606':
          count = report.compras.length;
          break;
        case '607':
          count = report.ventas.length;
          break;
        case '608':
          count = report.anulados.length;
          break;
        case '609':
          count = report.pagos.length;
          break;
      }
      const plural = count === 1 ? 'factura procesada' : 'facturas procesadas';

      return {
        id: report.id,
        type: getReportTypeLabel(report.type),
        description: `${count} ${plural} para el período ${report.periodo}`,
        date: report.fechaCreacion,
        icon: FileText
      }
    });

    // Mock some dynamic activities for visual variety
    if (reports.length > 0) {
        generatedActivities.push({
            id: crypto.randomUUID(), // Safe to use here inside useEffect
            type: 'Escaneo',
            description: `1 factura procesada ("Ferretería Don José")`,
            date: new Date().toISOString(), // Safe to use here
            icon: ScanLine
        });
    }
     if (reports.length > 1) {
        generatedActivities.push({
            id: crypto.randomUUID(),
            type: 'Subida de archivo',
            description: `1 factura procesada (factura-2024-05.pdf)`,
            date: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toISOString(),
            icon: FileUp
        });
    }

    setActivities(generatedActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5));
    setIsLoading(false);
  }, [reports]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas facturas procesadas y formularios generados.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] sm:w-[200px]">Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                 <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                     <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Cargando actividad...
                    </div>
                  </TableCell>
                </TableRow>
              ) : activities.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No hay actividad reciente.
                  </TableCell>
                </TableRow>
              ) : activities.map(activity => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{activity.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell className="text-right text-muted-foreground whitespace-nowrap">
                    {format(new Date(activity.date), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
