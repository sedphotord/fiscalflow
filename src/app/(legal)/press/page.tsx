
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Newspaper } from 'lucide-react';
import Image from 'next/image';

const pressMentions = [
  {
    outlet: 'Diario Financiero RD',
    title: 'FiscalFlow revoluciona la declaración de impuestos para las Pymes',
    date: '15 de Junio, 2025',
    link: '#',
    logo: 'https://placehold.co/150x50.png',
    dataAiHint: 'newspaper logo'
  },
  {
    outlet: 'Tech Dominicana',
    title: 'La startup que usa IA para eliminar los dolores de cabeza con la DGII',
    date: '10 de Junio, 2025',
    link: '#',
    logo: 'https://placehold.co/150x50.png',
    dataAiHint: 'tech logo'
  },
  {
    outlet: 'El Dinero',
    title: 'Cómo la tecnología está transformando la contabilidad en República Dominicana',
    date: '05 de Junio, 2025',
    link: '#',
    logo: 'https://placehold.co/150x50.png',
    dataAiHint: 'finance logo'
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function PressPage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.section
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Prensa y Medios</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Recursos, comunicados de prensa y menciones en los medios sobre FiscalFlow.
        </p>
      </motion.section>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Card>
          <CardHeader>
            <CardTitle>Kit de Prensa</CardTitle>
            <CardDescription>Descarga nuestro kit de prensa oficial.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Nuestro kit de prensa incluye el logo de FiscalFlow en varios formatos, imágenes de la aplicación, información de la empresa y biografías de los fundadores.
            </p>
            <Button className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Descargar Kit de Prensa (.zip)
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contacto de Prensa</CardTitle>
            <CardDescription>Para consultas de medios y entrevistas.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Ana Rodriguez</p>
            <p className="text-muted-foreground">Directora de Comunicaciones</p>
            <a href="mailto:prensa@fiscalflow.app" className="text-primary hover:underline mt-2 block">
              prensa@fiscalflow.app
            </a>
          </CardContent>
        </Card>
      </motion.div>

      <motion.section
        className="mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Menciones en Prensa</h2>
        <div className="space-y-6">
          {pressMentions.map((mention, index) => (
            <a href={mention.link} key={index} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-32 flex-shrink-0">
                    <Image src={mention.logo} alt={`${mention.outlet} logo`} width={150} height={50} data-ai-hint={mention.dataAiHint} />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <p className="font-semibold text-lg">{mention.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{mention.outlet} - {mention.date}</p>
                  </div>
                   <Newspaper className="h-8 w-8 text-primary flex-shrink-0 hidden md:block" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
