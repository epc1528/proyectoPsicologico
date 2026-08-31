import React from 'react';
import { Link } from 'react-router-dom';

export default function PoliticaPrivacidad() {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">
                            Protección de Datos & Confidencialidad
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Política de Privacidad
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Última actualización: Agosto 2026</p>
                    </div>

                    <div className="space-y-8 text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                1. Compromiso con tu Confidencialidad
                            </h2>
                            <p>
                                En <strong>PsicoCartillas / PsicoBitácoras</strong>, entendemos la sensibilidad e importancia de la salud emocional y clínica. Nos comprometemos a proteger la privacidad y seguridad de toda la información personal y reflexiones registradas en nuestra plataforma.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                2. Información que Recopilamos
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Datos de Cuenta:</strong> Nombre completo, correo electrónico, número de teléfono y fecha de nacimiento.</li>
                                <li><strong>Respuestas a Bitácoras:</strong> Tus anotaciones, niveles de energía y reflexiones ingresadas en los talleres interactivos son estrictamente confidenciales y accesibles solo para ti y los profesionales de salud autorizados para tu seguimiento.</li>
                                <li><strong>Solicitudes de Citas Médicas:</strong> Datos de contacto, especialidad requerida, fecha y motivo de consulta.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                3. Uso de la Información
                            </h2>
                            <p>Utilizamos tus datos únicamente para:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Gestionar tu acceso a las bitácoras digitales y guardar tu progreso.</li>
                                <li>Coordinar, agendar y confirmar tus citas médicas especializadas (Psiquiatría, Psicología Clínica, Nutrición, Neuropsicología).</li>
                                <li>Enviar notificaciones y enlaces de recuperación de cuenta requeridos por ti.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                4. Seguridad de los Datos
                            </h2>
                            <p>
                                Implementamos medidas técnicas avanzadas, incluyendo cifrado de contraseñas con algoritmos bcrypt, conexiones HTTPS seguras y control estricto de roles de usuario (administrador y paciente) para evitar cualquier acceso no autorizado.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                5. Tus Derechos (Habeas Data)
                            </h2>
                            <p>
                                Tienes derecho a conocer, actualizar, rectificar y solicitar la eliminación de tus datos personales en cualquier momento escribiendo a nuestro canal oficial de soporte o comunicándote con nuestro equipo médico.
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
