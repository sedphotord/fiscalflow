
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, MessageSquare, CheckSquare, XSquare, Filter, FileDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/context/app-provider';
import { Skeleton } from '@/components/ui/skeleton';
import type { SupportTicketStatus } from '@/lib/types';

export default function AdminSupportPage() {
  const { supportTickets } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getBadgeVariant = (status: SupportTicketStatus) => {
    switch (status) {
      case 'Abierto': return 'destructive';
      case 'En progreso': return 'secondary';
      case 'Cerrado': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Tickets de Soporte"
        description="Revise y gestione las solicitudes de los usuarios."
      >
         <div className="flex items-center gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar por Estado
            </Button>
            <Button>
                <FileDown className="mr-2 h-4 w-4" />
                Exportar
            </Button>
        </div>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Todos los Tickets</CardTitle>
          <CardDescription>Lista de las solicitudes de soporte recibidas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.userName}</div>
                    <div className="text-sm text-muted-foreground">{ticket.userId}</div>
                  </TableCell>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(ticket.status)}>{ticket.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {isClient ? format(new Date(ticket.createdAt), 'dd/MM/yyyy hh:mm a') : <Skeleton className="h-4 w-28" />}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" /> Ver Detalles y Responder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckSquare className="mr-2 h-4 w-4" /> Marcar como En Progreso
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                          <XSquare className="mr-2 h-4 w-4" /> Marcar como Cerrado
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
    </div>
  );
}
