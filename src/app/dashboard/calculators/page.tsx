
'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Percent, Building2, TrendingUp, Landmark, AlertTriangle, FileText, ArrowRight, ChevronDown } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const calculators = [
  {
    title: 'Retenciones',
    description: 'Calcule las retenciones de ISR aplicables a sus pagos.',
    icon: Percent,
    href: '/dashboard/calculators/retenciones',
    isImplemented: true,
  },
  {
    title: 'Constitución de Compañías',
    description: 'Estime el impuesto por constitución de su empresa.',
    icon: Building2,
    href: '/dashboard/calculators/constitucion-companias',
    isImplemented: true,
  },
  {
    title: 'Variación Capital Social',
    description: 'Calcule el impuesto por aumento de capital social.',
    icon: TrendingUp,
    href: '/dashboard/calculators/variacion-capital',
    isImplemented: true,
  },
  {
    title: 'Transferencia Inmobiliaria',
    description: 'Determine el impuesto por la transferencia de un inmueble.',
    icon: Landmark,
    href: '#',
    isImplemented: false,
  },
  {
    title: 'Recargos e Intereses',
    description: 'Calcule los recargos e intereses por mora en sus declaraciones.',
    icon: AlertTriangle,
    href: '#',
    isImplemented: false,
  },
  {
    title: 'Régimen Simplificado (RST)',
    description: 'Estime su cuota para el Régimen Simplificado de Tributación.',
    icon: FileText,
    href: '#',
    isImplemented: false,
  },
];

export default function CalculatorsPage() {
  const { showToast } = useAppContext();
  const router = useRouter();

  const handleCalculatorClick = (calculator: typeof calculators[0]) => {
    if (!calculator.isImplemented) {
        showToast({
            title: 'Calculadora en Desarrollo',
            description: `La calculadora para "${calculator.title}" estará disponible próximamente.`
        });
    }
  };

  const handleDropdownSelect = (calculator: typeof calculators[0]) => {
    if (calculator.isImplemented) {
      router.push(calculator.href);
    } else {
      handleCalculatorClick(calculator);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Calculadoras Fiscales"
        description="Estime los montos de sus impuestos y obligaciones antes de realizar sus trámites."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Seleccionar Calculadora
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {calculators.map((calculator) => (
              <DropdownMenuItem
                key={calculator.title}
                onSelect={() => handleDropdownSelect(calculator)}
                className="cursor-pointer"
              >
                <calculator.icon className="mr-2 h-4 w-4" />
                <span>{calculator.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <Link 
            key={calculator.title} 
            href={calculator.isImplemented ? calculator.href : '#'}
            onClick={() => handleCalculatorClick(calculator)}
            className="flex"
          >
            <Card className="flex flex-col w-full hover:shadow-lg transition-shadow cursor-pointer">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
