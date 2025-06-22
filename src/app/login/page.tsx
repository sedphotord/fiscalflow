
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/50 p-4">
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <LoginForm />
        </div>
      </main>
       <footer className="w-full max-w-md py-8 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/terms" className="hover:text-primary hover:underline">Términos de Servicio</Link>
          <Link href="/privacy" className="hover:text-primary hover:underline">Política de Privacidad</Link>
          <Link href="/contact" className="hover:text-primary hover:underline">Contacto</Link>
        </div>
         <p className="mt-4">&copy; 2025 FiscalFlow. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
