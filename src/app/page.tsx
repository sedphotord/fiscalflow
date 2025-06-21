
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle, FileText, ScanLine, ShieldCheck, Copy, CalendarDays, FileEdit, Lock, ArrowRight, Twitter, Linkedin, Facebook, BarChartHorizontal, Users, Bell, XCircle, Cloud, Headset, Sparkles, UploadCloud, Bot, FileCheck2, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export default function LandingPage() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggeredContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const keyBenefits = [
    {
      icon: ScanLine,
      title: 'Ahorra Tiempo, Automatiza Tareas',
      description: 'Reduce hasta un 90% el tiempo de digitación con nuestro escáner inteligente de facturas.',
    },
    {
      icon: ShieldCheck,
      title: 'Cumplimiento sin Estrés',
      description: 'Genera reportes validados y listos para la DGII, evitando errores y posibles multas.',
    },
    {
      icon: Users,
      title: 'Crece tu Práctica Contable',
      description: 'Gestiona múltiples clientes desde una sola plataforma, optimizando tu flujo de trabajo.',
    }
  ];

  const howItWorksSteps = [
    {
      icon: UploadCloud,
      title: '1. Captura tus Facturas',
      description: 'Sube una foto, un PDF o un lote de facturas. Nuestro sistema está listo para procesarlas.',
    },
    {
      icon: Bot,
      title: '2. Proceso con IA',
      description: 'Nuestra inteligencia artificial extrae, categoriza y valida todos los datos automáticamente.',
    },
    {
      icon: FileCheck2,
      title: '3. Genera y Declara',
      description: 'Con un solo clic, obtén tus archivos .txt listos para subir a la Oficina Virtual de la DGII.',
    }
  ];

  const allFeatures = [
    {
      icon: ScanLine,
      title: 'Escaneo Inteligente de Facturas (OCR)',
      description: 'Extrae RNC, NCF, montos e ITBIS automáticamente de imágenes o PDFs.',
    },
    {
      icon: ShieldCheck,
      title: 'Validación Automática RNC/NCF',
      description: 'Verifica datos en tiempo real contra las reglas de la DGII para evitar errores.',
    },
    {
      icon: FileText,
      title: 'Generación de Formatos (606, 607)',
      description: 'Crea los archivos .txt requeridos por la DGII listos para la declaración.',
    },
    {
      icon: BarChartHorizontal,
      title: 'Dashboard Analítico',
      description: 'Visualiza tus finanzas con gráficos de compras, ventas e impuestos.',
    },
    {
      icon: Users,
      title: 'Gestión Multi-Empresa',
      description: 'Ideal para contadores. Administra todos tus clientes desde una sola cuenta.',
    },
    {
      icon: Copy,
      title: 'Escaneo y Carga en Lote',
      description: 'Procesa cientos de facturas simultáneamente para máxima eficiencia.',
    },
    {
      icon: Bell,
      title: 'Alertas de Vencimiento de Impuestos',
      description: 'Recibe notificaciones para no olvidar nunca una fecha límite de declaración.',
    },
    {
      icon: Cloud,
      title: 'Plataforma 100% en la Nube',
      description: 'Accede a tu información de forma segura desde cualquier lugar y dispositivo.',
    },
    {
      icon: Headset,
      title: 'Soporte Técnico Especializado',
      description: 'Cuenta con asesoría experta cuando la necesites, sin costos adicionales.',
    }
  ];

  const pricingFeatures = [
    { name: "Facturas por Mes", gratis: "Hasta 50", pro: "Hasta 500", despacho: "Ilimitadas" },
    { name: "Formularios (606, 607)", gratis: true, pro: true, despacho: true },
    { name: "Validación RNC/NCF", gratis: true, pro: true, despacho: true },
    { name: "Exportación a Excel", gratis: true, pro: true, despacho: true },
    { name: "Dashboard Analítico", gratis: true, pro: true, despacho: true },
    { name: "Gestión Multi-Empresa", gratis: false, pro: "Hasta 10 clientes", despacho: "Ilimitados" },
    { name: "Escaneo en Lote", gratis: false, pro: true, despacho: true },
    { name: "Alertas y Recordatorios", gratis: false, pro: true, despacho: true },
    { name: "Usuarios por Cuenta", gratis: "1", pro: "Hasta 5", despacho: "Ilimitados" },
    { name: "API para Integración", gratis: false, pro: false, despacho: true },
    { name: "Soporte", gratis: "Email", pro: "Email Prioritario", despacho: "Telefónico 24/7" },
    { name: "Consultoría y Capacitación", gratis: false, pro: false, despacho: true },
  ];
  
  const invoicePacks = [
      { amount: 50, price: 1000, description: "Ideal para un pequeño empujón." },
      { amount: 100, price: 1500, description: "La mejor relación calidad-precio." },
      { amount: 200, price: 2500, description: "Para meses de alta actividad." },
  ];

  const faqItems = [
    {
      question: "¿Cómo funciona el escaneo inteligente de facturas?",
      answer: "Nuestro escáner utiliza tecnología de Reconocimiento Óptico de Caracteres (OCR) con inteligencia artificial. Simplemente suba una foto o PDF de su factura, y el sistema extraerá automáticamente el RNC, NCF, fecha y montos, llenando los campos del formulario por usted y minimizando errores."
    },
    {
      question: "¿Qué tan segura es mi información fiscal?",
      answer: "La seguridad es nuestra máxima prioridad. Todos sus datos se almacenan utilizando encriptación de nivel bancario. El acceso a su cuenta está protegido y seguimos las mejores prácticas de la industria para garantizar que su información fiscal y la de sus clientes esté siempre a salvo."
    },
    {
      question: "¿Puedo gestionar múltiples empresas o clientes?",
      answer: "¡Sí! FiscalFlow está diseñado tanto para contribuyentes individuales como para contadores. En nuestros planes Pro y Despacho, puede añadir y gestionar los perfiles de múltiples clientes desde un único panel de control, generando reportes individuales para cada uno de forma organizada."
    },
    {
      question: "¿Qué formatos de la DGII puedo generar con la aplicación?",
      answer: "Actualmente, puede generar los Formatos de Envío de Datos 606 (Compras) y 607 (Ventas). Estamos trabajando activamente para incorporar más formatos, como el 608 (NCF Anulados) y las declaraciones anuales (IR-1, IR-2) en futuras actualizaciones."
    },
    {
      question: "¿Qué hago si el escáner extrae un dato incorrecto?",
      answer: "Aunque nuestra IA es muy precisa, siempre tendrá la última palabra. Si nota un error después del escaneo, puede editar manualmente cualquier campo en el formulario antes de guardar o generar el reporte. La validación en tiempo real le ayudará a corregir formatos inválidos."
    }
  ];

  const renderPricingFeature = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? <CheckCircle className="h-6 w-6 text-green-500 mx-auto" /> : <XCircle className="h-6 w-6 text-destructive mx-auto" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 z-50 backdrop-blur">
          <Link href="#" className="flex items-center justify-center">
            <Logo />
          </Link>
          <nav className="ml-auto hidden lg:flex gap-6 items-center">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Características
            </Link>
             <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              Cómo Funciona
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Planes
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4">
              FAQ
            </Link>
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Iniciar Sesión
            </Link>
            <Link href="/signup">
              <Button>Registrarse</Button>
            </Link>
          </nav>
          <div className="ml-auto lg:hidden">
              <Link href="/login">
                  <Button>Iniciar Sesión</Button>
              </Link>
          </div>
        </header>
        <main className="flex-1">
          <motion.section 
            className="w-full py-12 md:py-24 lg:py-32"
            initial="hidden"
            animate="visible"
            variants={staggeredContainer}
          >
            <div className="container px-4 md:px-6">
              <div 
                className="relative grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] p-8 md:p-12 rounded-2xl items-center overflow-hidden"
                style={{ backgroundImage: 'url(https://cdn1.alegra.com/websites/green-banner-background-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-primary/90" />
                <motion.div className="relative z-10 flex flex-col justify-center space-y-4" variants={itemVariants}>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary-foreground">
                      Simplifica tus Reportes Fiscales a la DGII
                    </h1>
                    <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                      FiscalFlow es la herramienta definitiva para generar los formatos 606 y 607 sin complicaciones. Ahorra tiempo, evita errores y mantén tus impuestos al día.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/signup">
                      <Button size="lg" variant="secondary">Empieza Gratis</Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="ghost" className="border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                        Ya tengo una cuenta
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="relative z-10 mx-auto aspect-[3/2] overflow-hidden rounded-xl"
                >
                  <Image
                    src="https://placehold.co/600x400.png"
                    width="600"
                    height="400"
                    alt="Equipo de contabilidad trabajando"
                    className="object-cover"
                    data-ai-hint="accounting team"
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>
          
           <motion.section 
              className="w-full py-12 md:py-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
              <div className="container px-4 md:px-6">
                <motion.div 
                    className="grid gap-6 md:grid-cols-3"
                    variants={staggeredContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                  {keyBenefits.map((benefit, index) => (
                    <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center gap-4 p-6 rounded-lg">
                      <benefit.icon className="h-12 w-12 text-primary" />
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
          </motion.section>

          <motion.section 
              id="how-it-works"
              className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Proceso Simplificado</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cómo Funciona</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    En solo tres pasos, transforma tus facturas en reportes listos para la DGII.
                  </p>
                </div>
                <motion.div 
                    className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-3 md:gap-12 mt-12"
                    variants={staggeredContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                  {howItWorksSteps.map((step, index) => (
                    <motion.div key={index} variants={itemVariants} className="grid gap-2 text-center">
                      <div className="flex items-center justify-center">
                         <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <step.icon className="h-10 w-10 text-primary" />
                         </div>
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
          </motion.section>

          <motion.section 
              id="features" 
              className="w-full py-12 md:py-24 lg:py-32"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Todas las Características</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Todo lo que necesitas en un solo lugar</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    FiscalFlow simplifica el proceso contable con tecnología de punta diseñada específicamente para República Dominicana.
                  </p>
                </div>
              </div>
              <motion.div 
                  className="mx-auto grid max-w-7xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
                  variants={staggeredContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                {allFeatures.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants} 
                    className="h-full"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <Card className="h-full flex flex-col text-left p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <div className="flex items-start gap-4">
                           <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <feature.icon className="h-6 w-6 text-primary" />
                           </div>
                           <div className="flex-1">
                              <h3 className="text-lg font-bold">{feature.title}</h3>
                              <p className="mt-1 text-muted-foreground">{feature.description}</p>
                           </div>
                        </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            className="w-full py-12 md:py-24 lg:py-32"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
             <div className="container px-4 md:px-6">
                <div 
                  className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
                  style={{ backgroundImage: 'url(https://cdn1.alegra.com/websites/green-banner-background-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="absolute inset-0 bg-primary/90" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <Badge variant="secondary">Para Contadores</Badge>
                            <h2 className="text-3xl font-bold tracking-tighter text-primary-foreground">¿Eres Contador? Potencia tu Práctica</h2>
                            <p className="text-primary-foreground/80">
                                Gestiona todos tus clientes desde una única plataforma. Optimiza tu tiempo, centraliza la información y ofrece un servicio de primera con herramientas diseñadas para profesionales.
                            </p>
                            <Button asChild size="lg" variant="secondary">
                                <Link href="#pricing">Ver Planes para Despachos</Link>
                            </Button>
                        </div>
                         <div className="relative z-10 mx-auto aspect-video overflow-hidden rounded-xl">
                          <Image
                            src="https://placehold.co/600x338.png"
                            width="600"
                            height="338"
                            alt="Contador trabajando con cliente"
                            className="object-cover"
                            data-ai-hint="accountant client"
                          />
                        </div>
                    </div>
                </div>
             </div>
          </motion.section>

          <motion.section 
              id="pricing" 
              className="w-full py-12 md:py-24 lg:py-32"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
              <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                      <div className="space-y-2">
                          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planes diseñados para tu negocio</h2>
                          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                          Desde contadores independientes hasta grandes despachos contables. Encuentra el plan perfecto para ti.
                          </p>
                      </div>
                  </div>
                  <motion.div 
                      className="mx-auto max-w-7xl overflow-x-auto"
                      variants={itemVariants}
                  >
                      <div className="grid grid-cols-[minmax(200px,_1fr)_repeat(3,_minmax(150px,_1fr))] gap-x-4 gap-y-6">
                          {/* Headers */}
                          <div className="font-bold text-lg sticky top-0">Características</div>
                          <div className="text-center sticky top-0">
                              <h3 className="font-bold text-lg">Gratis</h3>
                              <p className="text-2xl font-bold">RD$ 0</p>
                              <p className="text-sm text-muted-foreground">/mes</p>
                          </div>
                          <div className="text-center sticky top-0 rounded-lg p-2 border-2 border-primary relative">
                              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Más Popular</Badge>
                              <h3 className="font-bold text-lg text-primary">Pro</h3>
                              <p className="text-2xl font-bold">RD$ 2,500</p>
                              <p className="text-sm text-muted-foreground">/mes</p>
                          </div>
                          <div className="text-center sticky top-0">
                              <h3 className="font-bold text-lg">Despacho</h3>
                              <p className="text-2xl font-bold">RD$ 6,500</p>
                              <p className="text-sm text-muted-foreground">/mes</p>
                          </div>

                           {/* Divider */}
                          <div className="col-span-4 border-b"></div>

                          {/* Features */}
                          {pricingFeatures.map((feature) => (
                              <React.Fragment key={feature.name}>
                                  <div className="py-4 font-medium flex items-center">{feature.name}</div>
                                  <div className="py-4 text-center flex items-center justify-center">{renderPricingFeature(feature.gratis)}</div>
                                  <div className="py-4 text-center flex items-center justify-center bg-primary/5 rounded-lg">{renderPricingFeature(feature.pro)}</div>
                                  <div className="py-4 text-center flex items-center justify-center">{renderPricingFeature(feature.despacho)}</div>
                              </React.Fragment>
                          ))}
                          
                           {/* Divider */}
                           <div className="col-span-4 border-b"></div>

                           {/* Action Buttons */}
                           <div></div>
                            <div className="p-4 text-center">
                                <Link href="/signup" className="w-full"><Button variant="outline" className="w-full">Comenzar Gratis</Button></Link>
                            </div>
                            <div className="p-4 text-center">
                                <Link href="/signup" className="w-full"><Button className="w-full">Elegir Pro</Button></Link>
                            </div>
                            <div className="p-4 text-center">
                                <Link href="#" className="w-full"><Button variant="outline" className="w-full">Contactar Ventas</Button></Link>
                            </div>
                      </div>
                  </motion.div>
                  
                  <div className="mt-20">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">¿Te quedaste sin facturas?</h3>
                          <p className="max-w-[700px] text-muted-foreground">
                          No esperes a que tu ciclo se renueve. Compra un paquete de facturas adicionales y sigue trabajando sin interrupciones.
                          </p>
                      </div>
                      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {invoicePacks.map((pack) => (
                              <Card key={pack.amount} className="text-center">
                                  <CardHeader>
                                      <CardTitle>{pack.amount} Facturas Adicionales</CardTitle>
                                      <CardDescription>{pack.description}</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                      <p className="text-3xl font-bold">RD$ {pack.price}</p>
                                  </CardContent>
                                  <CardFooter>
                                      <Button className="w-full">Comprar Paquete</Button>
                                  </CardFooter>
                              </Card>
                          ))}
                      </div>
                  </div>

                   <div className="mt-16 text-center">
                      <h3 className="text-xl font-semibold">¿Necesitas un plan personalizado? ¿Tienes más de 10 empresas?</h3>
                      <Button asChild variant="link" className="text-lg mt-2">
                          <Link href="#">Contactar para Plan Empresarial <ArrowRight className="ml-2 h-5 w-5" /></Link>
                      </Button>
                  </div>
              </div>
          </motion.section>

           <motion.section 
              id="faq" 
              className="w-full py-12 md:py-24 lg:py-32"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Preguntas Frecuentes</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Aquí encontrará respuestas a las preguntas más comunes sobre FiscalFlow.
                </p>
              </div>
              <div className="mx-auto mt-12 max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-lg">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </motion.section>

        </main>
        <footer className="border-t bg-secondary/30">
          <div className="container grid items-center gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
            <div className="flex flex-col gap-2">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Simplificando la contabilidad fiscal en República Dominicana.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm md:col-span-2 md:grid-cols-4">
              <div className="grid gap-1">
                <h3 className="font-semibold">Producto</h3>
                <Link href="#features" className="hover:underline">Características</Link>
                <Link href="#how-it-works" className="hover:underline">Cómo Funciona</Link>
                <Link href="#pricing" className="hover:underline">Planes</Link>
                <Link href="#faq" className="hover:underline">FAQ</Link>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Compañía</h3>
                <Link href="#" className="hover:underline">Sobre Nosotros</Link>
                <Link href="#" className="hover:underline">Carreras</Link>
                <Link href="#" className="hover:underline">Contacto</Link>
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold">Legal</h3>
                <Link href="#" className="hover:underline">Términos de Servicio</Link>
                <Link href="#" className="hover:underline">Política de Privacidad</Link>
              </div>
               <div className="grid gap-1">
                <h3 className="font-semibold">Redes Sociales</h3>
                <div className="flex gap-4 mt-2">
                    <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                    <Link href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                    <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t py-6">
            <p className="container px-4 text-center text-xs text-muted-foreground md:px-6">
              &copy; 2024 FiscalFlow. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
      
      <Dialog open={!!selectedFeature} onOpenChange={(isOpen) => !isOpen && setSelectedFeature(null)}>
        <DialogContent>
          {selectedFeature && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                   <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <selectedFeature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <DialogTitle className="text-2xl">{selectedFeature.title}</DialogTitle>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-foreground whitespace-pre-wrap">
                {selectedFeature.description}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
