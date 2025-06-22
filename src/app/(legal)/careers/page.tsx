
'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase, Calendar } from 'lucide-react';

const jobOpenings = [
  {
    title: 'Desarrollador de Software Senior (Backend)',
    location: 'Remoto (Latam)',
    type: 'Tiempo Completo',
    posted: '2025-07-15',
    description: 'Buscamos un desarrollador backend experimentado para unirse a nuestro equipo. Serás responsable de diseñar, desarrollar y mantener la lógica del lado del servidor de nuestra aplicación, asegurando un alto rendimiento y capacidad de respuesta a las solicitudes del frontend.'
  },
  {
    title: 'Especialista en Impuestos y Contabilidad',
    location: 'Santo Domingo, RD',
    type: 'Tiempo Completo',
    posted: '2025-07-10',
    description: 'Únete a nuestro equipo de expertos para asegurar que FiscalFlow se mantenga actualizado con las últimas normativas de la DGII. Tu rol será clave para validar la lógica de negocio y proveer soporte especializado a nuestros clientes.'
  },
  {
    title: 'Diseñador de Producto (UI/UX)',
    location: 'Remoto',
    type: 'Tiempo Completo',
    posted: '2025-07-01',
    description: 'Estamos buscando un diseñador de producto talentoso para crear experiencias de usuario intuitivas y atractivas. Trabajarás de cerca con los equipos de producto e ingeniería para llevar las ideas desde el concepto hasta la implementación.'
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CareersPage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.section
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Trabaja con Nosotros</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          ¿Te apasiona la tecnología y la innovación financiera? ¿Quieres ser parte de un equipo que está cambiando la forma en que se maneja la contabilidad en el país? ¡FiscalFlow es tu lugar!
        </p>
      </motion.section>

      <motion.section
        className="mt-16 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Posiciones Abiertas</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {jobOpenings.map((job, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg bg-card overflow-hidden">
              <AccordionTrigger className="p-6 text-lg hover:no-underline">
                {job.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                    <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</p>
                    <p className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.type}</p>
                    <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Publicado: {job.posted}</p>
                </div>
                <p className="mb-6">{job.description}</p>
                <Button>
                  Aplicar Ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-12">
            <p className="text-muted-foreground">¿No ves una posición para ti? Envíanos tu CV de todas formas.</p>
            <Button variant="link" className="text-base">talento@fiscalflow.app</Button>
        </div>
      </motion.section>
    </div>
  );
}
