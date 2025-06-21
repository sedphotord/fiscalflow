'use client';

import { useState, useEffect } from 'react';
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
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileDown, Edit, Trash2, Mail, MessageSquare, UploadCloud } from 'lucide-react';
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

interface ReportTableProps {
  data: Report[];
}

export function ReportTable({ data }: ReportTableProps) {
    const { deleteReport, showToast } = useAppContext();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

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
    
    const handleExport = (report: Report) => {
        try {
            formatReportToTxt(report);
            showToast({ title: 'Exportación Exitosa', description: 'El archivo .txt ha sido descargado.' });
        } catch(e) {
            const error = e as Error;
            showToast({ title: 'Error de Exportación', description: error.message, variant: 'destructive' });
        }
    };
    
    const handleEdit = (report: Report) => {
      const path = report.type === '606' ? '/dashboard/compras/new' : '/dashboard/ventas/new';
      router.push(`${path}?id=${report.id}`);
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

    const handleSaveToDrive = (report: Report) => {
        showToast({
          title: 'Función en Desarrollo',
          description: 'La integración con Google Drive estará disponible próximamente.'
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
              <TableHead>ID Reporte</TableHead>
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No hay reportes.
                </TableCell>
              </TableRow>
            ) : data.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium hidden sm:table-cell">{report.id.substring(0,8)}...</TableCell>
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
                        <DropdownMenuItem onClick={() => handleExport(report)}>
                          <FileDown className="mr-2 h-4 w-4" />
                          Exportar .txt
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleShare('email', report)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar por Correo
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShare('whatsapp', report)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Enviar por WhatsApp
                        </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleSaveToDrive(report)}>
                          <UploadCloud className="mr-2 h-4 w-4" />
                          Guardar en Drive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                           <AlertDialogTrigger className="w-full text-destructive focus:text-destructive focus:bg-destructive/10">
                             <Trash2 className="mr-2 h-4 w-4" />
                             Eliminar
                           </AlertDialogTrigger>
                        </DropdownMenuItem>
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
    </Card>
  );
}
