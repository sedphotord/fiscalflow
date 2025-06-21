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

function format606(report: Report606): string {
    const header = `606|${report.rnc}|${report.periodo}|${report.compras.length}\r\n`;
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
            c.formaPago === 'efectivo' ? '01' :
            c.formaPago === 'cheque' ? '02' :
            c.formaPago === 'tarjeta' ? '03' :
            c.formaPago === 'credito' ? '04' : '05'
        ];
        return fields.join('|');
    }).join('\r\n');
    return header + details;
}

function format607(report: Report607): string {
    const header = `607|${report.rnc}|${report.periodo}|${report.ventas.length}\r\n`;
    const details = report.ventas.map(v => {
        // NOTE: The DGII 607 format is complex with many fields for payment types.
        // This is a simplified version based on the available data in the form.
        const fields = [
            v.rncCedula,
            v.tipoId,
            v.ncf,
            v.ncfModificado || '',
            v.fechaComprobante.replace(/-/g, ''),
            '0.00', // Monto efectivo
            '0.00', // Cheque / Transferencia
            '0.00', // Tarjeta
            v.montoFacturado.toFixed(2), // A crédito
            '0.00', // Bonos
            '0.00', // Permuta
            '0.00', // Otras formas
            v.itbisFacturado.toFixed(2),
            '0.00', // ITBIS percibido
            '0.00', // Retencion Renta por terceros
            '0.00', // ITBIS retenido por terceros
            '0.00', // ISC
            '0.00', // Otros impuestos
            '0.00', // Propina legal
        ];
        return fields.join('|');
    }).join('\r\n');
    return header + details;
}

function format608(report: Report608): string {
    const header = `608|${report.rnc}|${report.periodo}|${report.anulados.length}\r\n`;
    const details = report.anulados.map(a => {
        const fields = [
            a.ncfAnulado,
            a.fechaAnulacion.replace(/-/g, ''),
            a.motivoAnulacion,
        ];
        return fields.join('|');
    }).join('\r\n');
    return header + details;
}

function format609(report: Report609): string {
    const header = `609|${report.rnc}|${report.periodo}|${report.pagos.length}\r\n`;
    const details = report.pagos.map(p => {
        const fields = [
            p.razonSocialBeneficiario,
            p.tipoRenta,
            p.fechaPago.replace(/-/g, ''),
            p.montoPagado.toFixed(2),
            p.isrRetenido.toFixed(2),
        ];
        return fields.join('|');
    }).join('\r\n');
    return header + details;
}


export function formatReportToTxt(report: Report) {
    if (report.estado !== 'Completado') {
        throw new Error('Solo se pueden exportar reportes en estado "Completado".');
    }
    
    let content = '';
    const filename = `DGII_F_${report.type}_${report.rnc}_${report.periodo}.txt`;

    if (report.type === '606') {
        content = format606(report as Report606);
    } else if (report.type === '607') {
        // Updated formatting for 607 to be more compliant
        const header = `607|${report.rnc}|${report.periodo}|${report.ventas.length}\r\n`;
        const details = report.ventas.map(v => {
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
    } else if (report.type === '608') {
        content = format608(report as Report608);
    } else if (report.type === '609') {
        content = format609(report as Report609);
    }
     else {
        throw new Error('Tipo de reporte no soportado para exportación.');
    }

    downloadTxtFile(filename, content);
}
