'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageHeader } from '@/components/dashboard/page-header';
import { Form606Schema, CompanySchema } from '@/lib/schemas';
import { PlusCircle, Trash2, Save, FileDown, Upload, Loader2, CheckCircle2, XCircle, Copy, Camera } from 'lucide-react';
import { useAppContext } from '@/context/app-provider';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { TIPO_BIENES_SERVICIOS, FORMAS_PAGO } from '@/lib/constants';
import { extractInvoiceData } from '@/ai/flows/extract-invoice-flow';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


type FormValues = z.infer<typeof Form606Schema>;
type CompanyFormValues = z.infer<typeof CompanySchema>;

const defaultRow = {
  rncCedula: '',
  tipoId: '1' as const,
  tipoBienesServicios: '09' as const,
  ncf: '',
  ncfModificado: '',
  fechaComprobante: '',
  fechaPago: '',
  montoFacturado: 0,
  itbisFacturado: 0,
  itbisRetenido: 0,
  itbisSujetoProporcionalidad: 0,
  itbisLlevadoCosto: 0,
  itbisPorAdelantar: 0,
  itbisPercibidoCompras: 0,
  retencionRenta: 0,
  isc: 0,
  impuestoSelectivoConsumo: 0,
  otrosImpuestos: 0,
  montoPropinaLegal: 0,
  formaPago: 'credito' as const,
  isRncValid: undefined,
  isNcfValid: undefined,
};

export default function NewCompraPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addReport, getReport, updateReport, showToast, settings, companies, addCompany } = useAppContext();
  const reportId = searchParams.get('id');
  const [isScanning, setIsScanning] = useState(false);
  const [validatingRnc, setValidatingRnc] = useState<Record<number, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false);
  
  const [isCameraDialogOpen, setIsCameraDialogOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const allCompanies = useMemo(() => [
    { ...settings, id: 'main', name: `${settings.name} (Principal)` }, 
    ...companies
  ], [settings, companies]);

  const form = useForm<FormValues>({
    resolver: zodResolver(Form606Schema),
    defaultValues: {
      rnc: settings.rnc || '',
      periodo: '',
      compras: [defaultRow],
    },
  });
  
  const addCompanyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: { name: '', rnc: '' },
  });

  useEffect(() => {
    if (reportId) {
      const report = getReport(reportId);
      if (report && report.type === '606') {
        form.reset(report);
      }
    }
  }, [reportId, getReport, form]);

  useEffect(() => {
    if (!isCameraDialogOpen) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    let stream: MediaStream;
    const getCameraPermission = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        showToast({
          variant: 'destructive',
          title: 'Acceso a Cámara Denegado',
          description: 'Por favor, habilita los permisos de la cámara en tu navegador.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [isCameraDialogOpen, showToast]);


  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'compras',
  });

  const onSubmit = (data: FormValues) => {
    if (reportId) {
      updateReport(reportId, { ...data, estado: 'Completado' });
      showToast({ title: 'Reporte Actualizado', description: 'El reporte 606 ha sido actualizado exitosamente.' });
    } else {
      addReport({ ...data, estado: 'Completado', type: '606' });
      showToast({ title: 'Reporte Generado', description: 'El reporte 606 ha sido generado exitosamente.' });
    }
    router.push('/dashboard/compras');
  };

  const onSaveDraft = () => {
    const data = form.getValues();
     if (reportId) {
      updateReport(reportId, { ...data, estado: 'Borrador' });
    } else {
      addReport({ ...data, estado: 'Borrador', type: '606' });
    }
    showToast({ title: 'Borrador Guardado', description: 'Su progreso ha sido guardado como un borrador.' });
    router.push('/dashboard/compras');
  };

  const processInvoiceData = useCallback((extractedData: any) => {
      const firstEmptyIndex = form.getValues('compras').findIndex(c => !c.rncCedula && !c.ncf && c.montoFacturado === 0);

      const newRow = {
        ...defaultRow,
        rncCedula: extractedData.rncCedula || '',
        ncf: extractedData.ncf || '',
        fechaComprobante: extractedData.fechaComprobante || '',
        fechaPago: extractedData.fechaComprobante || '', // Default payment date
        montoFacturado: extractedData.montoFacturado || 0,
        itbisFacturado: extractedData.itbisFacturado || 0,
        isRncValid: extractedData.isRncValid,
        isNcfValid: extractedData.isNcfValid,
      };

      if (firstEmptyIndex !== -1) {
        form.setValue(`compras.${firstEmptyIndex}`, newRow, { shouldValidate: true });
      } else {
        append(newRow, { shouldFocus: false });
      }

      showToast({
        title: '¡Datos Extraídos y Validados!',
        description: extractedData.validationMessage || 'La información de la factura se ha agregado al formulario.',
      });
  }, [form, append, showToast]);

  const handleCaptureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if(context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const photoDataUri = canvas.toDataURL('image/jpeg');
        
        setIsCameraDialogOpen(false);
        showToast({
          title: 'Procesando Factura...',
          description: 'El escáner inteligente está extrayendo y validando los datos.',
        });

        try {
            const extractedData = await extractInvoiceData({ photoDataUri });
            processInvoiceData(extractedData);
        } catch (error) {
            console.error('Error processing captured invoice:', error);
            showToast({
                variant: 'destructive',
                title: 'Error en el Escaneo',
                description: 'No se pudieron extraer los datos de la imagen capturada.',
            });
        } finally {
            setIsCapturing(false);
        }
    } else {
         showToast({
            variant: 'destructive',
            title: 'Error de Captura',
            description: 'No se pudo obtener el contexto del canvas.',
        });
        setIsCapturing(false);
    }
  }


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    showToast({
      title: 'Procesando Factura...',
      description: 'El escáner inteligente está extrayendo y validando los datos.',
    });

    try {
      const fileReader = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      const photoDataUri = await fileReader;
      const extractedData = await extractInvoiceData({ photoDataUri });
      processInvoiceData(extractedData);

    } catch (error) {
      console.error('Error scanning invoice:', error);
      showToast({
        variant: 'destructive',
        title: 'Error en el Escaneo',
        description: 'No se pudieron extraer los datos. Intente de nuevo o ingréselos manualmente.',
      });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setIsScanning(false);
    }
  };

  const handleRncBlur = useCallback(async (index: number, rnc: string) => {
    if (!rnc) {
      form.setValue(`compras.${index}.isRncValid`, undefined);
      return;
    }
    setValidatingRnc(prev => ({ ...prev, [index]: true }));
    
    if (rnc.length === 9) {
      form.setValue(`compras.${index}.tipoId`, '1', { shouldValidate: true });
    } else if (rnc.length === 11) {
      form.setValue(`compras.${index}.tipoId`, '2', { shouldValidate: true });
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const rncValid = (rnc.length === 9 || rnc.length === 11) && /^\d+$/.test(rnc);
    form.setValue(`compras.${index}.isRncValid`, rncValid, { shouldValidate: true });
    
    setValidatingRnc(prev => ({ ...prev, [index]: false }));
  }, [form]);
  
  const handleAddNewCompany = async (data: CompanyFormValues) => {
    const newCompany = await addCompany(data);
    if (newCompany) {
      form.setValue('rnc', newCompany.rnc, { shouldValidate: true });
      setIsAddCompanyDialogOpen(false);
      addCompanyForm.reset();
    }
  };
  
  return (
    <>
      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <PageHeader
              title={reportId ? "Editar Reporte 606" : "Nuevo Reporte 606"}
              description="Complete la información para generar el reporte de compras."
            >
              <Button type="button" variant="outline" onClick={onSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Borrador
              </Button>
              <Button type="submit">
                <FileDown className="mr-2 h-4 w-4" />
                {reportId ? "Actualizar Reporte" : "Generar Reporte"}
              </Button>
            </PageHeader>

            <Card>
              <CardHeader>
                <CardTitle>Información del Contribuyente</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="rnc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contribuyente</FormLabel>
                       <Select 
                        onValueChange={(value) => {
                           if (value === 'add-new') {
                             setIsAddCompanyDialogOpen(true);
                           } else {
                             field.onChange(value);
                           }
                        }} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una empresa o perfil..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allCompanies.map((company) => (
                            <SelectItem key={company.id} value={company.rnc}>
                              {company.name} ({company.rnc})
                            </SelectItem>
                          ))}
                          <Separator className="my-1" />
                           <SelectItem value="add-new">
                              <span className="flex items-center gap-2 text-primary">
                                <PlusCircle className="h-4 w-4" />
                                Agregar nueva empresa
                              </span>
                           </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="periodo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Período Fiscal (AAAAMM)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 202305" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle>Detalle de Compras</CardTitle>
                    <CardDescription>Agregue sus compras manualmente o use el escaneo inteligente.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,application/pdf"
                    />
                     <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCameraDialogOpen(true)}
                        disabled={isScanning || isCapturing}
                    >
                        <Camera className="mr-2 h-4 w-4" />
                        Escanear Factura
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isScanning || isCapturing}
                    >
                        {isScanning ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="mr-2 h-4 w-4" />
                        )}
                        Subir PDF
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            showToast({
                                title: 'Función en Desarrollo',
                                description: 'La carga en lote estará disponible próximamente.',
                            });
                        }}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Escanear en Lote
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RNC/Cédula Prov.</TableHead>
                        <TableHead>Tipo ID</TableHead>
                        <TableHead>Tipo Bien/Servicio</TableHead>
                        <TableHead>NCF</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead>ITBIS</TableHead>
                        <TableHead>Forma de Pago</TableHead>
                        <TableHead>Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="min-w-[170px]">
                             <FormField control={form.control} name={`compras.${index}.rncCedula`} render={({ field }) => (
                                <div className="relative">
                                    <Input {...field} placeholder="RNC del Proveedor" className="pr-8" onBlur={(e) => handleRncBlur(index, e.target.value)} />
                                     {validatingRnc[index] && (
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-wait">
                                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                        </span>
                                    )}
                                    {item.isRncValid === true && !validatingRnc[index] && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-help">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Formato de RNC/Cédula válido</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    {item.isRncValid === false && !validatingRnc[index] &&(
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-help">
                                                    <XCircle className="h-5 w-5 text-destructive" />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Formato de RNC/Cédula inválido</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            )} />
                          </TableCell>
                          <TableCell className="min-w-[120px]">
                            <FormField control={form.control} name={`compras.${index}.tipoId`} render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger></FormControl>
                                  <SelectContent><SelectItem value="1">RNC</SelectItem><SelectItem value="2">Cédula</SelectItem></SelectContent>
                                </Select>
                              )} />
                          </TableCell>
                          <TableCell className="min-w-[200px]">
                            <FormField control={form.control} name={`compras.${index}.tipoBienesServicios`} render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue placeholder="Seleccione..." /></SelectTrigger></FormControl>
                                  <SelectContent>{TIPO_BIENES_SERVICIOS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                                </Select>
                              )} />
                          </TableCell>
                          <TableCell className="min-w-[170px]">
                             <FormField control={form.control} name={`compras.${index}.ncf`} render={({ field }) => (
                                <div className="relative">
                                    <Input {...field} placeholder="B01000..." className="pr-8" />
                                    {item.isNcfValid === true && (
                                         <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-help">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>NCF válido (simulado)</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    {item.isNcfValid === false && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-help">
                                                    <XCircle className="h-5 w-5 text-destructive" />
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Formato de NCF inválido (simulado)</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            )} />
                          </TableCell>
                          <TableCell className="min-w-[150px]">
                            <FormField control={form.control} name={`compras.${index}.fechaComprobante`} render={({ field }) => <Input type="date" {...field} />} />
                          </TableCell>
                          <TableCell className="min-w-[120px]">
                            <FormField control={form.control} name={`compras.${index}.montoFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                          </TableCell>
                          <TableCell className="min-w-[120px]">
                            <FormField control={form.control} name={`compras.${index}.itbisFacturado`} render={({ field }) => <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber || 0)} />} />
                          </TableCell>
                          <TableCell className="min-w-[150px]">
                            <FormField control={form.control} name={`compras.${index}.formaPago`} render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger><SelectValue placeholder="Forma de pago" /></SelectTrigger></FormControl>
                                  <SelectContent>{FORMAS_PAGO.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                                </Select>
                              )} />
                          </TableCell>
                          <TableCell>
                            <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append(defaultRow)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Fila
                </Button>
                {form.formState.errors.compras?.root && (
                    <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.compras.root.message}</p>
                )}
                {form.formState.errors.compras && !form.formState.errors.compras.root && (
                    <p className="text-sm font-medium text-destructive mt-2">Hay errores en algunas filas. Por favor, revise los campos marcados en rojo.</p>
                )}
              </CardContent>
            </Card>
          </form>
        </Form>
      </TooltipProvider>

       <Dialog open={isCameraDialogOpen} onOpenChange={setIsCameraDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Escanear Factura con Cámara</DialogTitle>
            <DialogDescription>
              Apunta la cámara a tu factura y presiona capturar. Asegúrate de que el documento esté bien iluminado y sea legible.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
             {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Acceso a Cámara Denegado</AlertTitle>
                  <AlertDescription>
                    Por favor, habilita los permisos de la cámara en tu navegador para usar esta función.
                  </AlertDescription>
                </Alert>
            )}
             {hasCameraPermission === null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCameraDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCaptureAndProcess} disabled={!hasCameraPermission || isCapturing}>
              {isCapturing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
              {isCapturing ? 'Procesando...' : 'Capturar y Procesar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isAddCompanyDialogOpen} onOpenChange={setIsAddCompanyDialogOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Empresa</DialogTitle>
              <DialogDescription>
                  Añada un nuevo perfil de empresa para usar en los reportes.
              </DialogDescription>
            </DialogHeader>
            <Form {...addCompanyForm}>
              <form onSubmit={addCompanyForm.handleSubmit(handleAddNewCompany)} className="space-y-4">
                <FormField
                    control={addCompanyForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre / Razón Social</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre de la nueva empresa" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={addCompanyForm.control}
                    name="rnc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RNC / Cédula</FormLabel>
                            <FormControl>
                                <Input placeholder="RNC o Cédula" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsAddCompanyDialogOpen(false)}>Cancelar</Button>
                    <Button type="submit">Agregar Empresa</Button>
                </DialogFooter>
              </form>
            </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
