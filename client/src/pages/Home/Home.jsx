import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CitaModal from '../../components/CitaModal/CitaModal';

const ESPECIALISTAS_DETALLE = [
    {
        id: 'johana',
        nombre: 'Dra. Johana Barrios Chinchilla',
        cargoBreve: 'Médica • Mindfulness • Psicología Positiva',
        tituloEspecialidad: 'Dra. Johana Barrios Chinchilla (Salud Integral & Mindfulness)',
        badge: '🩺 MÉDICA • MINDFULNESS • PSICOLOGÍA POSITIVA',
        frase: '“Somos una conversación constante entre cerebro, cuerpo, emociones y entorno; comprender esa conexión es también comprender nuestra salud.💛”',
        imagen: '/doctoras/dra_johana_quote.jpg',
        parrafos: [
            'Médica con amplia experiencia clínica en promoción y prevención de la salud. Título Superior Universitario en Mindfulness y Gestión Emocional, formación en Psicología Positiva, Coaching en Salud y Neurociencias.',
            'Integra la medicina con una mirada integral del bienestar físico, mental y emocional.'
        ]
    },
    {
        id: 'milagros',
        nombre: 'Dra. Milagros Bolaño Romero',
        cargoBreve: 'Psicóloga Clínica Especialista',
        tituloEspecialidad: 'Psicología Clínica',
        badge: '🩺 PSICOLOGÍA CLÍNICA • ESPECIALISTA EN SALUD MENTAL',
        frase: '"Tener una autoestima sana y paz mental te permite construir una vida con propósito."',
        imagen: '/doctoras/dra_milagros.jpg',
        parrafos: [
            'Psicóloga Clínica con amplia trayectoria en acompañamiento psicoterapéutico, evaluación psicológica y regulación emocional para niños, adolescentes y adultos.',
            'Especializada en el diseño de bitácoras terapéuticas y herramientas de autoconocimiento, guiando a cada paciente a comprender sus emociones y fortalecer su resiliencia.',
            'Su enfoque integra técnicas basadas en evidencia científica, psicoeducación y terapia cognitivo-conductual para transformar patrones de pensamiento y fomentar el bienestar integral.'
        ]
    },
    {
        id: 'psiquiatria',
        nombre: 'Dra. Rosa Fontalvo Morales',
        cargoBreve: 'Médica Psiquiatra & Docente Universitaria',
        tituloEspecialidad: 'Dra. Rosa Fontalvo Morales (Psiquiatría & Salud Mental)',
        badge: '🩺 MÉDICA PSIQUIATRA • DOCENTE UNIVERSITARIA',
        frase: '"La atención integral de la salud mental promueve un envejecimiento saludable, lleno de dignidad y serenidad."',
        imagen: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
        parrafos: [
            'Médica Psiquiatra y Docente Universitaria, con especial interés en la atención integral de la salud mental de las personas mayores y en la promoción de un envejecimiento saludable.',
            'Su enfoque combina una sólida práctica clínica con la docencia académica, brindando tratamientos médicos éticos, diagnósticos precisos y acompañamiento continuo a pacientes y sus familias.'
        ]
    },
    {
        id: 'neuropsicologia',
        nombre: 'Neuropsicología',
        cargoBreve: 'Evaluación & Rehabilitación Cognitiva',
        tituloEspecialidad: 'Neuropsicología',
        badge: '🧠 NEUROPSICOLOGÍA • EVALUACIÓN Y REHABILITACIÓN COGNITIVA',
        frase: '"Comprender el funcionamiento cerebral es la clave para potenciar nuestras habilidades y superar desafíos cognitivos."',
        imagen: '/doctoras/neuropsicologia.jpg',
        parrafos: [
            'Evaluación neuropsicológica detallada y programas personalizados de rehabilitación cognitiva para optimizar la memoria, la atención, las funciones ejecutivas y el aprendizaje.',
            'Diagnóstico especializado de funciones cerebrales superiores para diseñar estrategias terapéuticas eficaces orientadas a potenciar las capacidades mentales.',
            'Acompañamiento especializado a niños, jóvenes y adultos en procesos de desarrollo neuropsicológico y recuperación funcional con un enfoque humano y científico.'
        ]
    },
    {
        id: 'suicidologia',
        nombre: 'Psicología Clínica & Suicidología',
        cargoBreve: 'Prevención del Suicidio & Gestión de Crisis',
        tituloEspecialidad: 'Psicología Clínica & Suicidología',
        badge: '💛 PREVENCIÓN DEL SUICIDIO • GESTIÓN DE CRISIS & SALUD MENTAL',
        frase: '"Preservar la vida, ofrecer un refugio de escucha sin juicio y brindar esperanza en los momentos de mayor vulnerabilidad."',
        imagen: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        parrafos: [
            'Psicóloga clínica especializada en prevención del suicidio, intervención en crisis emocionales complejas y abordaje de conductas de autolesión.',
            'Proporciona una atención altamente sensible, humana y confidencial, estructurando planes de seguridad, contención afectiva y reconstrucción del sentido de vida.'
        ]
    }
];

export default function Home() {
    const [isCitaModalOpen, setIsCitaModalOpen] = useState(false);
    const [selectedEspecialidad, setSelectedEspecialidad] = useState('Dra. Rosa Fontalvo Morales (Psiquiatría & Salud Mental)');
    const [selectedEspecialistaId, setSelectedEspecialistaId] = useState('johana');

    const especialistaActual = ESPECIALISTAS_DETALLE.find(e => e.id === selectedEspecialistaId) || ESPECIALISTAS_DETALLE[0];

    return (
        <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Hero Section Premium */}
            <header className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-pink-900/20 -z-10"></div>
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-pink-200/30 dark:bg-pink-900/20 opacity-50 blur-3xl -z-10 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] rounded-full bg-pink-200/30 dark:bg-pink-900/20 opacity-50 blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 text-center lg:text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800/50 text-pink-700 dark:text-pink-400 text-sm font-semibold mb-4 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                            <span className="w-2 h-2 rounded-full bg-pink-500 absolute"></span>
                            Plataforma #1 en Salud Mental Digital
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                            Dale un click a tus<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-400">
                                emociones
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Bitácoras emocionales para transformar tus pensamientos, fortalecer tu bienestar y construir una vida con mayor equilibrio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/cartillas" className="bg-pink-600 dark:bg-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-700 dark:hover:bg-pink-600 transition-all shadow-[0_8px_30px_rgb(225,29,72,0.3)] hover:-translate-y-1 text-center">
                                Quiero comenzar mi transformación
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 -z-10"></div>
                            <div className="relative bg-white dark:bg-slate-900 p-2 sm:p-4 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-800/50 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-[1.02]">
                                <img
                                    src="/doctoras/dra_milagros.jpg"
                                    alt="Dra. Milagros Bolaño Romero - Salud Mental y Bienestar"
                                    className="rounded-[2rem] w-full object-cover h-[400px] sm:h-[500px] shadow-inner cursor-pointer"
                                    onClick={() => {
                                        Swal.fire({
                                            html: `
                                                <div style="font-family: 'Playfair Display', serif; color: #881337; font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;">
                                                    ¡Tú puedes!
                                                </div>
                                                <div style="font-size: 1.15rem; color: #475569; line-height: 1.6;">
                                                    Recuerda que cada pequeño paso que das es un avance enorme hacia tu bienestar y paz mental.
                                                </div>
                                            `,
                                            icon: 'none',
                                            background: '#fff',
                                            backdrop: 'rgba(255, 228, 230, 0.7)',
                                            confirmButtonText: 'Seguir avanzando ✨',
                                            confirmButtonColor: '#e11d48',
                                            customClass: {
                                                popup: 'rounded-[2.5rem] border-2 border-rose-100 shadow-[0_20px_50px_rgba(225,29,72,0.15)]',
                                                confirmButton: 'rounded-2xl px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl'
                                            }
                                        });
                                    }}
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                                />

                                {/* Floating Elements */}
                                <div
                                    className="absolute -right-4 sm:-right-8 top-8 sm:top-12 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce-slow max-w-[85%] z-10 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        Swal.fire({
                                            html: `
                                                <div style="font-family: 'Playfair Display', serif; color: #9f1239; font-size: 2.2rem; font-weight: 800; margin-bottom: 1rem;">
                                                    ¡Amor propio! 🎀
                                                </div>
                                                <div style="font-size: 1.1rem; color: #475569; line-height: 1.6;">
                                                    Tener una autoestima sana te permite establecer límites claros y valorarte exactamente como mereces.
                                                </div>
                                            `,
                                            icon: 'none',
                                            background: '#fff',
                                            backdrop: 'rgba(255, 228, 230, 0.7)',
                                            confirmButtonText: '¡Lo merezco!',
                                            confirmButtonColor: '#be123c',
                                            customClass: {
                                                popup: 'rounded-[2.5rem] border-2 border-rose-100 shadow-[0_20px_50px_rgba(190,18,60,0.15)]',
                                                confirmButton: 'rounded-2xl px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl'
                                            }
                                        });
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 text-2xl flex-shrink-0">🎀</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">Autoestima Sana</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Progreso 85%</p>
                                    </div>
                                </div>

                                <div
                                    className="absolute left-2 sm:-left-12 bottom-4 sm:bottom-10 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce-slow max-w-[85%] z-10 cursor-pointer"
                                    style={{ animationDelay: '1s' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        Swal.fire({
                                            html: `
                                                <div style="font-family: 'Playfair Display', serif; color: #be185d; font-size: 2.2rem; font-weight: 800; margin-bottom: 1rem;">
                                                    ¡Paz mental! 🌸
                                                </div>
                                                <div style="font-size: 1.1rem; color: #475569; line-height: 1.6;">
                                                    Las emociones son como olas; no puedes detenerlas, pero puedes aprender a surfearlas.
                                                </div>
                                            `,
                                            icon: 'none',
                                            background: '#fff',
                                            backdrop: 'rgba(253, 232, 232, 0.7)',
                                            confirmButtonText: '¡A surfearlas!',
                                            confirmButtonColor: '#be185d',
                                            customClass: {
                                                popup: 'rounded-[2.5rem] border-2 border-rose-100 shadow-[0_20px_50px_rgba(190,18,60,0.15)]',
                                                confirmButton: 'rounded-2xl px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl'
                                            }
                                        });
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold text-xl shadow-inner shrink-0">
                                        🩺
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">Dra. Milagros Bolaño R.</p>
                                        <p className="text-[11px] text-pink-600 dark:text-pink-400 font-medium">Psicóloga Clínica Especialista</p>
                                    </div>
                                </div>

                                <div className="absolute -left-4 sm:-left-8 bottom-8 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 max-w-[85%] z-10">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">Atención Profesional</p>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light">Modalidad Virtual & Presencial</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sección Nuestra Esencia — Perfiles de Especialistas con Tarjetas Destacadas */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-pink-50/40 via-white to-rose-50/30 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-900 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-xs font-extrabold uppercase tracking-wider">
                            Nuestra Esencia & Dirección Especializada
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Conoce a Nuestro Equipo de Salud Integral
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-light">
                            Haz clic en cada especialista para conocer su trayectoria clínica, filosofía terapéutica y enfoque de acompañamiento.
                        </p>
                    </div>

                    {/* Selector / Tabs de Especialistas */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        {ESPECIALISTAS_DETALLE.map((esp) => {
                            const isSelected = esp.id === selectedEspecialistaId;
                            return (
                                <button
                                    key={esp.id}
                                    onClick={() => setSelectedEspecialistaId(esp.id)}
                                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 text-sm font-bold shadow-sm ${
                                        isSelected
                                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105 ring-2 ring-rose-400'
                                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <img
                                        src={esp.imagen}
                                        alt={esp.nombre}
                                        className="w-8 h-8 rounded-full object-cover border border-white/50 shadow-inner"
                                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                                    />
                                    <span>{esp.nombre}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tarjeta Destacada del Especialista Seleccionado */}
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-rose-100 dark:border-slate-800 flex flex-col lg:flex-row items-center gap-12 transition-all duration-500">
                        <div className="lg:w-1/2 relative group w-full">
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
                            <img
                                src={especialistaActual.imagen}
                                alt={`${especialistaActual.nombre} - ${especialistaActual.cargoBreve}`}
                                className="relative rounded-[2rem] shadow-xl border-4 border-white dark:border-slate-800 w-full max-h-[520px] object-cover transform transition duration-500 group-hover:scale-[1.01]"
                                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                            />
                        </div>
                        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm">
                                {especialistaActual.badge}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {especialistaActual.nombre}
                            </h2>
                            <p className="text-lg sm:text-xl text-rose-700 dark:text-pink-400 italic font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {especialistaActual.frase}
                            </p>
                            {especialistaActual.parrafos.map((parrafo, idx) => (
                                <p key={idx} className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-light">
                                    {parrafo}
                                </p>
                            ))}
                            <div className="pt-4">
                                <button
                                    onClick={() => {
                                        setSelectedEspecialidad(especialistaActual.tituloEspecialidad);
                                        setIsCitaModalOpen(true);
                                    }}
                                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 text-base"
                                >
                                    <span>📅</span>
                                    <span>Solicitar Cita con {especialistaActual.nombre}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sello de Confianza */}
            <div className="bg-pink-500 dark:bg-pink-500 py-12 px-4 sm:px-6 lg:px-8 text-white relative z-20 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/3 text-center md:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Diseñadas por profesionales de la salud mental
                        </h2>
                    </div>
                    <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 text-base font-medium">
                        <div className="flex items-start gap-3">
                            <span className="text-pink-200 text-xl font-black mt-1">✔</span>
                            <p>Elaboradas por la Dra. Johana Barrios Chinchilla, la Dra. Rosa Fontalvo Morales y la Dra. Milagros Bolaño Romero.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-pink-200 text-xl font-black mt-1">✔</span>
                            <p>Basadas en principios de la psicología, mindfulness y las neurociencias.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-pink-200 text-xl font-black mt-1">✔</span>
                            <p>Pensadas para acompañar procesos reales de bienestar emocional.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-pink-200 text-xl font-black mt-1">✔</span>
                            <p>Herramientas prácticas para aplicar en la vida diaria.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mensaje Corto & Clasificación */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative z-20 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.2' }}>
                            Dedicarte solo 15 minutos al día transformará la forma en que vives tus emociones.
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            Nuestras bitácoras fueron creadas para acompañarte paso a paso, con actividades sencillas, reflexiones y herramientas psicológicas que puedes aplicar en tu vida diaria.
                        </p>
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Clasificación de las bitácoras</h3>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Bitácora Infantil */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col group opacity-90">
                            <div className="flex justify-between items-center mb-4">
                                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold">🔒 En Edición</span>
                            </div>
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4">
                                <img src="/covers/infancia.jpeg" alt="Bitácora Infantil" className="w-full h-full object-contain rounded-xl shadow-md opacity-80" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Infantil</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Aprendo a conocer lo que siento"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Porque las emociones también se educan.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-8 text-base leading-relaxed">
                                Actividades lúdicas para desarrollar inteligencia emocional, autoestima, empatía y habilidades para expresar sentimientos.
                            </p>
                            <div className="w-full text-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-6 py-4 rounded-xl font-bold text-sm">
                                Próximamente (En Edición)
                            </div>
                        </div>

                        {/* Bitácora Adolescentes (OFICIAL DISPONIBLE) */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-xl border-2 border-emerald-400 dark:border-emerald-500 flex flex-col group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
                            <div className="flex justify-between items-center mb-4">
                                <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide flex items-center gap-1 shadow-sm">
                                    <span>✨</span> OFICIAL DISPONIBLE
                                </span>
                            </div>
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                                <img src="/covers/adolescente.jpeg" alt="Bitácora Adolescentes" className="w-full h-full object-contain rounded-xl shadow-md" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Adolescentes</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Descubriendo mi propio camino"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Entenderme también es crecer.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-8 text-base leading-relaxed">
                                Herramientas para manejar la ansiedad, fortalecer la identidad, mejorar las relaciones y construir autoconfianza.
                            </p>
                            <Link to="/cartillas" className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                                Explorar Bitácora Oficial →
                            </Link>
                        </div>

                        {/* Bitácora Adultos */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col group opacity-90">
                            <div className="flex justify-between items-center mb-4">
                                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold">🔒 En Edición</span>
                            </div>
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4">
                                <img src="/covers/adulto.jpeg" alt="Bitácora Adultos" className="w-full h-full object-contain rounded-xl shadow-md opacity-80" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Adultos</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Reconectando con mi esencia"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Nunca es tarde para sanar.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-8 text-base leading-relaxed">
                                Ejercicios creativos que conecten con el amor propio, para sanar heridas, establecer límites sanos y reducir el estrés propio de la edad.
                            </p>
                            <div className="w-full text-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-6 py-4 rounded-xl font-bold text-sm">
                                Próximamente (En Edición)
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios y Citas Médicas Especializadas en Orden Específico */}
            <section className="py-16 md:py-24 relative z-20 bg-slate-50/70 dark:bg-slate-900/60 border-y border-pink-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider">
                            Atención Profesional Personalizada
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Nuestros Servicios y Citas Especializadas
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-light">
                            Un equipo interdisciplinario de salud integral a tu disposición para acompañar tu proceso de bienestar.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {/* 1. Dra. Rosa Fontalvo Morales (Psiquiatría) */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div>
                                <div className="relative mb-6 mx-auto w-20 h-20">
                                    <img
                                        src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
                                        alt="Dra. Rosa Fontalvo Morales - Psiquiatría"
                                        className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-rose-100 dark:border-slate-700 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-md">
                                        🩺
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Dra. Rosa Fontalvo M.
                                </h3>
                                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-wider mb-3">
                                    Médica Psiquiatra
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
                                    Atención integral de salud mental, docencia universitaria y cuidado del adulto mayor.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedEspecialidad('Dra. Rosa Fontalvo Morales (Psiquiatría & Salud Mental)');
                                    setIsCitaModalOpen(true);
                                }}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl text-center text-sm"
                            >
                                Solicitar Cita
                            </button>
                        </div>

                        {/* 2. Psicología Clínica (Dra. Milagros Bolaño Romero) */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div>
                                <div className="relative mb-6 mx-auto w-20 h-20">
                                    <img
                                        src="/doctoras/dra_milagros.jpg"
                                        alt="Dra. Milagros Bolaño Romero - Psicóloga Clínica"
                                        className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-rose-100 dark:border-slate-700 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs shadow-md">
                                        🩺
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Psicología Clínica
                                </h3>
                                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-wider mb-3">
                                    Dra. Milagros Bolaño Romero
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
                                    Acompañamiento psicoterapéutico especializado para el diagnóstico y regulación emocional.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedEspecialidad('Psicología Clínica');
                                    setIsCitaModalOpen(true);
                                }}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl text-center text-sm"
                            >
                                Solicitar Cita
                            </button>
                        </div>

                        {/* 3. Dra. Johana Barrios Chinchilla (Médico, Mindfulness, Psicología Positiva) */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border-2 border-rose-200 dark:border-pink-800/60 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                            <span className="absolute -top-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
                                Salud Integral
                            </span>
                            <div>
                                <div className="relative mb-6 mx-auto w-20 h-20">
                                    <img
                                        src="/doctoras/dra_johana_hero.jpg"
                                        alt="Dra. Johana Barrios Chinchilla"
                                        className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-rose-200 dark:border-slate-700 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs shadow-md">
                                        🌿
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Dra. Johana Barrios C.
                                </h3>
                                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-wider mb-3">
                                    Médico • Mindfulness
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
                                    Consulta médica en salud integral, auto-liderazgo y desarrollo del bienestar consciente.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedEspecialidad('Dra. Johana Barrios Chinchilla (Salud Integral & Mindfulness)');
                                    setIsCitaModalOpen(true);
                                }}
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl text-center text-sm"
                            >
                                Solicitar Cita
                            </button>
                        </div>

                        {/* 4. Neuropsicología */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div>
                                <div className="relative mb-6 mx-auto w-20 h-20">
                                    <img
                                        src="/doctoras/neuropsicologia.jpg"
                                        alt="Neuropsicología"
                                        className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-purple-100 dark:border-slate-700 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs shadow-md">
                                        🧠
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Neuropsicología
                                </h3>
                                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-wider mb-3">
                                    Evaluación & Rehabilitación
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
                                    Evaluación y rehabilitación cognitiva basada en la neurociencia y la conducta.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedEspecialidad('Neuropsicología');
                                    setIsCitaModalOpen(true);
                                }}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl text-center text-sm"
                            >
                                Solicitar Cita
                            </button>
                        </div>

                        {/* 5. Psicología Clínica & Suicidología */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            <div>
                                <div className="relative mb-6 mx-auto w-20 h-20">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                                        alt="Psicología Clínica & Suicidología"
                                        className="w-20 h-20 rounded-full object-cover shadow-md border-4 border-amber-100 dark:border-slate-700 group-hover:scale-105 transition-transform"
                                    />
                                    <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-md">
                                        💛
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Suicidología
                                </h3>
                                <p className="text-xs font-bold text-rose-600 dark:text-pink-400 uppercase tracking-wider mb-3">
                                    Prevención & Crisis
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-light mb-6">
                                    Atención psicológica experta en prevención del suicidio y contención en situaciones de crisis.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedEspecialidad('Psicología Clínica & Suicidología');
                                    setIsCitaModalOpen(true);
                                }}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl text-center text-sm"
                            >
                                Solicitar Cita
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal de Cita Médica */}
                <CitaModal
                    isOpen={isCitaModalOpen}
                    onClose={() => setIsCitaModalOpen(false)}
                    especialidadInicial={selectedEspecialidad}
                />
            </section>

            {/* Para quién son y Qué encontrarás */}
            <section className="py-16 md:py-24 relative z-20 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* ¿Para quién son? */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-pink-100 dark:border-slate-800">
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>¿Para quién son?</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Niños", icon: "🧸" },
                                    { title: "Adolescentes", icon: "🌱" },
                                    { title: "Adultos", icon: "✨" },
                                    { title: "Padres de familia", icon: "👨‍👩‍👧‍👦" },
                                    { title: "Docentes", icon: "🍎" },
                                    { title: "Empresas", icon: "🏢" },
                                    { title: "Profesionales de la salud", icon: "🩺" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-lg text-slate-700 dark:text-slate-300">
                                        <span className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ¿Qué encontrarás? */}
                        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-pink-100 dark:border-slate-700">
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>¿Qué encontrarás?</h3>
                            <ul className="space-y-5">
                                {[
                                    "Actividades prácticas.",
                                    "Ejercicios de inteligencia emocional.",
                                    "Técnicas para manejar ansiedad, estrés y emociones difíciles.",
                                    "Espacios de reflexión.",
                                    "Retos de crecimiento personal.",
                                    "Herramientas para fortalecer el amor propio y la resiliencia."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-lg text-slate-700 dark:text-slate-300">
                                        <span className="text-rose-500 dark:text-pink-400 mt-1">✔</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Por qué elegir nuestras bitácoras */}
            <section className="py-16 md:py-24 relative z-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                        ¿Por qué elegir nuestras bitácoras?
                    </h2>
                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-pink-100 dark:border-slate-700 transform transition duration-500 hover:scale-105">
                        <h4 className="text-2xl font-bold text-rose-600 dark:text-pink-400 mb-4">
                            Porque no solo escribes...
                        </h4>
                        <p className="text-xl text-slate-700 dark:text-slate-300 font-medium mb-6">
                            Aprendes a conocerte, comprenderte y transformar la manera en que enfrentas la vida.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Creemos que cuidar la salud mental no debe ser complicado; debe ser cercano, práctico y accesible para todos.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action Final */}
            <section className="py-16 md:py-24 relative z-20 bg-gradient-to-br from-rose-400 to-pink-400">
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-10 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Un pequeño click puede cambiar la forma en que vives tus emociones. Hoy puede ser el comienzo de una nueva historia.
                    </h2>
                    <Link to="/cartillas" className="inline-block bg-white text-rose-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1">
                        Quiero mi bitácora emocional
                    </Link>
                </div>
            </section>
        </div>
    );
}
