'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle, FileText, ScanLine, ShieldCheck, Copy, CalendarDays, FileEdit, Lock, ArrowRight, Twitter, Linkedin, Facebook, BarChartHorizontal, Users, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
            className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/30"
            initial="hidden"
            animate="visible"
            variants={staggeredContainer}
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <motion.div className="flex flex-col justify-center space-y-4" variants={itemVariants}>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                      Simplifica tus Reportes Fiscales a la DGII
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      FiscalFlow es la herramienta definitiva para generar los formatos 606 y 607 sin complicaciones. Ahorra tiempo, evita errores y mantén tus impuestos al día.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/signup">
                      <Button size="lg">Empieza Gratis</Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline">
                        Ya tengo una cuenta
                      </Button>
                    </Link>
                  </div>
                </motion.div>
                <motion.img
                  variants={itemVariants}
                  src="https://umecit.edu.pa/wp-content/uploads/2022/09/mejores-trabajos-en-contabilidad-en-Panama%CC%81.jpg"
                  width="600"
                  height="400"
                  alt="Equipo de contabilidad trabajando"
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
                />
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
                      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                      variants={staggeredContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      <motion.div variants={itemVariants}>
                        <Card className="flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">Gratis</CardTitle>
                                <CardDescription>Perfecto para contadores independientes</CardDescription>
                                <div className="text-4xl font-bold pt-2">RD$ 0<span className="text-xl font-normal text-muted-foreground">/mes</span></div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                              <ul className="space-y-3">
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Hasta 50 facturas por mes</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Formularios básicos (606, 607)</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Validación RNC/NCF</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Soporte por email</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Exportación a Excel</span></li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/signup" className="w-full"><Button variant="outline" className="w-full">Comenzar Gratis</Button></Link>
                            </CardFooter>
                        </Card>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <Card className="flex flex-col border-primary shadow-lg relative h-full">
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Más Popular</Badge>
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>Ideal para contadores con múltiples clientes</CardDescription>
                                <div className="text-4xl font-bold pt-2">RD$ 2,500<span className="text-xl font-normal text-muted-foreground">/mes</span></div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                              <ul className="space-y-3">
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Hasta 500 facturas por mes</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Todos los formularios DGII</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Escaneo en lote avanzado</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>API para integración</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Respaldo automático</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Soporte prioritario</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Reportes personalizados</span></li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="/signup" className="w-full"><Button className="w-full">Elegir Pro</Button></Link>
                            </CardFooter>
                        </Card>
                      </motion.div>

                       <motion.div variants={itemVariants}>
                        <Card className="flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">Despacho</CardTitle>
                                <CardDescription>Para despachos contables y empresas grandes</CardDescription>
                                <div className="text-4xl font-bold pt-2">RD$ 6,500<span className="text-xl font-normal text-muted-foreground">/mes</span></div>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                              <ul className="space-y-3">
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Facturas ilimitadas</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Múltiples empresas</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Panel administrativo</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Usuarios ilimitados</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Integraciones personalizadas</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Soporte telefónico 24/7</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Consultoría incluida</span></li>
                                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /><span>Capacitación del equipo</span></li>
                              </ul>
                            </CardContent>
                            <CardFooter>
                                <Link href="#" className="w-full"><Button variant="outline" className="w-full">Contactar Ventas</Button></Link>
                            </CardFooter>
                        </Card>
                       </motion.div>
                  </motion.div>
                   <div className="mt-12 text-center">
                      <h3 className="text-xl font-semibold">¿Necesitas un plan personalizado? ¿Tienes más de 10 empresas?</h3>
                      <Button asChild variant="link" className="text-lg mt-2">
                          <Link href="#">Contactar para Plan Empresarial <ArrowRight className="ml-2 h-5 w-5" /></Link>
                      </Button>
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
              <DialogDescription className="text-base text-foreground whitespace-pre-wrap">
                {selectedFeature.detailedDescription}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
