
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/components/dashboard/page-header';
import { useAppContext } from '@/context/app-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ReportTableSkeleton } from '@/components/dashboard/report-table-skeleton';

const ReportTable = dynamic(
  () => import('@/components/dashboard/report-table').then((mod) => mod.ReportTable),
  { 
    ssr: false,
    loading: () => <ReportTableSkeleton />,
  }
);

export default function AllReportsPage() {
  const { reports } = useAppContext();
  const [filters, setFilters] = useState({
    rnc: '',
    periodo: '',
    tipo: 'all',
    estado: 'all'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ rnc: '', periodo: '', tipo: 'all', estado: 'all' });
  };
  
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
        const { rnc, periodo, tipo, estado } = filters;
        if (rnc && !report.rnc.toLowerCase().includes(rnc.toLowerCase())) return false;
        if (periodo && !report.periodo.includes(periodo)) return false;
        if (tipo !== 'all' && report.type !== tipo) return false;
        if (estado !== 'all' && report.estado !== estado) return false;
        return true;
    }).sort((a,b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
  }, [reports, filters]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Historial de Reportes" description="Busque y filtre todos los reportes generados en la plataforma." />
      
      <Card>
        <CardHeader><CardTitle>Filtros Avanzados</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="grid gap-2">
            <Label htmlFor="filtro-rnc">RNC Contribuyente</Label>
            <Input id="filtro-rnc" placeholder="Buscar por RNC..." value={filters.rnc} onChange={e => handleFilterChange('rnc', e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="filtro-periodo">Período (AAAAMM)</Label>
            <Input id="filtro-periodo" placeholder="Buscar por Período..." value={filters.periodo} onChange={e => handleFilterChange('periodo', e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="filtro-tipo">Tipo de Reporte</Label>
            <Select value={filters.tipo} onValueChange={value => handleFilterChange('tipo', value)}>
                <SelectTrigger id="filtro-tipo"><SelectValue /></SelectTrigger>
                <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="606">606 - Compras</SelectItem>
                <SelectItem value="607">607 - Ventas</SelectItem>
                <SelectItem value="608">608 - Anulados</SelectItem>
                <SelectItem value="609">609 - Pagos Exterior</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="filtro-estado">Estado</Label>
            <Select value={filters.estado} onValueChange={value => handleFilterChange('estado', value)}>
                <SelectTrigger id="filtro-estado"><SelectValue /></SelectTrigger>
                <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="Borrador">Borrador</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" onClick={clearFilters}><X className="mr-2 h-4 w-4" /> Limpiar Filtros</Button>
        </CardContent>
      </Card>
      
      <ReportTable data={filteredReports} showType showRnc />
    </div>
  );
}
