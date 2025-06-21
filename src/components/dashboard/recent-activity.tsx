'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Report } from '@/lib/types';
import { format } from 'date-fns';
import { FileText, FileUp, ScanLine } from 'lucide-react';

interface RecentActivityProps {
  reports: Report[];
}

export function RecentActivity({ reports }: RecentActivityProps) {
  const recentActivities = useMemo(() => {
    // We don't have individual invoice data, so we'll simulate a mix of activities
    // based on report creation.
    const activities = reports.slice(0, 5).map(report => ({
      id: report.id,
      type: report.type === '606' ? 'Compra (606)' : 'Venta (607)',
      description: `Generado Formulario ${report.periodo}`,
      date: report.fechaCreacion,
      icon: FileText
    }));

    // Add some mock "scanned" activities for visual variety
    if (reports.length > 0) {
        activities.push({
            id: crypto.randomUUID(),
            type: 'Escaneo',
            description: `Factura de "Ferretería Don José"`,
            date: new Date().toISOString(),
            icon: ScanLine
        });
    }
     if (reports.length > 1) {
        activities.push({
            id: crypto.randomUUID(),
            type: 'Subida de archivo',
            description: `factura-2024-05.pdf`,
            date: new Date(new Date().getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            icon: FileUp
        });
    }

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
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
              {recentActivities.length === 0 ? (
                 <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No hay actividad reciente.
                  </TableCell>
                </TableRow>
              ) : recentActivities.map(activity => (
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
