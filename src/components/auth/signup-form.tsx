'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SignUpSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/app-provider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function SignUpForm() {
  const router = useRouter();
  const { showToast, updateSettings } = useAppContext();
  
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      accountType: 'personal',
      companyName: '',
      rnc: '',
    },
  });

  const accountType = form.watch('accountType');

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    console.log(values);
    updateSettings({
      name: values.accountType === 'empresa' ? values.companyName! : values.name,
      rnc: values.accountType === 'empresa' ? values.rnc || '' : '',
      email: values.email,
    });
    showToast({
        title: "Registro Exitoso",
        description: "Su cuenta ha sido creada.",
      });
    router.push('/dashboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Cuenta</CardTitle>
        <CardDescription>Complete el formulario para registrarse.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Cuenta</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="personal" />
                        </FormControl>
                        <FormLabel className="font-normal">Personal</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="empresa" />
                        </FormControl>
                        <FormLabel className="font-normal">Empresa</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {accountType === 'empresa' && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Mi Empresa SRL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rnc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RNC de la Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="RNC de la empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{accountType === 'empresa' ? 'Su Nombre Completo' : 'Nombre Completo'}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                O continuar con
                </span>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button variant="outline">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 74.7C309 93.5 280.7 80 248 80c-73.2 0-133.1 61.2-133.1 176s59.9 176 133.1 176c78.8 0 110.9-61.2 114.9-92.4h-114.9v-94.7h216.5c1.9 11.6 3.5 24.1 3.5 38.2z"></path></svg>
                Google
            </Button>
            <Button variant="outline">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.6 0 184.2 0 241.2c0 61.6 31.6 116.8 80.7 141.2 22.9 11.3 48.4 11.3 75.3 11.3 30.3 0 64.9-18.4 83.4-18.4 18.2 0 45.6 18.1 76.8 18.1 27.5 0 52.2-11.3 75.2-11.3-2.1-3-22.1-34.8-22.1-34.8zM252.1 64C280.9 36.3 294.6 0 286.5 0c-18.1 1.2-40.1 14.1-59.4 34.6-20.5 21.6-34.2 49.3-29.2 73.5 16.3 2.8 38.3-9.5 54.2-24.6z"></path></svg>
                Apple
            </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          ¿Ya tiene una cuenta?{' '}
          <Link href="/login" className="underline text-primary">
            Inicie Sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}