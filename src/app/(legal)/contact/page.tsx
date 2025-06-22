
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

type ContactFormValues = z.infer<typeof ContactSchema>;

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);
    console.log(values);
    setTimeout(() => {
        toast({
            title: "Mensaje Enviado",
            description: "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
        });
        form.reset();
        setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container py-12 md:py-20">
      <motion.section
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Ponte en Contacto</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          ¿Tienes preguntas, comentarios o necesitas soporte? Estamos aquí para ayudarte.
        </p>
      </motion.section>

      <motion.div
        className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un Mensaje</CardTitle>
              <CardDescription>Completa el formulario y te responderemos a la brevedad.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField name="name" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Nombre</FormLabel><FormControl><Input placeholder="Tu nombre completo" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="email" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Correo Electrónico</FormLabel><FormControl><Input placeholder="tu@correo.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <FormField name="subject" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Asunto</FormLabel><FormControl><Input placeholder="Asunto de tu mensaje" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField name="message" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Mensaje</FormLabel><FormControl><Textarea placeholder="Escribe tu mensaje aquí..." rows={6} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Información de Contacto</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Nuestra Oficina</h3>
                            <p className="text-muted-foreground">Av. Winston Churchill 123, Santo Domingo, República Dominicana</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Teléfono</h3>
                            <p className="text-muted-foreground">(809) 555-1234</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Mail className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold">Correo Electrónico</h3>
                            <p className="text-muted-foreground">contacto@fiscalflow.app</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="overflow-hidden">
                <div className="h-64 bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">[Ubicación en el mapa]</p>
                </div>
            </Card>
        </div>
      </motion.div>
    </div>
  );
}
