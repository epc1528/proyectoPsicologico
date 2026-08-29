import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {
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
                                    src="/johana_barrios_hero.jpg"
                                    alt="Dra. Johana Barrios"
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
                                    onError={(e) => { e.target.src = '/psicologa.jpeg' }}
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
                                                popup: 'rounded-[2.5rem] border-2 border-pink-100 shadow-[0_20px_50px_rgba(190,24,93,0.15)]',
                                                confirmButton: 'rounded-2xl px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl'
                                            }
                                        });
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 text-2xl flex-shrink-0">🌸</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">Regulación Emocional</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Nuevos ejercicios</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Nuestra Esencia Section */}
            <section className="py-16 md:py-24 bg-pink-50/30 dark:bg-slate-900/50 relative z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="/johana_barrios_quote.jpg"
                            alt="Dra. Johana Barrios - Sanarnos un destino es un camino"
                            className="rounded-3xl shadow-2xl border-4 border-white dark:border-slate-800 w-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-rose-900 dark:text-pink-400 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                            "Sanarnos un destino es un camino y empieza por escuchar."
                        </h2>
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            Las Bitácoras Emocionales nacen para acompañarte en el camino del autoconocimiento, ayudándote a identificar, comprender y gestionar tus emociones a través de ejercicios prácticos, reflexiones y herramientas diseñadas por la <strong>Dra. Johana Barrios</strong> (Médico, Mindfulness y Psicología Positiva) y nuestro equipo de neuropsicología.
                        </p>
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            Cada página es una invitación a detenerte, escucharte y regalarte un espacio para crecer emocionalmente.
                        </p>
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
                            <p>Elaboradas por una Psicóloga Clínica y una Neuropsicóloga.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-pink-200 text-xl font-black mt-1">✔</span>
                            <p>Basadas en principios de la psicología y las neurociencias.</p>
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
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-pink-100 dark:border-slate-800 flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                                <img src="/covers/infancia.jpeg" alt="Bitácora Infantil" className="w-full h-full object-contain rounded-xl shadow-md" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Infantil</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Aprendo a conocer lo que siento"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Porque las emociones también se educan.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-10 text-base leading-relaxed">
                                Actividades lúdicas para desarrollar inteligencia emocional, autoestima, empatía y habilidades para expresar sentimientos.
                            </p>
                            <Link to="/cartillas" className="w-full text-center bg-white dark:bg-slate-800 text-rose-600 dark:text-pink-400 border-2 border-rose-100 dark:border-pink-900 px-6 py-4 rounded-xl font-bold hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                Conocer la bitácora
                            </Link>
                        </div>

                        {/* Bitácora Adolescentes */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-pink-100 dark:border-slate-800 flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                                <img src="/covers/adolescente.jpeg" alt="Bitácora Adolescentes" className="w-full h-full object-contain rounded-xl shadow-md" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Adolescentes</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Descubriendo mi propio camino"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Entenderme también es crecer.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-10 text-base leading-relaxed">
                                Herramientas para manejar la ansiedad, fortalecer la identidad, mejorar las relaciones y construir autoconfianza.
                            </p>
                            <Link to="/cartillas" className="w-full text-center bg-white dark:bg-slate-800 text-rose-600 dark:text-pink-400 border-2 border-rose-100 dark:border-pink-900 px-6 py-4 rounded-xl font-bold hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                Conocer la bitácora
                            </Link>
                        </div>

                        {/* Bitácora Adultos */}
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-6 md:p-10 shadow-sm border border-pink-100 dark:border-slate-800 flex flex-col group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                                <img src="/covers/adulto.jpeg" alt="Bitácora Adultos" className="w-full h-full object-contain rounded-xl shadow-md" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Adultos</h3>
                            <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Reconectando con mi esencia"</p>
                            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Nunca es tarde para sanar.</p>
                            <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-10 text-base leading-relaxed">
                                Ejercicios creativos que conecten con el amor propio, para sanar heridas, establecer límites sanos y reducir el estrés propio de la edad
                            </p>
                            <Link to="/cartillas" className="w-full text-center bg-white dark:bg-slate-800 text-rose-600 dark:text-pink-400 border-2 border-rose-100 dark:border-pink-900 px-6 py-4 rounded-xl font-bold hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                Conocer la bitácora
                            </Link>
                        </div>
                    </div>
                </div>
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
