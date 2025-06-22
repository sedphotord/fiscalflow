
'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Facebook, Linkedin, Moon, Sun, Twitter } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import React, { useState, useEffect } from 'react';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useAppContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="w-full h-16 flex items-center border-b sticky top-0 bg-background/95 z-50 backdrop-blur">
                <div className="container flex items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center justify-center">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-2">
                        {mounted && (
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        )}
                        <Button asChild variant="ghost">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver al Inicio
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t bg-secondary/30">
                <div className="container grid items-center gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
                    <div className="flex flex-col gap-2">
                    <Logo />
                    <p className="text-sm text-muted-foreground">
                        Simplificando la contabilidad fiscal en República Dominicana.
                    </p>
                    <Link href="mailto:contacto@fiscalflow.app" className="text-sm text-primary hover:underline">
                        contacto@fiscalflow.app
                    </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm md:col-span-2 md:grid-cols-4">
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Producto</h3>
                        <Link href="/#features" className="hover:underline">Características</Link>
                        <Link href="/#pricing" className="hover:underline">Planes</Link>
                        <Link href="/#faq" className="hover:underline">FAQ</Link>
                        <Link href="/blog" className="hover:underline">Blog</Link>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Compañía</h3>
                        <Link href="/about" className="hover:underline">Sobre Nosotros</Link>
                        <Link href="/careers" className="hover:underline">Carreras</Link>
                        <Link href="/press" className="hover:underline">Prensa</Link>
                        <Link href="/contact" className="hover:underline">Contacto</Link>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="font-semibold">Legal</h3>
                        <Link href="/terms" className="hover:underline">Términos de Servicio</Link>
                        <Link href="/privacy" className="hover:underline">Política de Privacidad</Link>
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
                    &copy; 2025 FiscalFlow. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
