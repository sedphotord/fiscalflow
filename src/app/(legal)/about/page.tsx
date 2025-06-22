
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  { name: 'Juan Dela Cruz', role: 'CEO & Fundador', image: 'https://placehold.co/300x300.png', dataAiHint: 'professional portrait' },
  { name: 'María García', role: 'Directora de Tecnología (CTO)', image: 'https://placehold.co/300x300.png', dataAiHint: 'professional portrait' },
  { name: 'Carlos Rodriguez', role: 'Jefe de Producto', image: 'https://placehold.co/300x300.png', dataAiHint: 'professional portrait' },
  { name: 'Ana Martinez', role: 'Líder de Contabilidad', image: 'https://placehold.co/300x300.png', dataAiHint: 'professional portrait' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <motion.section
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Nuestra Misión</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          En FiscalFlow, nuestra misión es simplificar la complejidad de la contabilidad fiscal en la República Dominicana. Creemos en el poder de la tecnología para automatizar tareas tediosas, reducir errores y darle a los contadores y empresas el tiempo para enfocarse en lo que realmente importa: crecer sus negocios.
        </p>
      </motion.section>

      <motion.section
        className="mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-10">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <Image src={member.image} alt={`Foto de ${member.name}`} layout="fill" objectFit="cover" data-ai-hint={member.dataAiHint} />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center justify-center gap-2 text-primary">
                    <Briefcase className="h-4 w-4" />
                    {member.role}
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                    <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
