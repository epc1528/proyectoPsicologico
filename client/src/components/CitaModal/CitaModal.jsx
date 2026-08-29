import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../app/providers/AuthProvider';
import { solicitarCita } from '../../features/citas/api/citas.api';
import Swal from 'sweetalert2';

const ESPECIALIDADES = [
    {
        id: 'Psiquiatría',
        nombre: 'Psiquiatría',
        doctora: 'Dra. Milagros Bolaño Romero',
        icon: '🩺',
        color: 'from-pink-500 to-rose-600',
        badge: 'Medicina Especializada'
    },
    {
        id: 'Dra. Johana Barrios (Salud Integral & Mindfulness)',
        nombre: 'Dra. Johana Barrios',
        doctora: 'Médica • Mindfulness • Psicología Positiva',
        icon: '🌿',
        color: 'from-rose-500 to-pink-600',
        badge: 'Salud Integral & Emocional'
    },
    {
        id: 'Neuropsicología',
        nombre: 'Neuropsicología',
        doctora: 'Evaluación y Rehabilitación Cognitiva',
        icon: '🧠',
        color: 'from-purple-500 to-pink-600',
        badge: 'Neurociencias'
    },
    {
        id: 'Nutrición',
        nombre: 'Nutrición',
        doctora: 'Salud & Alimentación Consciente',
        icon: '🥗',
        color: 'from-emerald-500 to-teal-600',
        badge: 'Nutrición Clínica'
    }
];

export default function CitaModal({ isOpen, onClose, especialidadInicial = 'Psiquiatría' }) {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        nombre_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
        especialidad: especialidadInicial,
        modalidad: 'Virtual',
        fecha_cita: '',
        hora_cita: '🌅 Mañana (8:00 AM - 12:00 PM)',
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
            const espObj = ESPECIALIDADES.find(e => e.id === formData.especialidad) || { nombre: formData.especialidad };
            const motivoConModalidad = `[${formData.modalidad}] ${formData.motivo || ''}`.trim();

            await solicitarCita({
                ...formData,
                motivo: motivoConModalidad
            });

            const numTelDoctor = '573000000000'; // Número de la consulta
            const mensajeWa = encodeURIComponent(`Hola, acabo de solicitar una cita médica en la especialidad de *${espObj.nombre}* para el día *${formData.fecha_cita}* (${formData.modalidad}). Mi nombre es ${formData.nombre_cliente}.`);

            Swal.fire({
                title: '¡Solicitud Registrada con Éxito!',
                html: `
                    <div style="text-align: left; font-size: 0.95rem; color: #475569; line-height: 1.6;">
                        <p style="margin-bottom: 8px;"><strong>Especialidad:</strong> ${espObj.nombre}</p>
                        <p style="margin-bottom: 8px;"><strong>Modalidad:</strong> ${formData.modalidad}</p>
                        <p style="margin-bottom: 8px;"><strong>Fecha solicitada:</strong> ${formData.fecha_cita}</p>
                        <p style="margin-bottom: 16px;"><strong>Contacto:</strong> ${formData.telefono_cliente}</p>
                        <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 12px; border-radius: 16px; color: #9d174d; font-size: 0.85rem;">
                            💡 El equipo médico confirmará la disponibilidad del horario. Si deseas agilizar la confirmación, puedes escribirnos por WhatsApp directamente.
                        </div>
                    </div>
                `,
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#25D366',
                cancelButtonColor: '#e11d48',
                confirmButtonText: '💬 Contactar por WhatsApp',
                cancelButtonText: 'Cerrar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open(`https://wa.me/${numTelDoctor}?text=${mensajeWa}`, '_blank');
                }
            });

            onClose();
        } catch (err) {
            console.error(err);
            Swal.fire('Error', err.message || 'No se pudo enviar la solicitud. Intenta nuevamente.', 'error');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-rose-100 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xl font-bold w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-transform hover:scale-110"
                >
                    ✕
                </button>

                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200/50 dark:border-rose-900/50 text-rose-700 dark:text-pink-400 text-xs font-black uppercase tracking-widest mb-3">
                        ✨ Agendamiento de Cita Médica
                    </span>
                    <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Selecciona tu Especialista y Horario
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light mt-1">
                        Acompañamiento profesional y confidencial en salud mental e integral.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tarjetas Interactivas de Selección de Especialidad */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                            1. Selecciona la Especialidad o Doctora
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {ESPECIALIDADES.map((esp) => {
                                const selected = formData.especialidad === esp.id;
                                return (
                                    <div
                                        key={esp.id}
                                        onClick={() => setFormData({ ...formData, especialidad: esp.id })}
                                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center gap-3 relative ${
                                            selected
                                                ? 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 border-rose-400 dark:border-pink-500 shadow-md ring-2 ring-rose-400/40'
                                                : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${esp.color} text-white flex items-center justify-center text-xl shadow-md shrink-0`}>
                                            {esp.icon}
                                        </div>
                                        <div className="overflow-hidden">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{esp.nombre}</h4>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light truncate">{esp.doctora}</p>
                                        </div>
                                        {selected && (
                                            <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Modalidad de Consulta */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                            2. Modalidad de Atención
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'Virtual', label: '💻 Consulta Virtual (Online)', desc: 'Desde la comodidad de tu hogar' },
                                { id: 'Presencial', label: '🏥 Consulta Presencial', desc: 'En nuestro consultorio médico' }
                            ].map((mod) => (
                                <button
                                    type="button"
                                    key={mod.id}
                                    onClick={() => setFormData({ ...formData, modalidad: mod.id })}
                                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                                        formData.modalidad === mod.id
                                            ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                                    }`}
                                >
                                    <div className="font-bold text-xs">{mod.label}</div>
                                    <div className={`text-[10px] ${formData.modalidad === mod.id ? 'text-rose-100' : 'text-slate-400'}`}>{mod.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Datos Personales */}
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

                    {/* Fecha y Franja Horaria */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Fecha Deseada
                            </label>
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={formData.fecha_cita}
                                onChange={(e) => setFormData({ ...formData, fecha_cita: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                                Franja Horaria
                            </label>
                            <select
                                value={formData.hora_cita}
                                onChange={(e) => setFormData({ ...formData, hora_cita: e.target.value })}
                                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm font-medium"
                            >
                                <option value="🌅 Mañana (8:00 AM - 12:00 PM)">🌅 Mañana (8:00 AM - 12:00 PM)</option>
                                <option value="🌇 Tarde (2:00 PM - 6:00 PM)">🌇 Tarde (2:00 PM - 6:00 PM)</option>
                            </select>
                        </div>
                    </div>

                    {/* Motivo */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                            Motivo o Síntomas (Opcional)
                        </label>
                        <textarea
                            rows="2"
                            placeholder="Describe brevemente el motivo de tu solicitud..."
                            value={formData.motivo}
                            onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-400 text-sm"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={enviando}
                        className="w-full py-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-700 hover:to-pink-700 text-white font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-98 disabled:opacity-50 text-base"
                    >
                        {enviando ? 'Procesando tu solicitud...' : 'Confirmar Solicitud de Cita Médica ✨'}
                    </button>
                </form>
            </div>
        </div>
    );
}
