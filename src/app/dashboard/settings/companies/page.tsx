
'use client';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function MovedPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Página Movida"
        description="Esta sección ha sido reubicada para un mejor acceso."
      />
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-lg">La gestión de contribuyentes ahora se encuentra en la sección principal del menú.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/contribuyentes">
                Ir a Gestión de Contribuyentes
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
