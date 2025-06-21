import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { CheckCircle, FileText, BarChart2, Settings } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Iniciar Sesión
          </Link>
          <Link href="/signup">
            <Button>Registrarse</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
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
              </div>
              <img
                data-ai-hint="accounting taxes"
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Características Principales</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Todo lo que necesitas en un solo lugar</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Desde la entrada de datos hasta la generación del archivo .txt listo para la DGII.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center">
                 <FileText className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Formatos 606 y 607</h3>
                <p className="text-sm text-muted-foreground">Genera reportes de compras y ventas con una interfaz intuitiva y rápida.</p>
              </div>
              <div className="grid gap-1 text-center">
                <CheckCircle className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Validación Automática</h3>
                <p className="text-sm text-muted-foreground">Nuestro sistema valida los datos para minimizar errores antes de generar el reporte final.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BarChart2 className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Dashboard Intuitivo</h3>
                <p className="text-sm text-muted-foreground">Visualiza un resumen de tus reportes y accede rápidamente a las funciones más importantes.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 FiscalFlow. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
