'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Percent, Building2, TrendingUp, Landmark, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import Link from 'next/link';

const calculators = [
  {
    title: 'Retenciones',
    description: 'Calcule las retenciones de ISR aplicables a sus pagos.',
    icon: Percent,
    href: '#',
  },
  {
    title: 'Constitución de Compañías',
    description: 'Estime el impuesto por constitución de su empresa.',
    icon: Building2,
    href: '#',
  },
  {
    title: 'Variación Capital Social',
    description: 'Calcule el impuesto por aumento de capital social.',
    icon: TrendingUp,
    href: '#',
  },
  {
    title: 'Transferencia Inmobiliaria',
    description: 'Determine el impuesto por la transferencia de un inmueble.',
    icon: Landmark,
    href: '#',
  },
  {
    title: 'Recargos e Intereses',
    description: 'Calcule los recargos e intereses por mora en sus declaraciones.',
    icon: AlertTriangle,
    href: '#',
  },
  {
    title: 'Régimen Simplificado (RST)',
    description: 'Estime su cuota para el Régimen Simplificado de Tributación.',
    icon: FileText,
    href: '#',
  },
];

export default function CalculatorsPage() {
  const { showToast } = useAppContext();

  const handleCalculatorClick = (title: string) => {
    showToast({
        title: 'Calculadora en Desarrollo',
        description: `La calculadora para "${title}" estará disponible próximamente.`
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Calculadoras Fiscales"
        description="Estime los montos de sus impuestos y obligaciones antes de realizar sus trámites."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <Card 
            key={calculator.title} 
            className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCalculatorClick(calculator.title)}
          >
            <CardHeader className="flex-row items-center gap-4">
              <calculator.icon className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{calculator.title}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Future content can go here */}
            </CardContent>
            <div className="flex justify-end p-4">
                <Button variant="ghost">
                    Abrir Calculadora <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
