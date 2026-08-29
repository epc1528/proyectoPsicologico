import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../app/providers/AuthProvider';
import { solicitarCita } from '../../features/citas/api/citas.api';
import Swal from 'sweetalert2';

export default function CitaModal({ isOpen, onClose, especialidadInicial = 'Psiquiatría' }) {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        nombre_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
        especialidad: especialidadInicial,
        fecha_cita: '',
        hora_cita: '09:00 AM - 12:00 PM (Mañana)',
        motivo: ''
    });

    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                nombre_cliente: user.nombre || prev.nombre_cliente,
                correo_cliente: user.correo || prev.correo_cliente,
                telefono_cliente: user.telefono || prev.telefono_cliente
            }));
        }
        if (especialidadInicial) {
            setFormData(prev => ({ ...prev, especialidad: especialidadInicial }));
        }
    }, [user, especialidadInicial, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        try {
            await solicitarCita(formData);
            Swal.fire({
                title: '¡Cita Solicitada con Éxito!',
                html: `
                    <div style="font-size: 1rem; color: #475569; margin-bottom: 1rem;">
                        Hemos registrado tu solicitud para <b>${formData.especialidad}</b> el día <b>${formData.fecha_cita}</b>.
                    </div>
                    <div style="font-size: 0.9rem; color: #64748b; background: #f8fafc; padding: 12px; rounded: 12px; border: 1px solid #e2e8f0;">
                        El equipo médico revisará la disponibilidad y te contactará a tu WhatsApp/teléfono <b>${formData.telefono_cliente}</b> para confirmar la fecha exacta.
                    </div>
                `,
                icon: 'success',
                confirmButtonColor: '#e11d48',
                confirmButtonText: 'Entendido ✨'
            });
            onClose();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', err.message || 'No se pudo enviar la solicitud. Por favor intenta de nuevo.', 'error');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    ✕
                </button>

                <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                        Reserva Tu Espacio
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Solicitud de Cita Médica
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light mt-1">
                        Completa tus datos para coordinar tu atención especializada.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                            Especialidad
                        </label>
                        <select
                            required
                            value={formData.especialidad}
                            onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium outline-none focus:ring-2 focus:ring-rose-400"
                        >
                            <option value="Psiquiatría">🩺 Psiquiatría (Dra. Milagros Bolaño Romero)</option>
                            <option value="Dra. Johana Barrios (Salud Integral & Mindfulness)">🌿 Dra. Johana Barrios (Médico • Mindfulness • Psicología Positiva)</option>
                            <option value="Neuropsicología">🧠 Neuropsicología</option>
                            <option value="Nutrición">🥗 Nutrición & Salud Mental</option>
                        </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ej. Ana María Pérez"
                                value={formData.nombre_cliente}
                                onChange={(e) => setFormData({ ...formData, nombre_cliente: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Teléfono / WhatsApp
                            </label>
                            <input
                                type="tel"
                                required
                                placeholder="Ej. +57 300 123 4567"
                                value={formData.telefono_cliente}
                                onChange={(e) => setFormData({ ...formData, telefono_cliente: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="paciente@correo.com"
                            value={formData.correo_cliente}
                            onChange={(e) => setFormData({ ...formData, correo_cliente: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Fecha Preferida
                            </label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={formData.fecha_cita}
                                onChange={(e) => setFormData({ ...formData, fecha_cita: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Horario Preferido
                            </label>
                            <select
                                value={formData.hora_cita}
                                onChange={(e) => setFormData({ ...formData, hora_cita: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                            >
                                <option value="08:00 AM - 12:00 PM (Mañana)">🌅 Mañana (8:00 AM - 12:00 PM)</option>
                                <option value="02:00 PM - 06:00 PM (Tarde)">🌇 Tarde (2:00 PM - 6:00 PM)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                            Motivo o Nota Adicional (Opcional)
                        </label>
                        <textarea
                            rows="2"
                            placeholder="Cuéntanos brevemente la razón de tu consulta..."
                            value={formData.motivo}
                            onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={enviando}
                        className="w-full py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 mt-2"
                    >
                        {enviando ? 'Enviando solicitud...' : 'Confirmar Solicitud de Cita ✨'}
                    </button>
                </form>
            </div>
        </div>
    );
}
