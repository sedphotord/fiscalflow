'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle, FileText, ScanLine, ShieldCheck, Copy, CalendarDays, FileEdit, Lock, ArrowRight, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {

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


  return (
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
              <motion.div className="grid gap-2 text-center" variants={itemVariants}>
                 <ScanLine className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Escaneo Inteligente</h3>
                <p className="text-muted-foreground">Escanea facturas físicas o sube imágenes/PDFs. OCR avanzado extrae RNC, NCF, montos e ITBIS automáticamente.</p>
              </motion.div>
              <motion.div className="grid gap-2 text-center" variants={itemVariants}>
                <ShieldCheck className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Validación Automática</h3>
                <p className="text-muted-foreground">Valida RNC y NCF en tiempo real. Detecta errores antes de generar formularios oficiales.</p>
              </motion.div>
              <motion.div className="grid gap-2 text-center" variants={itemVariants}>
                <FileText className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Formularios DGII</h3>
                <p className="text-muted-foreground">Genera automáticamente formularios 606, 607, y más, listos para declarar. Todo lo que necesitas sin errores.</p>
              </motion.div>
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
                className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12"
                variants={staggeredContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <Copy className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Escaneo en Lote</h3>
                        <p className="text-muted-foreground">Procesa múltiples facturas simultáneamente con repetición automática si hay errores.</p>
                    </div>
                </motion.div>
                <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <FileText className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Formularios Automáticos</h3>
                        <p className="text-muted-foreground">Genera formularios 606, 607, 608, 609, 612, 615, 987 de la DGII automáticamente.</p>
                    </div>
                </motion.div>
                 <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Validación RNC/NCF</h3>
                        <p className="text-muted-foreground">Verifica RNC y NCF en tiempo real con la base de datos oficial de la DGII.</p>
                    </div>
                </motion.div>
                 <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <CalendarDays className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Organización por Mes</h3>
                        <p className="text-muted-foreground">Organiza automáticamente facturas por empresa y mes, ordenadas cronológicamente.</p>
                    </div>
                </motion.div>
                 <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <FileEdit className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Edición Manual</h3>
                        <p className="text-muted-foreground">Revisa y edita cada factura individualmente antes de generar los formularios.</p>
                    </div>
                </motion.div>
                 <motion.div className="flex items-start gap-4" variants={itemVariants}>
                    <Lock className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold">Respaldo Seguro</h3>
                        <p className="text-muted-foreground">Respaldo automático en la nube con encriptación y acceso desde cualquier dispositivo.</p>
                    </div>
                </motion.div>
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
  );
}
