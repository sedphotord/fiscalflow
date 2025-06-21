'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScanLine, FolderSearch, ShieldCheck, Copy, ShoppingCart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


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
    const [isScanDialogOpen, setIsScanDialogOpen] = useState(false);
    const router = useRouter();

    const handleScanSelect = (path: string) => {
        setIsScanDialogOpen(false);
        router.push(path);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Inicie sus tareas más comunes con un solo clic.</CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={isScanDialogOpen} onOpenChange={setIsScanDialogOpen}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <DialogTrigger asChild>
                            <Button className="w-full h-auto py-4 px-4 flex-col items-start text-left" variant="outline">
                                <div className="flex items-center gap-3">
                                    <ScanLine className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-base">Escanear Factura</span>
                                </div>
                                <p className="text-sm font-normal text-muted-foreground mt-2 pl-[36px] whitespace-normal">Sube una factura y extrae los datos con IA.</p>
                            </Button>
                        </DialogTrigger>

                        <DialogTrigger asChild>
                            <Button className="w-full h-auto py-4 px-4 flex-col items-start text-left" variant="outline">
                                <div className="flex items-center gap-3">
                                    <Copy className="h-6 w-6 text-primary" />
                                    <span className="font-semibold text-base">Escanear en Lote</span>
                                </div>
                                <p className="text-sm font-normal text-muted-foreground mt-2 pl-[36px] whitespace-normal">Procesa múltiples facturas de forma simultánea.</p>
                            </Button>
                        </DialogTrigger>

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
                     <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Seleccionar Tipo de Reporte</DialogTitle>
                          <DialogDescription>
                            ¿Para qué tipo de reporte es esta factura? El sistema usará la IA para extraer los datos y llevarte al formulario correcto.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <Button variant="outline" className="h-auto py-4" onClick={() => handleScanSelect('/dashboard/compras/new?action=scan')}>
                                <div className="flex items-center gap-3">
                                    <ShoppingCart className="h-5 w-5" />
                                    <div>
                                        <p className="font-semibold">Compra (Formato 606)</p>
                                        <p className="text-xs text-muted-foreground text-left">Factura de un proveedor.</p>
                                    </div>
                                </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => handleScanSelect('/dashboard/ventas/new?action=scan')}>
                                 <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5" />
                                    <div>
                                        <p className="font-semibold">Venta (Formato 607)</p>
                                        <p className="text-xs text-muted-foreground text-left">Factura emitida a un cliente.</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                      </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
