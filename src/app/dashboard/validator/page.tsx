'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { validateTaxInformation } from '@/ai/flows/validate-tax-info-flow';
import { useAppContext } from '@/context/app-provider';

const ValidatorSchema = z.object({
  rncCedula: z.string().min(1, 'El RNC/Cédula es requerido.'),
  ncf: z.string().optional(),
});

type FormValues = z.infer<typeof ValidatorSchema>;
type ValidationResult = {
  isRncValid: boolean;
  isNcfValid: boolean;
  validationMessage: string;
} | null;

export default function ValidatorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult>(null);
  const { showToast } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(ValidatorSchema),
    defaultValues: {
      rncCedula: '',
      ncf: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const validationData = {
        rncCedula: data.rncCedula,
        ncf: data.ncf || '', 
      };
      const validationResult = await validateTaxInformation(validationData);
      setResult(validationResult);
    } catch (error) {
      console.error("Validation error:", error);
      showToast({
        variant: 'destructive',
        title: 'Error de Validación',
        description: 'No se pudo completar la validación. Inténtelo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getAlertVariant = () => {
    if (!result) return 'default';
    if (result.isRncValid && (!form.getValues('ncf') || result.isNcfValid)) {
        return 'default';
    }
    return 'destructive';
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Validador RNC y NCF"
        description="Consulte la validez de un RNC/Cédula y NCF directamente con la DGII."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consulta de Contribuyente</CardTitle>
            <CardDescription>
              Ingrese el RNC/Cédula y, opcionalmente, un NCF para validar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="rncCedula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RNC / Cédula</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el RNC o Cédula" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ncf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Comprobante Fiscal (NCF) (Opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese el NCF a validar" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="mr-2 h-4 w-4" />
                  )}
                  Validar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado de la Consulta</CardTitle>
            <CardDescription>
              Aquí se mostrará el resultado de la validación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && !result && (
              <div className="flex items-center justify-center h-40 rounded-lg border-2 border-dashed bg-muted/50">
                <p className="text-muted-foreground">Esperando consulta...</p>
              </div>
            )}
            {result && (
               <Alert variant={getAlertVariant()}>
                  {getAlertVariant() === 'default' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <AlertTitle>{getAlertVariant() === 'default' ? "Validación Completada" : "Error de Validación"}</AlertTitle>
                  <AlertDescription>
                    {result.validationMessage}
                  </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
