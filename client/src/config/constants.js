/**
 * Configuración centralizada de contacto comercial, WhatsApp y Nequi
 */
export const CONTACT_CONFIG = {
    whatsappNumber: '573044701482',
    whatsappDisplay: '+57 304 470 1482',
    nequiPhone: '304 470 1482',
    nequiRaw: '3044701482',
    precioCartilla: 15000,
    precioCartillaFormateado: '$15.000 COP',
    soporteEmail: 'soporte@psicocartillas.com'
};

/**
 * Genera el enlace directo a WhatsApp con mensaje codificado
 */
export const getWhatsAppLink = (mensaje) => {
    return `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
};
