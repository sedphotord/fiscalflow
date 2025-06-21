'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockPosts = [
  { id: 'post_1', title: 'Guía Definitiva para el Formato 606', status: 'Publicado', author: 'Admin', views: 1250, date: '2024-06-15' },
  { id: 'post_2', title: '5 Errores Comunes al Llenar el 607 y Cómo Evitarlos', status: 'Publicado', author: 'Admin', views: 980, date: '2024-06-10' },
  { id: 'post_3', title: 'Novedades Fiscales para el Cierre de 2024', status: 'Borrador', author: 'Admin', views: 0, date: '2024-07-01' },
  { id: 'post_4', title: '¿Qué es la Retención de Renta y Cómo se Aplica?', status: 'Publicado', author: 'Admin', views: 2300, date: '2024-05-20' },
];

export default function AdminPostsPage() {
  const getBadgeVariant = (status: string) => {
    return status === 'Publicado' ? 'default' : 'secondary';
  };
  
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Posts y Noticias"
        description="Cree y edite los artículos del blog o la sección de noticias."
      >
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nuevo Post
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Todos los Posts</CardTitle>
          <CardDescription>Listado de artículos del blog y noticias.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Autor</TableHead>
                <TableHead className="hidden md:table-cell text-right">Vistas</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(post.status)}>{post.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">{post.views}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
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
