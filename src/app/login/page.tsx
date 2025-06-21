import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
           <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
