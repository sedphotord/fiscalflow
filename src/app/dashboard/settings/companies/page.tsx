
'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Construction } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data to simulate managing multiple companies
const mockCompanies = [
  { name: 'Ferretería Don José', rnc: '130876543', type: 'Cliente' },
  { name: 'Colmado El Vecino', rnc: '131123456', type: 'Cliente' },
];

export default function ManageCompaniesPage() {
  const { settings } = useAppContext();

  const allCompanies = useMemo(() => [
    { name: settings.name, rnc: settings.rnc, type: 'Principal' },
    ...mockCompanies
  ], [settings]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestionar Empresas"
        description="Añada, edite y organice las empresas de sus clientes."
      >
        <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar Empresa
        </Button>
      </PageHeader>

      <Alert>
        <Construction className="h-4 w-4" />
        <AlertTitle>Función en Desarrollo</AlertTitle>
        <AlertDescription>
          La capacidad completa para agregar y gestionar múltiples empresas se implementará en futuras actualizaciones. 
          Esta vista es una demostración de cómo funcionará.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>
            Estas son las empresas que ha registrado en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre / Razón Social</TableHead>
                <TableHead>RNC / Cédula</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCompanies.map((company, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.rnc}</TableCell>
                  <TableCell>
                    <Badge variant={company.type === 'Principal' ? 'default' : 'secondary'}>
                        {company.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
