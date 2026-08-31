import React from 'react';
import { Link } from 'react-router-dom';

export default function TerminosCondiciones() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">
                            Términos Legales de Uso
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Términos y Condiciones
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Última actualización: Agosto 2026</p>
                    </div>

                    <div className="space-y-8 text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                1. Aceptación de los Términos
                            </h2>
                            <p>
                                Al acceder y utilizar la plataforma <strong>PsicoCartillas</strong>, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de los términos, te sugerimos abstenerte de utilizar la plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                2. Alcance del Servicio
                            </h2>
                            <p>
                                PsicoCartillas ofrece herramientas digitales complementarias (bitácoras emocionales interactivas) diseñadas por la <strong>Dra. Johana Barrios</strong> y la <strong>Dra. Milagros Bolaño</strong> para apoyar el autoconocimiento, la inteligencia emocional y la gestión del bienestar.
                            </p>
                            <p className="mt-2 text-rose-600 dark:text-pink-400 font-medium">
                                ⚠️ Importante: El uso de las bitácoras no reemplaza la atención psiquiátrica o médica de emergencia. En caso de una crisis severa o emergencia de salud mental, acude inmediatamente al servicio de emergencias médica más cercano.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                3. Agendamiento de Citas Médicas
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Las solicitudes de citas en modalidades Virtual y Presencial están sujetas a la disponibilidad de la agenda médica.</li>
                                <li>El equipo administrativo/médico revisará las solicitudes y enviará confirmaciones oficiales por correo electrónico o WhatsApp.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                4. Propiedad Intelectual
                            </h2>
                            <p>
                                Todos los textos, diseños, nombres de bitácoras, metodologías de ejercicios y contenidos visuales pertenecen a los profesionales de la salud autores de la plataforma y están protegidos por leyes de derechos de autor.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                        <Link to="/" className="inline-block bg-pink-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-pink-700 transition-colors shadow-md">
                            ← Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
