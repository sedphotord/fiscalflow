
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileDown, Edit, Trash2, Mail, UploadCloud, Download, Sheet, File, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { Report } from '@/lib/types';
import { useAppContext } from '@/context/app-provider';
import { formatReportToTxt } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportTableProps {
  data: Report[];
  showType?: boolean;
  showRnc?: boolean;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.785 1.47h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);


export function ReportTable({ data, showType = false, showRnc = false }: ReportTableProps) {
    const { deleteReport, showToast, users, companies } = useAppContext();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, rowsPerPage]);

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const allContributors = useMemo(() => {
        const contributorMap = new Map<string, string>();
        users.forEach(u => contributorMap.set(u.rnc, u.name));
        companies.forEach(c => contributorMap.set(c.rnc, c.name));
        return contributorMap;
    }, [users, companies]);

    const getContributorName = (rnc: string) => {
        return allContributors.get(rnc) || rnc;
    }

    const getBadgeVariant = (estado: Report['estado']) => {
        switch (estado) {
          case 'Completado':
            return 'default';
          case 'Borrador':
            return 'secondary';
          default:
            return 'outline';
        }
      };
    
    const handleExport = (report: Report, format: 'txt' | 'pdf' | 'excel') => {
        if (format === 'txt') {
            try {
                formatReportToTxt(report);
                showToast({ title: 'Exportación Exitosa', description: 'El archivo .txt ha sido descargado.' });
            } catch(e) {
                const error = e as Error;
                showToast({ title: 'Error de Exportación', description: error.message, variant: 'destructive' });
            }
        } else {
            showToast({ title: 'Función en Desarrollo', description: `La exportación a ${format.toUpperCase()} estará disponible próximamente.` });
        }
    };
    
    const handleEdit = (report: Report) => {
      let path = '';
      switch (report.type) {
        case '606':
          path = '/dashboard/compras/new';
          break;
        case '607':
          path = '/dashboard/ventas/new';
          break;
        case '608':
            path = '/dashboard/ncf-anulados/new';
            break;
        case '609':
            path = '/dashboard/pagos-exterior/new';
            break;
      }
      if (path) {
        router.push(`${path}?id=${report.id}`);
      }
    }

    const handleDelete = (reportId: string) => {
        deleteReport(reportId);
        showToast({ title: 'Reporte Eliminado', description: 'El reporte ha sido eliminado permanentemente.' });
    };

    const handleShare = (method: 'email' | 'whatsapp', report: Report) => {
      showToast({
        title: 'Función en Desarrollo',
        description: `La opción para enviar por ${method} estará disponible próximamente.`
      });
    };

    const handleSaveToCloud = (service: 'drive' | 'onedrive', report: Report) => {
        showToast({
          title: 'Función en Desarrollo',
          description: `La integración con ${service === 'drive' ? 'Google Drive' : 'OneDrive'} estará disponible próximamente.`
        });
    }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Reportes Recientes</CardTitle>
        <CardDescription>
          Una lista de los reportes que ha generado recientemente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {showType && <TableHead>Tipo</TableHead>}
              {showRnc && <TableHead>Contribuyente</TableHead>}
              <TableHead>Período</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">
                Fecha de Creación
              </TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showType && showRnc ? 6 : showType || showRnc ? 5 : 4} className="h-24 text-center">
                  No hay reportes que coincidan con su búsqueda.
                </TableCell>
              </TableRow>
            ) : paginatedData.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-mono text-xs hidden sm:table-cell">{report.id.split('-')[0]}...</TableCell>
                {showType && <TableCell className="font-mono text-xs">{report.type}</TableCell>}
                {showRnc && <TableCell className="font-medium">{getContributorName(report.rnc)}</TableCell>}
                <TableCell className="font-medium">{report.periodo}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(report.estado)}>{report.estado}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {isClient ? format(new Date(report.fechaCreacion), 'dd/MM/yyyy') : <Skeleton className="h-4 w-20" />}
                </TableCell>
                <TableCell>
                <AlertDialog>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(report)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Ver / Editar
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Download className="mr-2 h-4 w-4" />
                                Descargar como...
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleExport(report, 'txt')} disabled={report.estado !== 'Completado'}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        TXT (DGII)
                                    </DropdownMenuItem>
                                     <DropdownMenuItem onClick={() => handleExport(report, 'pdf')}>
                                        <File className="mr-2 h-4 w-4" />
                                        PDF
                                    </DropdownMenuItem>
                                     <DropdownMenuItem onClick={() => handleExport(report, 'excel')}>
                                        <Sheet className="mr-2 h-4 w-4" />
                                        Excel
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare('email', report)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar por Correo
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('whatsapp', report)}>
                          <WhatsAppIcon className="mr-2 h-4 w-4" />
                          Enviar por WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Guardar en...
                            </DropdownMenuSubTrigger>
                             <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleSaveToCloud('drive', report)}>
                                        Google Drive
                                    </DropdownMenuItem>
                                     <DropdownMenuItem onClick={() => handleSaveToCloud('onedrive', report)}>
                                        OneDrive
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                             <DropdownMenuItem className="w-full text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                               <Trash2 className="mr-2 h-4 w-4" />
                               Eliminar
                             </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el reporte.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(report.id)} className="bg-destructive hover:bg-destructive/90">
                            Sí, eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          {data.length} reporte(s) en total.
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Filas por página</p>
                <Select
                    value={`${rowsPerPage}`}
                    onValueChange={(value) => {
                        setRowsPerPage(Number(value))
                        setCurrentPage(1)
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={rowsPerPage} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center space-x-2">
                 <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    <span className="sr-only">Primera página</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                 <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <span className="sr-only">Página anterior</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                 <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <span className="sr-only">Página siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <span className="sr-only">Última página</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}

