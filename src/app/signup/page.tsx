import { SignUpForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/logo';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Logo />
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
