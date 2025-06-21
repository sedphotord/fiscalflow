'use client';

import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Eye, EyeOff, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '@/context/app-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const mockApiKeys = [
    { service: 'Google Maps API', key: 'AIzaSy******************', status: 'Activa' },
    { service: 'OpenAI API', key: 'sk-**********************', status: 'Activa' },
    { service: 'Twilio API', key: 'AC**********************', status: 'Inactiva' },
]

export default function AdminIntegrationsPage() {
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
    const { showToast } = useAppContext();

    const toggleShowKey = (service: string) => {
        setShowKeys(prev => ({...prev, [service]: !prev[service]}));
    }

    const handleCopy = (key: string) => {
        navigator.clipboard.writeText(key.replace(/\*/g, ''));
        showToast({ title: "Copiado", description: "La clave de API ha sido copiada." });
    }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestión de Integraciones"
        description="Configure las integraciones con servicios de terceros y gestione las claves de API."
      />
        <Tabs defaultValue="api-keys">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api-keys">Claves de API</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            <TabsContent value="api-keys">
                <Card>
                    <CardHeader>
                        <CardTitle>Claves de API de Servicios</CardTitle>
                        <CardDescription>
                            Gestione las claves de API para los servicios externos que utiliza la aplicación.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {mockApiKeys.map(apiKey => (
                            <div key={apiKey.service} className="space-y-2">
                                <Label htmlFor={apiKey.service}>{apiKey.service}</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id={apiKey.service}
                                        value={showKeys[apiKey.service] ? apiKey.key.replace(/\*/g, 'X') : apiKey.key}
                                        readOnly
                                    />
                                    <Button variant="outline" size="icon" onClick={() => toggleShowKey(apiKey.service)}>
                                        {showKeys[apiKey.service] ? <EyeOff /> : <Eye />}
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleCopy(apiKey.key)}>
                                        <Copy />
                                    </Button>
                                    <Button variant="destructive" size="icon">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        ))}
                         <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2">Agregar Nueva Clave</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input placeholder="Nombre del Servicio (ej. Stripe)" />
                                <Input placeholder="Clave de API" />
                            </div>
                            <Button className="mt-4">
                                <Save className="mr-2 h-4 w-4"/>
                                Guardar Nueva Clave
                            </Button>
                         </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="webhooks">
                 <Card>
                    <CardHeader>
                        <CardTitle>Webhooks Salientes</CardTitle>
                        <CardDescription>
                            Configure webhooks para notificar a servicios externos sobre eventos en la aplicación.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground p-10">
                        <p>La gestión de Webhooks está en desarrollo.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
