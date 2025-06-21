'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ShoppingCart, Wallet, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const planFeatures = [
    "Hasta 500 facturas/mes",
    "Gestión de hasta 10 clientes",
    "Escaneo en lote",
    "Soporte prioritario por email"
];

export default function SubscriptionsPage() {
    const currentUsage = 120;
    const planLimit = 500;
    const usagePercentage = (currentUsage / planLimit) * 100;

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Resumen de Suscripción"
                description="Gestiona tu plan, consulta tu consumo y actualiza tus datos de pago."
            />

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Tu Plan Actual: Pro</CardTitle>
                            <CardDescription>Tu plan se renueva el 15 de Julio, 2024.</CardDescription>
                        </div>
                        <Button>Cambiar Plan</Button>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Consumo Actual</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Facturas Procesadas</span>
                                    <span>{currentUsage} / {planLimit}</span>
                                </div>
                                <Progress value={usagePercentage} />
                                <p className="text-xs text-muted-foreground">
                                    Has utilizado el {usagePercentage.toFixed(0)}% de tu cuota mensual.
                                </p>
                                <Link href="/dashboard/subscriptions/buy" passHref>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Comprar más facturas
                                    </Button>
                                </Link>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold mb-2">Características Incluidas</h3>
                            <ul className="space-y-2">
                                {planFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Link href="/dashboard/subscriptions/payment-methods">
                    <Card className="hover:bg-muted/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Wallet className="h-6 w-6 text-primary"/>
                                <CardTitle>Métodos de Pago</CardTitle>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Gestiona tus tarjetas de crédito y débito.</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/subscriptions/billing">
                    <Card className="hover:bg-muted/50 transition-colors">
                         <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary"/>
                                <CardTitle>Datos de Facturación</CardTitle>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">Actualiza tu información para las facturas.</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
