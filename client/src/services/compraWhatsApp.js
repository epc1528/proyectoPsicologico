import Swal from 'sweetalert2';
import { CONTACT_CONFIG, getWhatsAppLink } from '../config/constants';

/**
 * Abre un modal profesional con instrucciones para pagar con Nequi
 * y enviar el comprobante directamente al WhatsApp de la especialista.
 */
export const abrirModalCompraNequi = (cartilla) => {
    const titulo = cartilla?.titulo || 'Bitácora Oficial';
    const precio = cartilla?.precio ? (cartilla.precio === 150000 ? 15000 : cartilla.precio) : CONTACT_CONFIG.precioCartilla;
    const precioFormateado = `$${precio.toLocaleString('es-CO')} COP`;

    const mensajeWhatsApp = `¡Hola! Me interesa adquirir la versión completa de la *${titulo}* (${precioFormateado}). Ya tengo lista la transferencia por Nequi para el envío de la bitácora en PDF.`;

    Swal.fire({
        title: `<strong style="font-family: 'Playfair Display', serif; color: #1e1b4b; font-size: 1.5rem;">Adquirir ${titulo}</strong>`,
        html: `
            <div style="text-align: left; font-size: 0.95rem; color: #334155; line-height: 1.5;">
                <p style="margin-bottom: 12px; color: #64748b;">
                    Obtén acceso a la <strong>versión completa</strong> con todos los días de ejercicios terapéuticos, actividades clínicas guiadas y el <strong>PDF de alta calidad</strong> listo para descargar o imprimir.
                </p>

                <!-- Tarjeta Nequi Estilizada -->
                <div style="background: linear-gradient(135deg, #1e022b 0%, #3b0764 100%); color: white; padding: 18px; border-radius: 18px; margin-bottom: 16px; box-shadow: 0 10px 25px -5px rgba(59, 7, 100, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="background: #f43f5e; color: white; font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.05em;">
                            📱 PAGO DIRECTO NEQUI
                        </span>
                        <span style="font-size: 1.1rem; font-weight: 800; color: #34d399;">
                            ${precioFormateado}
                        </span>
                    </div>
                    <div style="font-size: 0.8rem; text-transform: uppercase; color: #cbd5e1; letter-spacing: 0.05em; margin-bottom: 2px;">
                        Número de Celular Nequi:
                    </div>
                    <div style="font-size: 1.4rem; font-weight: 900; letter-spacing: 0.05em; color: #ffffff; font-family: monospace;">
                        ${CONTACT_CONFIG.nequiPhone}
                    </div>
                </div>

                <!-- Pasos de Compra -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; margin-bottom: 14px;">
                    <div style="font-weight: 700; color: #0f172a; margin-bottom: 8px; font-size: 0.9rem;">
                        ¿Cómo recibir tu bitácora completa?
                    </div>
                    <ol style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: #475569; display: flex; flex-direction: column; gap: 6px;">
                        <li>Envía la transferencia de <strong>${precioFormateado}</strong> al Nequi <strong>${CONTACT_CONFIG.nequiPhone}</strong>.</li>
                        <li>Haz clic en el botón verde para abrir el chat oficial de <strong>WhatsApp</strong>.</li>
                        <li>Envía el comprobante de pago y te entregaremos el <strong>PDF completo de inmediato</strong>.</li>
                    </ol>
                </div>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#94a3b8',
        confirmButtonText: '💬 Adquirir por WhatsApp',
        cancelButtonText: 'Cerrar',
        reverseButtons: true,
        focusConfirm: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(getWhatsAppLink(mensajeWhatsApp), '_blank');
        }
    });
};
