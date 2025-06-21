import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/app-provider';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
