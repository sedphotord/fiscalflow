'use client';

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
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, FileDown, Eye, Trash2 } from 'lucide-react';

type Report = {
  id: string;
  periodo: string;
  fechaCreacion: string;
  estado: 'Completado' | 'Borrador' | 'Error';
  url: string;
};

interface ReportTableProps {
  data: Report[];
}

export function ReportTable({ data }: ReportTableProps) {
    const getBadgeVariant = (estado: Report['estado']) => {
        switch (estado) {
          case 'Completado':
            return 'default';
          case 'Borrador':
            return 'secondary';
          case 'Error':
            return 'destructive';
          default:
            return 'outline';
        }
      };

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
            {data.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.periodo}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(report.estado)}>{report.estado}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {report.fechaCreacion}
                </TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar
                        </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
