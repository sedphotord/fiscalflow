import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Report, Report606, Report607, Report608, Report609 } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function downloadTxtFile(filename: string, text: string) {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
}

export function formatReportToTxt(report: Report) {
    if (report.estado !== 'Completado') {
        throw new Error('Solo se pueden exportar reportes en estado "Completado".');
    }
    
    let content = '';
    const filename = `DGII_F_${report.type}_${report.rnc}_${report.periodo}.txt`;

    switch (report.type) {
        case '606': {
            const r = report as Report606;
            const header = `606|${r.rnc}|${r.periodo}|${r.compras.length}\r\n`;
            const details = r.compras.map(c => {
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
                    c.formaPago === 'efectivo' ? '01' :
                    c.formaPago === 'cheque' ? '02' :
                    c.formaPago === 'tarjeta' ? '03' :
                    c.formaPago === 'credito' ? '04' : '05'
                ];
                return fields.join('|');
            }).join('\r\n');
            content = header + details;
            break;
        }
        case '607': {
            const r = report as Report607;
            const header = `607|${r.rnc}|${r.periodo}|${r.ventas.length}\r\n`;
            const details = r.ventas.map(v => {
                const fields = [
                    v.rncCedula,
                    v.tipoId,
                    v.ncf,
                    v.ncfModificado || '',
                    v.fechaComprobante.replace(/-/g, ''),
                    v.itbisFacturado.toFixed(2),
                    v.montoFacturado.toFixed(2),
                ];
                return fields.join('|');
            }).join('\r\n');
            content = header + details;
            break;
        }
        case '608': {
            const r = report as Report608;
            const header = `608|${r.rnc}|${r.periodo}|${r.anulados.length}\r\n`;
            const details = r.anulados.map(a => {
                const fields = [
                    a.ncfAnulado,
                    a.fechaAnulacion.replace(/-/g, ''),
                    a.motivoAnulacion,
                ];
                return fields.join('|');
            }).join('\r\n');
            content = header + details;
            break;
        }
        case '609': {
            const r = report as Report609;
            const header = `609|${r.rnc}|${r.periodo}|${r.pagos.length}\r\n`;
            const details = r.pagos.map(p => {
                const fields = [
                    p.razonSocialBeneficiario,
                    p.tipoRenta,
                    p.fechaPago.replace(/-/g, ''),
                    p.montoPagado.toFixed(2),
                    p.isrRetenido.toFixed(2),
                ];
                return fields.join('|');
            }).join('\r\n');
            content = header + details;
            break;
        }
        default:
            throw new Error('Tipo de reporte no soportado para exportación.');
    }

    downloadTxtFile(filename, content);
}
