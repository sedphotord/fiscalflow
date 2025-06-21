
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app-provider';
import { SupportSchema } from '@/lib/schemas';
import { createSupportTicket } from '@/ai/flows/support-ticket-flow';
import { HelpCircle, Send, BookOpen, Loader2 } from 'lucide-react';

type SupportFormValues = z.infer<typeof SupportSchema>;

const faqItems = [
  {
    question: "¿Cómo funciona el escaneo inteligente de facturas?",
    answer: "Nuestro escáner inteligente utiliza tecnología de Reconocimiento Óptico de Caracteres (OCR) con inteligencia artificial para leer los datos de sus facturas. Simplemente suba una foto o un PDF, y el sistema extraerá automáticamente el RNC, NCF, fecha y montos, llenando el formulario por usted."
  },
  {
    question: "¿Qué tan segura es mi información?",
    answer: "La seguridad es nuestra máxima prioridad. Todos sus datos se almacenan de forma segura utilizando encriptación avanzada. El acceso está protegido y seguimos las mejores prácticas de la industria para garantizar que su información fiscal y la de sus clientes esté siempre a salvo."
  },
  {
    question: "¿Puedo gestionar múltiples empresas o clientes?",
    answer: "¡Sí! FiscalFlow está diseñado tanto para contribuyentes individuales como para contadores que gestionan múltiples clientes. Puede añadir diferentes perfiles de empresas desde la sección 'Ajustes > Gestionar Empresas' y luego seleccionarlos al crear un nuevo reporte."
  },
  {
    question: "¿Qué formatos de la DGII puedo generar?",
    answer: "Actualmente, puede generar los Formatos de Envío 606 (Compras) y 607 (Ventas). Estamos trabajando activamente para incorporar más formatos, como el 608 (NCF Anulados), y las declaraciones anuales (IR-1, IR-2) en futuras actualizaciones."
  },
  {
    question: "¿Qué hago si el escáner extrae un dato incorrecto?",
    answer: "Aunque nuestra IA es muy precisa, ningún sistema es perfecto. Si nota un error después del escaneo, puede editar manualmente cualquier campo en el formulario antes de guardar o generar el reporte. La validación en tiempo real le ayudará a corregir formatos incorrectos de RNC y NCF."
  }
];

export default function SupportPage() {
  const { showToast, addSupportTicket } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: SupportFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Let the AI generate a ticket ID and initial response
      const result = await createSupportTicket(values);

      // 2. Persist the complete ticket in our "database"
      addSupportTicket({
        id: result.ticketId,
        subject: values.subject,
        message: values.message,
        response: result.response,
      });

      // 3. Notify the user
      showToast({
        title: "Ticket Creado: " + result.ticketId,
        description: result.response,
      });
      form.reset();
    } catch (error) {
      console.error("Error creating support ticket:", error);
      showToast({
        variant: 'destructive',
        title: 'Error al enviar el ticket',
        description: 'Hubo un problema al crear su solicitud. Por favor, inténtelo de nuevo más tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Soporte y Centro de Ayuda"
        description="Encuentre respuestas a sus preguntas y contáctenos si necesita asistencia."
      />
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Preguntas Frecuentes (FAQ)</CardTitle>
                <CardDescription>Respuestas rápidas a las dudas más comunes.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Contáctenos</CardTitle>
                <CardDescription>¿No encontró la respuesta? Envíenos un mensaje.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Problema con escaneo de factura" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Su Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa su problema o consulta con el mayor detalle posible..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
