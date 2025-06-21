
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle, FileText, ScanLine, ShieldCheck, Copy, CalendarDays, FileEdit, Lock, ArrowRight, Twitter, Linkedin, Facebook, BarChartHorizontal, Users, Bell, XCircle, Cloud, Headset, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';

export default function LandingPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
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

  const featuresList = [
    {
      icon: ScanLine,
      title: 'Escaneo Inteligente',
      shortDescription: 'Escanea facturas físicas o sube imágenes/PDFs. OCR avanzado extrae RNC, NCF, montos e ITBIS automáticamente.',
      detailedDescription: `Nuestra tecnología de **Reconocimiento Óptico de Caracteres (OCR) impulsada por Inteligencia Artificial** transforma la tediosa tarea de digitar facturas en un proceso de segundos. Simplemente toma una foto de tu factura de compra o sube un archivo PDF, y FiscalFlow se encarga del resto.\n\nEl sistema identifica y extrae con precisión los campos clave: **RNC del proveedor, Número de Comprobante Fiscal (NCF), fecha de emisión, monto total e ITBIS facturado**. Estos datos se colocan directamente en el borrador del Formato 606, minimizando errores humanos y ahorrándote horas de trabajo manual. Es la forma más rápida y segura de registrar tus compras.`
    },
    {
      icon: ShieldCheck,
      title: 'Validación Automática',
      shortDescription: 'Valida RNC y NCF en tiempo real. Detecta errores antes de generar formularios oficiales.',
      detailedDescription: `Evita los rechazos de la DGII antes de que ocurran. Cada vez que ingresas un RNC o un NCF, ya sea manualmente o a través del escáner, nuestro sistema lo **valida en tiempo real** contra las reglas de la DGII.\n\nVerificamos la longitud correcta, el formato y la estructura de los RNC/Cédulas y los NCF. Esta capa de seguridad proactiva asegura que tus datos sean correctos desde el principio, garantizando que los archivos \`.txt\` que generes cumplan con los estándares de la DGII y sean aceptados sin problemas.`
    },
    {
      icon: FileText,
      title: 'Generación de Formularios DGII',
      shortDescription: 'Genera automáticamente los archivos de envío de datos requeridos por la DGII, listos para declarar.',
      detailedDescription: `El corazón de FiscalFlow. Convierte tus registros de compras y ventas en los archivos de texto (\`.txt\`) listos para ser subidos a la Oficina Virtual de la DGII. Olvídate de los formatos complicados y las especificaciones técnicas.\n\nActualmente, la plataforma te permite generar:\n• **Formato 606:** Reporte de Compras de Bienes y Servicios.\n• **Formato 607:** Reporte de Ventas de Bienes y Servicios.\n\nEstamos trabajando para ampliar nuestro catálogo de formularios para incluir el **Formato 608 (NCF Anulados)**, el **Formato 609 (Pagos al Exterior)** y las declaraciones juradas anuales como el **IR-1** para personas físicas y el **IR-2** para sociedades. Con FiscalFlow, el cumplimiento fiscal está a solo un clic de distancia.`
    },
    {
      icon: Cloud,
      title: '100% en la Nube',
      shortDescription: 'Empieza fácilmente y sin necesidad de descargas, actualizaciones ni servidores.',
      detailedDescription: 'Dile adiós a las instalaciones complicadas y al mantenimiento de software. FiscalFlow opera completamente en la nube, lo que significa que puedes acceder a tu información desde cualquier dispositivo con conexión a internet.\n\nNo necesitas preocuparte por descargas, instalaciones ni actualizaciones. Nosotros nos encargamos de todo para que siempre tengas la última versión de la aplicación, con las funcionalidades más recientes y las últimas regulaciones fiscales. Tu información se guarda de forma segura y está disponible para ti 24/7, donde sea que estés.'
    },
    {
      icon: Headset,
      title: 'Soporte 24/7 Ilimitado',
      shortDescription: 'Cuenta con asesoría contable experta cuando la necesites, sin costos adicionales.',
      detailedDescription: 'Tu tranquilidad es nuestra prioridad. Por eso, ofrecemos soporte ilimitado 24/7 con expertos contables. Ya sea que tengas una duda sobre cómo registrar una factura complicada o necesites entender una nueva regulación, nuestro equipo está aquí para ayudarte.\n\nEl soporte está incluido en tu plan, sin costos ocultos. Puedes contactarnos por chat, correo electrónico o teléfono en cualquier momento. No estás solo en tu gestión fiscal; tienes un equipo de profesionales respaldándote.'
    },
    {
      icon: Sparkles,
      title: 'Gestiona tu Contabilidad con IA',
      shortDescription: 'Optimiza procesos con IA que sugiere categorizaciones y automatiza tareas repetitivas.',
      detailedDescription: 'Deja que la Inteligencia Artificial trabaje por ti. FiscalFlow utiliza IA no solo para escanear facturas, sino también para optimizar tu flujo de trabajo. El sistema aprende de tus operaciones y comienza a sugerir automáticamente la categorización de tus gastos según el tipo de bien o servicio.\n\nEsta automatización reduce drásticamente el tiempo que dedicas a tareas repetitivas y minimiza el riesgo de errores. Con el tiempo, la IA se vuelve más inteligente, haciendo que tu gestión contable sea cada vez más rápida y precisa.'
    }
  ];

  const servicesList = [
    {
      icon: Copy,
      title: 'Escaneo en Lote',
      description: 'Procesa múltiples facturas simultáneamente con repetición automática si hay errores.',
      detailedDescription: 'Sube hasta 50 facturas a la vez (en el plan Pro). Nuestro sistema las procesa en segundo plano, valida cada una y te notifica cuando estén listas. Si una factura falla, puedes corregirla individualmente sin afectar al resto del lote.',
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40'
    },
    {
      icon: FileText,
      title: 'Formularios Automáticos',
      description: 'Genera formularios 606, 607, 608, y más, de la DGII automáticamente.',
      detailedDescription: 'Olvídate de los cálculos manuales. Después de procesar tus facturas, FiscalFlow genera los archivos .txt para los formatos 606, 607 y más, listos para ser cargados directamente en la Oficina Virtual de la DGII. Precisión garantizada.',
      iconColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/40'
    },
    {
      icon: ShieldCheck,
      title: 'Validación RNC/NCF',
      description: 'Verifica RNC y NCF en tiempo real con la base de datos oficial de la DGII.',
      detailedDescription: 'Cada RNC y NCF que ingresas es verificado en tiempo real contra la base de datos oficial de la DGII. Esta validación proactiva previene errores comunes que pueden causar rechazos y retrasos en tus declaraciones.',
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/40'
    },
    {
      icon: CalendarDays,
      title: 'Organización por Mes',
      description: 'Organiza automáticamente facturas por empresa y mes, ordenadas cronológicamente.',
      detailedDescription: 'El sistema clasifica y archiva automáticamente cada factura por empresa, mes y año. Accede a tus registros históricos de forma ordenada y encuentra cualquier documento en segundos. Ideal para auditorías y consultas rápidas.',
      iconColor: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/40'
    },
    {
      icon: FileEdit,
      title: 'Edición Manual',
      description: 'Revisa y edita cada factura individualmente antes de generar los formularios.',
      detailedDescription: 'Tienes el control total. Antes de generar el reporte final, puedes revisar cada campo extraído por la IA, hacer ajustes, corregir montos o añadir información. La combinación perfecta de automatización y supervisión humana.',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/40'
    },
    {
      icon: Lock,
      title: 'Respaldo Seguro',
      description: 'Respaldo automático en la nube con encriptación y acceso desde cualquier dispositivo.',
      detailedDescription: 'Tu información es invaluable. Todas tus facturas y reportes se respaldan automáticamente en nuestra nube segura, con encriptación de extremo a extremo. Accede a tus datos desde cualquier lugar y dispositivo con total tranquilidad.',
      iconColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/40'
    },
    {
      icon: BarChartHorizontal,
      title: 'Dashboard Analítico',
      description: 'Visualiza tus finanzas con gráficos de compras, ventas e impuestos.',
      detailedDescription: 'Toma decisiones informadas con nuestro dashboard interactivo. Visualiza tendencias de compras y ventas, compara períodos fiscales, y analiza la distribución de tus gastos e ingresos. Los gráficos claros y concisos te ayudan a entender la salud financiera de tu negocio de un vistazo.',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/40'
    },
    {
      icon: Users,
      title: 'Gestión Multi-Empresa',
      description: 'Ideal para contadores. Administra múltiples clientes desde una sola cuenta.',
      detailedDescription: 'Diseñado para profesionales de la contabilidad. Agrega y gestiona los perfiles de todos tus clientes desde un único panel de control. Genera reportes individuales para cada empresa de forma segura y organizada, optimizando tu flujo de trabajo y ahorrando tiempo valioso.',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/40'
    },
    {
      icon: Bell,
      title: 'Alertas y Recordatorios',
      description: 'No olvides una fecha límite. Recibe notificaciones de vencimientos de impuestos.',
      detailedDescription: 'Mantente siempre al día con tus obligaciones fiscales. Nuestro sistema te enviará recordatorios y alertas sobre las fechas límite para la presentación de los formatos 606, 607 y otras declaraciones importantes. Configura las notificaciones para que se adapten a tus necesidades y evita multas y recargos.',
      iconColor: 'text-lime-600 dark:text-lime-400',
      bgColor: 'bg-lime-100 dark:bg-lime-900/40'
    }
  ];

  const features = [
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

  const renderFeature = (value: string | boolean) => {
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
            <Link href="#services" className="text-sm font-medium hover:underline underline-offset-4">
              Servicios
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
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Características Principales</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Todo lo que necesitas en un solo lugar</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    FiscalFlow simplifica el proceso contable con tecnología de punta diseñada específicamente para República Dominicana.
                  </p>
                </div>
              </div>
              <motion.div 
                  className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12"
                  variants={staggeredContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                {featuresList.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="grid gap-2 text-center p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300 cursor-pointer"
                    variants={itemVariants}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <feature.icon className="h-12 w-12 mx-auto text-primary" />
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.shortDescription}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
              id="services" 
              className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Servicios Detallados</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Potencia tu gestión contable</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-lg">
                      Cada una de nuestras herramientas está diseñada para ahorrarte tiempo y darte tranquilidad.
                  </p>
              </div>
              <motion.div 
                  className="mx-auto grid max-w-7xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12"
                  variants={staggeredContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                {servicesList.map((service, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants} 
                    className="h-full"
                    onClick={() => setSelectedService(service)}
                  >
                    <Card className="h-full flex flex-col text-left p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full ${service.bgColor}`}>
                            <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="mt-2 text-muted-foreground flex-1">
                            {service.description}
                        </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
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
                          {features.map((feature) => (
                              <React.Fragment key={feature.name}>
                                  <div className="py-4 font-medium flex items-center">{feature.name}</div>
                                  <div className="py-4 text-center flex items-center justify-center">{renderFeature(feature.gratis)}</div>
                                  <div className="py-4 text-center flex items-center justify-center bg-primary/5 rounded-lg">{renderFeature(feature.pro)}</div>
                                  <div className="py-4 text-center flex items-center justify-center">{renderFeature(feature.despacho)}</div>
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
                <Link href="#services" className="hover:underline">Servicios</Link>
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
      
      <Dialog open={!!selectedService} onOpenChange={(isOpen) => !isOpen && setSelectedService(null)}>
        <DialogContent>
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                   <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${selectedService.bgColor}`}>
                      <selectedService.icon className={`h-6 w-6 ${selectedService.iconColor}`} />
                  </div>
                  <DialogTitle className="text-2xl">{selectedService.title}</DialogTitle>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-foreground whitespace-pre-wrap">
                {selectedService.detailedDescription}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      
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
              <DialogDescription className="text-base text-foreground whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: selectedFeature.detailedDescription.replace(/\n/g, '<br />') }}>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
