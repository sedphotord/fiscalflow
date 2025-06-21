import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Report, Report606, Report607 } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function downloadTxtFile(filename: string, text: string) {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
}

function format606(report: Report606): string {
    const header = `606|${report.rnc}|${report.periodo}|${report.compras.length}\n`;
    const details = report.compras.map(c => {
        const fields = [
            c.rncCedula,
            c.tipoId,
            c.tipoBienesServicios,
            c.ncf,
            c.ncfModificado || '',
            c.fechaComprobante.replace(/-/g, ''),
            c.fechaPago.replace(/-/g, ''),
            c.montoFacturado.toFixed(2),
            c.itbisFacturado.toFixed(2),
            (c.itbisRetenido || 0).toFixed(2),
            (c.itbisSujetoProporcionalidad || 0).toFixed(2),
            (c.itbisLlevadoCosto || 0).toFixed(2),
            (c.itbisPorAdelantar || 0).toFixed(2),
            (c.itbisPercibidoCompras || 0).toFixed(2),
            (c.retencionRenta || 0).toFixed(2),
            (c.isc || 0).toFixed(2),
            (c.otrosImpuestos || 0).toFixed(2),
            (c.montoPropinaLegal || 0).toFixed(2),
            // Forma de Pago
            c.formaPago === 'efectivo' ? '01' :
            c.formaPago === 'cheque' ? '02' :
            c.formaPago === 'tarjeta' ? '03' :
            c.formaPago === 'credito' ? '04' : '05'
        ];
        return fields.join('|');
    }).join('\n');
    return header + details;
}

function format607(report: Report607): string {
    const header = `607|${report.rnc}|${report.periodo}|${report.ventas.length}\n`;
    const details = report.ventas.map(v => {
        const fields = [
            v.rncCedula,
            v.tipoId,
            v.ncf,
            v.ncfModificado || '',
            v.fechaComprobante.replace(/-/g, ''),
            v.montoFacturado.toFixed(2),
            v.itbisFacturado.toFixed(2)
            // Simplified for prototype. Add other fields here as needed.
        ];
        return fields.join('|');
    }).join('\n');
    return header + details;
}

export function formatReportToTxt(report: Report) {
    if (report.estado !== 'Completado') {
        throw new Error('Solo se pueden exportar reportes completados.');
    }
    
    let content = '';
    const filename = `DGII_F_${report.type}_${report.rnc}_${report.periodo}.txt`;

    if (report.type === '606') {
        content = format606(report);
    } else if (report.type === '607') {
        content = format607(report);
    } else {
        throw new Error('Tipo de reporte no soportado para exportación.');
    }

    downloadTxtFile(filename, content);
}
