import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/app-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'FiscalFlow',
  description: 'Gestión de reportes fiscales para la DGII.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
