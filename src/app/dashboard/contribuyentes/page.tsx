'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Report } from '@/lib/types';

export default function ContribuyentesPage() {
  const { settings, companies, reports } = useAppContext();

  const allCompanies = useMemo(() => [
    { ...settings, id: 'main', type: 'Principal' },
    ...companies.map(c => ({ ...c, type: 'Cliente' }))
  ], [settings, companies]);

  const lastActivityMap = useMemo(() => {
    const activityMap = new Map<string, Report>();

    reports.forEach(report => {
      const existing = activityMap.get(report.rnc);
      if (!existing || new Date(report.fechaCreacion) > new Date(existing.fechaCreacion)) {
        activityMap.set(report.rnc, report);
      }
    });

    return activityMap;
  }, [reports]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Contribuyentes"
        description="Visualice todos sus perfiles de empresa y su actividad reciente."
      >
        <Link href="/dashboard/settings/companies">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Gestionar Empresas
            </Button>
        </Link>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contribuyentes</CardTitle>
          <CardDescription>
            Empresas registradas en su cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Razón Social</TableHead>
                <TableHead>RNC / Cédula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Última Actividad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCompanies.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                      No hay empresas registradas.
                      </TableCell>
                  </TableRow>
              ) : allCompanies.map((company) => {
                const lastActivity = lastActivityMap.get(company.rnc);
                return (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.rnc}</TableCell>
                    <TableCell>
                      <Badge variant={company.type === 'Principal' ? 'default' : 'secondary'}>
                        {company.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {lastActivity ? (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground"/>
                          <span>
                            Reporte {lastActivity.type} - {format(new Date(lastActivity.fechaCreacion), "dd MMM, yyyy", { locale: es })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Sin actividad reciente</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
