import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function AdminPostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Posts y Noticias"
        description="Cree y edite los artículos del blog o la sección de noticias."
      />
      <Card>
        <CardContent className="p-6 flex items-center justify-center h-96">
            <div className="text-center text-muted-foreground">
                <Construction className="mx-auto h-12 w-12" />
                <p className="mt-4">La sección para gestionar posts está en construcción.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
