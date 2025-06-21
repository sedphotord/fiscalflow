'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderSearch, ShieldCheck, Copy, ShoppingCart, DollarSign, FileUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-provider';
import { useRouter } from 'next/navigation';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const regularActions = [
    {
        href: '/dashboard/validator',
        icon: ShieldCheck,
        title: 'Validar RNC/NCF',
        description: 'Verifica la validez de un RNC o NCF.'
    },
    {
        href: '/dashboard/reports',
        icon: FolderSearch,
        title: 'Ver Reportes',
        description: 'Revisa y descarga tus reportes 606 y 607.'
    }
];

export function QuickActions() {
    const { showToast } = useAppContext();
    const router = useRouter();
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Inicie sus tareas más comunes con un solo clic.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full h-auto py-4 px-4 flex-col items-start text-left" variant="outline">
                                <div className="flex items-center gap-3">
                                    <Upload className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-base">Escanear o Cargar</span>
                                </div>
                                <p className="text-sm font-normal text-muted-foreground mt-2 pl-[36px] whitespace-normal">Usa la IA para procesar facturas o carga datos en lote.</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72">
                            <DropdownMenuLabel>Escanear Factura Individual</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/compras/new?action=scan')}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                <span>Compra (Formato 606)</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/dashboard/ventas/new?action=scan')}>
                                 <DollarSign className="mr-2 h-4 w-4" />
                                <span>Venta (Formato 607)</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Cargar en Lote</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => showToast({ title: 'Función en desarrollo', description: 'La carga desde plantillas (Excel, CSV) estará disponible próximamente.' })}>
                                <FileUp className="mr-2 h-4 w-4" />
                                <span>Cargar desde Plantilla (Excel, CSV)</span>
                            </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => showToast({ title: 'Función en desarrollo', description: 'El escaneo en lote de imágenes y PDFs estará disponible próximamente.' })}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Cargar Lote de Imágenes/PDFs</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {regularActions.map((action) => (
                         <Link key={action.title} href={action.href} passHref>
                            <Button className="w-full h-auto py-4 px-4 flex-col items-start text-left" variant="outline">
                                <div className="flex items-center gap-3">
                                    <action.icon className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-base">{action.title}</span>
                                </div>
                                <p className="text-sm font-normal text-muted-foreground mt-2 pl-[36px] whitespace-normal">{action.description}</p>
                            </Button>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
