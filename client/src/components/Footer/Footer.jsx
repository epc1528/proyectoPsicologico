import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Footer({ onOpenCitaModal }) {
    const handleCentroAyuda = () => {
        Swal.fire({
            title: '<strong>Centro de Ayuda & Soporte</strong>',
            icon: 'info',
            html: `
                <div style="text-align: left; font-size: 0.95rem; color: #475569; line-height: 1.6;">
                    <p style="margin-bottom: 12px;"><strong>¿Tienes dudas con tus bitácoras o citas?</strong></p>
                    <ul style="list-style: disc; margin-left: 20px; margin-bottom: 16px;">
                        <li><strong>Acceso a Bitácoras:</strong> Puedes ver tus bitácoras en la sección "Mis Bitácoras" al iniciar sesión.</li>
                        <li><strong>Citas Médicas:</strong> Puedes agendar citas virtuales o presenciales con nuestros especialistas desde la plataforma.</li>
                        <li><strong>Soporte Técnico:</strong> Escríbenos directamente a <a href="mailto:soporte@psicocartillas.com" style="color: #e11d48; font-weight: bold;">soporte@psicocartillas.com</a></li>
                    </ul>
                    <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 12px; border-radius: 12px; color: #9d174d;">
                        💬 Atención prioritaria vía WhatsApp: +57 300 000 0000
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonColor: '#25D366',
            cancelButtonColor: '#64748b',
            confirmButtonText: '💬 WhatsApp Directo',
            cancelButtonText: 'Cerrar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('https://wa.me/573000000000?text=Hola,%20necesito%20ayuda%20con%20la%20plataforma%20PsicoBitacoras', '_blank');
            }
        });
    };

    const handleContacto = () => {
        Swal.fire({
            title: '<strong>Contacto Directo</strong>',
            icon: 'question',
            html: `
                <div style="text-align: left; font-size: 0.95rem; color: #475569; line-height: 1.6;">
                    <p style="margin-bottom: 10px;">📍 <strong>Consultorio Médico:</strong> Sede Principal</p>
                    <p style="margin-bottom: 10px;">📧 <strong>Correo Electrónico:</strong> contacto@psicocartillas.com</p>
                    <p style="margin-bottom: 10px;">📞 <strong>Teléfono de Atención:</strong> +57 300 000 0000</p>
                    <p style="margin-bottom: 10px;">⏰ <strong>Horarios:</strong> Lunes a Viernes (8:00 AM - 6:00 PM)</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#64748b',
            confirmButtonText: '💬 Contactar por WhatsApp',
            cancelButtonText: 'Entendido'
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('https://wa.me/573000000000?text=Hola,%20quisiera%20recibir%20más%20información%20sobre%20sus%20servicios', '_blank');
            }
        });
    };

    return (
        <footer className="bg-pink-950 dark:bg-slate-950 text-slate-300 py-16 mt-auto border-t border-rose-900/50 dark:border-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-rose-900 dark:border-slate-800 pb-12">
                    <div className="md:col-span-1 lg:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-white text-base font-extrabold shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">P</span>
                            <span className="text-2xl font-bold text-white tracking-tight group-hover:text-pink-300 transition-colors">PsicoBitácoras</span>
                        </Link>
                        <p className="text-rose-200/70 dark:text-slate-500 font-light max-w-sm leading-relaxed text-sm">
                            Transformando el acceso a la salud mental mediante herramientas digitales interactivas, seguras y profesionales.
                        </p>
                        <div className="mt-6 flex space-x-3">
                            {[
                                { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
                                { name: 'Instagram', icon: '📸', url: 'https://instagram.com' },
                                { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/573000000000' },
                                { name: 'YouTube', icon: '▶️', url: 'https://youtube.com' }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    className="w-10 h-10 rounded-full bg-pink-900/80 dark:bg-slate-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs text-rose-300 dark:text-slate-400">Plataforma</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li>
                                <Link to="/cartillas" className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>📚</span>
                                    <span>Catálogo de Bitácoras</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/mis-cartillas" className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>✨</span>
                                    <span>Mis Bitácoras</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" state={{ login: true }} className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>🔑</span>
                                    <span>Inicia Sesión</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" state={{ register: true }} className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>📝</span>
                                    <span>Regístrate</span>
                                </Link>
                            </li>
                            {onOpenCitaModal && (
                                <li>
                                    <button
                                        onClick={onOpenCitaModal}
                                        className="text-pink-400 font-bold hover:text-pink-300 transition-colors flex items-center gap-1.5 text-left"
                                    >
                                        <span>📅</span>
                                        <span>Solicitar Cita Médica</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs text-rose-300 dark:text-slate-400">Legal & Soporte</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li>
                                <Link to="/terminos-condiciones" className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>📄</span>
                                    <span>Términos y Condiciones</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/politica-privacidad" className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5">
                                    <span>🔒</span>
                                    <span>Política de Privacidad</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleCentroAyuda}
                                    className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5 text-left"
                                >
                                    <span>❓</span>
                                    <span>Centro de Ayuda</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleContacto}
                                    className="text-rose-200/70 dark:text-slate-400 hover:text-pink-300 transition-colors flex items-center gap-1.5 text-left"
                                >
                                    <span>📞</span>
                                    <span>Contacto Directo</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-rose-300/60 dark:text-slate-500 text-xs gap-4">
                    <p>&copy; {new Date().getFullYear()} PsicoBitácoras. Todos los derechos reservados. Diseñado para tu bienestar mental.</p>
                    <p className="flex items-center gap-1.5">
                        <span>Hecho con</span>
                        <span className="text-rose-500 animate-pulse">❤️</span>
                        <span>por profesionales de la salud mental.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
