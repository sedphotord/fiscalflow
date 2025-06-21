import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const invoicePacks = [
    { amount: 50, price: 1000, description: "Ideal para un pequeño empujón." },
    { amount: 100, price: 1500, description: "La mejor relación calidad-precio." },
    { amount: 200, price: 2500, description: "Para meses de alta actividad." },
];

export default function BuyInvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Comprar Facturas Adicionales"
        description="¿Se quedó sin cuota? No espere a que su ciclo se renueve. Compre un paquete y siga trabajando."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {invoicePacks.map((pack) => (
              <Card key={pack.amount} className="flex flex-col">
                  <CardHeader>
                      <CardTitle>{pack.amount} Facturas Adicionales</CardTitle>
                      <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                      <p className="text-4xl font-bold">RD$ {pack.price}</p>
                      <p className="text-sm text-muted-foreground">Pago único</p>
                  </CardContent>
                  <CardFooter>
                      <Button className="w-full">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Comprar Paquete
                      </Button>
                  </CardFooter>
              </Card>
          ))}
      </div>
    </div>
  );
}
