
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calculator, Loader2, UserCheck, Printer, ArrowRight } from 'lucide-react';
import { lookupRnc } from '@/ai/flows/lookup-rnc-flow';
import { useAppContext } from '@/context/app-provider';
import { AnimatePresence, motion } from 'framer-motion';

// Schemas
const CapitalSchema = z.object({
  capitalAnterior: z.number({ required_error: 'El capital anterior es requerido.' }).positive('Debe ser un número positivo.'),
  capitalNuevo: z.number({ required_error: 'El nuevo capital es requerido.' }).positive('Debe ser un número positivo.'),
}).refine(data => data.capitalNuevo > data.capitalAnterior, {
    message: 'El nuevo capital debe ser mayor al anterior.',
    path: ['capitalNuevo'],
});
type CapitalFormValues = z.infer<typeof CapitalSchema>;

const RncSchema = z.object({
    rnc: z.string().refine(val => (val.length === 9 || val.length === 11) && /^\d+$/.test(val), {
        message: 'El RNC/Cédula debe tener 9 u 11 dígitos.',
    }),
});
type RncFormValues = z.infer<typeof RncSchema>;

export default function VariacionCapitalPage() {
    const [step, setStep] = useState(1);
    const [diferencia, setDiferencia] = useState<number | null>(null);
    const [impuesto, setImpuesto] = useState<number | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [razonSocial, setRazonSocial] = useState<string | null>(null);
    const [finalRnc, setFinalRnc] = useState<string | null>(null);
    const [authorizationNumber, setAuthorizationNumber] = useState<string | null>(null);

    const { showToast } = useAppContext();

    const capitalForm = useForm<CapitalFormValues>({
        resolver: zodResolver(CapitalSchema),
    });

    const rncForm = useForm<RncFormValues>({
        resolver: zodResolver(RncSchema),
    });

    const handleCalculate = (data: CapitalFormValues) => {
        const diff = data.capitalNuevo - data.capitalAnterior;
        setDiferencia(diff);
        setImpuesto(diff * 0.01);
    };

    const handleClear = () => {
        capitalForm.reset();
        setDiferencia(null);
        setImpuesto(null);
        setStep(1);
        setRazonSocial(null);
        setFinalRnc(null);
        rncForm.reset();
    };

    const handleVerifyRnc = async (data: RncFormValues) => {
        setIsVerifying(true);
        setRazonSocial(null);
        try {
            const result = await lookupRnc({ rnc: data.rnc });
            if (result && result.razonSocial) {
                setRazonSocial(result.razonSocial);
            } else {
                 showToast({ variant: 'destructive', title: 'RNC no encontrado' });
            }
        } catch (error) {
            showToast({ variant: 'destructive', title: 'Error de Búsqueda', description: 'Ocurrió un problema al validar el RNC.' });
        } finally {
            setIsVerifying(false);
        }
    };
    
    const handleConfirmContribuyente = () => {
        if (!razonSocial) {
             showToast({ variant: 'destructive', title: 'Verificación requerida', description: 'Por favor, verifique un RNC válido.' });
             return;
        }
        setFinalRnc(rncForm.getValues('rnc'));
        setAuthorizationNumber(`AUT-${Date.now()}`);
        setStep(3);
    };

    const handlePrint = () => {
        showToast({ title: 'Imprimiendo Autorización', description: 'Se ha abierto el diálogo de impresión.' });
        window.print();
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };
    
    const formatCurrency = (value: number | null) => {
        if (value === null) return 'RD$0.00';
        return `RD$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Calculadora de Variación de Capital Social"
                description="Estime y genere la autorización de pago del impuesto por aumento de capital."
            />

            <Accordion type="multiple" className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger>Descripción</AccordionTrigger>
                  <AccordionContent>
                    Esta calculadora genera la autorización de pago del impuesto por concepto de aumento de capital social autorizado, que corresponde al 1% del excedente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="additional-info">
                  <AccordionTrigger>Información Adicional</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                      <li><strong>Requisitos de obtención:</strong> Haber tenido un capital social autorizado previamente.</li>
                      <li><strong>Pasos de obtención:</strong> Introducir el capital social anterior y el nuevo capital social autorizado.</li>
                      <li><strong>Formulario utilizado:</strong> No aplica.</li>
                      <li><strong>Precio:</strong> Gratis.</li>
                      <li><strong>Tiempo de entrega:</strong> Inmediato.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <div className="flex items-center gap-4 text-muted-foreground">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</div>
                <h3 className="text-xl font-semibold text-foreground">Cálculo del pago del impuesto</h3>
            </div>

            <Card as={motion.div} variants={cardVariants} initial="visible" animate="visible">
                <Form {...capitalForm}>
                    <form onSubmit={capitalForm.handleSubmit(handleCalculate)}>
                        <CardHeader>
                            <CardTitle>Datos del Capital Social</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                             <FormField
                              control={capitalForm.control}
                              name="capitalAnterior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Capital Social Autorizado Anterior</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Introduzca el capital anterior"
                                      {...field}
                                      onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                             <FormField
                              control={capitalForm.control}
                              name="capitalNuevo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nuevo Capital Social Autorizado</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Introduzca el nuevo capital"
                                      {...field}
                                      onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {impuesto !== null && (
                                <div className="md:col-span-2 mt-6 space-y-2 text-lg">
                                    <div>
                                      <span className="font-medium">Diferencia: </span>
                                      <span className="font-semibold">{formatCurrency(diferencia)}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Monto a pagar (1%): </span>
                                      <span className="font-bold text-primary">{formatCurrency(impuesto)}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="gap-2">
                             <Button type="button" variant="outline" onClick={handleClear}>Limpiar</Button>
                             <Button type="submit">Calcular</Button>
                        </CardFooter>
                    </form>
                </Form>
                 {impuesto !== null && step === 1 && (
                    <div className="p-6 pt-0 border-t mt-4">
                        <Button className="mt-6 w-full md:w-auto" onClick={() => setStep(2)}>
                            Generar Autorización <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}
            </Card>

            <AnimatePresence>
            {step >= 2 && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={cardVariants} className="space-y-6">
                    <Separator />
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</div>
                        <h3 className="text-xl font-semibold text-foreground">Generar autorización</h3>
                    </div>
                    <Card>
                        <Form {...rncForm}>
                            <form onSubmit={rncForm.handleSubmit(handleVerifyRnc)}>
                                <CardHeader>
                                    <CardTitle>Introduzca el RNC/Cédula</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                      control={rncForm.control}
                                      name="rnc"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input placeholder="RNC o Cédula del contribuyente" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    {razonSocial && (
                                        <p className="mt-4 text-md"><span className="font-medium">Nombre del contribuyente:</span> {razonSocial}</p>
                                    )}
                                </CardContent>
                                <CardFooter className="gap-2">
                                    <Button type="button" variant="outline" onClick={() => { setStep(1); setRazonSocial(null); rncForm.reset(); }}>Cancelar</Button>
                                    <Button type="submit" disabled={isVerifying}>
                                        {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        Verificar
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                        {razonSocial && step === 2 && (
                            <div className="p-6 pt-0 border-t mt-4">
                               <Button className="mt-6 w-full md:w-auto" onClick={handleConfirmContribuyente}>
                                    Confirmar Contribuyente <UserCheck className="ml-2 h-4 w-4" />
                               </Button>
                            </div>
                        )}
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>

            <AnimatePresence>
            {step === 3 && finalRnc && razonSocial && authorizationNumber && (
                 <motion.div initial="hidden" animate="visible" exit="hidden" variants={cardVariants} className="space-y-6">
                    <Separator />
                    <div className="flex items-center gap-4 text-muted-foreground no-print">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold bg-primary text-primary-foreground">3</div>
                        <h3 className="text-xl font-semibold text-foreground">Impresión de autorización de pago del impuesto</h3>
                    </div>
                     <Card id="printable-area">
                        <CardHeader>
                            <CardTitle>Autorización de Pago del Impuesto por Variación de Capital</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-base md:text-lg">
                           <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                <span className="font-medium">N°</span>
                                <span>{authorizationNumber}</span>
                           </div>
                           <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                <span className="font-medium">RNC/Cédula</span>
                                <span>{finalRnc}</span>
                           </div>
                           <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                                <span className="font-medium">Razón Social/Nombre</span>
                                <span>{razonSocial}</span>
                           </div>
                           <div className="flex justify-between items-center bg-primary/10 p-4 rounded-md mt-4">
                                <span className="font-bold text-primary">Monto a Pagar</span>
                                <span className="font-bold text-xl text-primary">{formatCurrency(impuesto)}</span>
                           </div>
                        </CardContent>
                        <CardFooter className="no-print">
                            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Imprimir Autorización de Pago</Button>
                        </CardFooter>
                     </Card>
                 </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
}
