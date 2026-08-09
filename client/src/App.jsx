import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import Auth from './Auth';
import AdminDashboard from './AdminDashboard';
import InteractiveWorkbook from './InteractiveWorkbook';
import logoClick from './assets/logo-click.jpeg';
import fotoperfil1 from './assets/perfil2.png';

function Home() {
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
                  src="/psicologa.jpeg" 
                  alt="Terapia Digital" 
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
                  onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}}
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
                  style={{animationDelay: '1s'}}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-rose-900 dark:text-pink-400 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "No todas las heridas se ven, pero todas merecen ser escuchadas."
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Las Bitácoras Emocionales nacen para acompañarte en el camino del autoconocimiento, ayudándote a identificar, comprender y gestionar tus emociones a través de ejercicios prácticos, reflexiones y herramientas diseñadas por psicóloga clínica de orientación psicoanalista y Neuropsicóloga con énfasis en investigación.
          </p>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
            Cada página es una invitación a detenerte, escucharte y regalarte un espacio para crecer emocionalmente.
          </p>
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
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                <img src="/covers/infancia.png" alt="Bitácora Infantil" className="w-full h-full object-cover rounded-xl shadow-md" />
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
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                <img src="/covers/adolescentes.png" alt="Bitácora Adolescentes" className="w-full h-full object-cover rounded-xl shadow-md" />
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
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                <img src="/covers/adulto.png" alt="Bitácora Adultos" className="w-full h-full object-cover rounded-xl shadow-md" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Bitácora Adultos</h3>
              <p className="text-rose-600 dark:text-pink-400 text-lg font-bold italic mb-6">"Reconectando con mi esencia"</p>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-lg">Nunca es tarde para sanar.</p>
              <p className="text-slate-600 dark:text-slate-400 flex-grow font-light mb-10 text-base leading-relaxed">
                Ejercicios profundos para sanar heridas, establecer límites sanos, reducir el estrés y cultivar el amor propio.
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

      {/*colaborador*/}
      
<section className="py-16 md:py-24 bg-slate-50/80 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 relative z-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        Nuestro Equipo
      </h2>
      <h3 className="text-2xl text-rose-600 dark:text-pink-400 font-bold italic">
        "Creemos que comprender las emociones puede transformar vidas."
      </h3>
      <p className="text-lg text-slate-700 dark:text-slate-300 font-light leading-relaxed">
        Las Bitácoras Emocionales <strong>"Dale un click a tus emociones"</strong> nacen de la unión de profesionales en salud mental y bienestar integral, con el propósito de brindar herramientas prácticas que acompañen a niños, adolescentes y adultos.
      </p>
      <p className="text-lg text-slate-700 dark:text-slate-300 font-light leading-relaxed">
        Cada actividad ha sido diseñada con fundamento profesional, buscando que las personas aprendan a conocerse, fortalecer sus recursos personales y construir una relación más saludable con sus emociones.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {/* Autora 1: Milagro Bolaños (Coordinadora) */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-lg border border-pink-100/50 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500 relative">
        <span className="absolute top-4 right-4 bg-pink-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">Coordinadora</span>
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white dark:border-slate-800 mt-4">
          <img src={fotoperfil1} alt="Milagro Bolaños" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Milagro Bolaño Romero</h4>
        <p className="text-rose-600 dark:text-pink-400 font-bold tracking-widest uppercase text-xs mb-4">Psicóloga Clínica</p>
        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">
          MBA en Administración y Dirección de Empresas, Especialista en Psicoterapia Clínica de Orientación Psicoanalítica, Coaching, PNL, y Gerencia en SST. Brinda acompañamiento psicoterapéutico enfocado en desarrollar el talento y bienestar humano.
        </p>
      </div>

      {/* Autora 2: María Fernanda León */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-lg border border-pink-100/50 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 flex items-center justify-center">
          <img src="/dcmaria.jpeg" alt="María Fernanda León" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>María Fernanda De León R.</h4>
        <p className="text-rose-600 dark:text-pink-400 font-bold tracking-widest uppercase text-xs mb-4">Neuropsicóloga</p>
        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">
          Magíster en Neuropsicología clínica / investigativa. A lo largo de su trayectoria ha desarrollado programas de estimulación y rehabilitación cognitiva, promoviendo la salud mental desde una perspectiva humana, ética y basada en la evidencia.
        </p>
      </div>

      {/* Autora 3: Rosita */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-lg border border-pink-100/50 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Dra. Rosa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Dra. Rosa</h4>
        <p className="text-rose-600 dark:text-pink-400 font-bold tracking-widest uppercase text-xs mb-4">Psiquiatra</p>
        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">
          Especialista en psiquiatría clínica con un enfoque empático e integral. Acompaña procesos terapéuticos brindando el apoyo médico necesario para complementar las herramientas psicológicas y potenciar el bienestar emocional profundo.
        </p>
      </div>

      {/* Autora 4: Nutricionista */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-lg border border-pink-100/50 dark:border-slate-800 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white dark:border-slate-800 bg-slate-100 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1590611936760-eeb9bc598548?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Nutricionista" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
        </div>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Nutrición</h4>
        <p className="text-rose-600 dark:text-pink-400 font-bold tracking-widest uppercase text-xs mb-4">Nutricionista</p>
        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-sm">
          Profesional de la nutrición dedicada a establecer la conexión fundamental entre la alimentación y la salud mental. Diseña planes personalizados que nutren el cuerpo y la mente, complementando el trabajo emocional.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Sistema de Citas */}
<section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative z-20 border-t border-slate-100 dark:border-slate-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        Nuestros Servicios de Salud Integral
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
        Más allá de las bitácoras, contamos con un equipo multidisciplinario listo para acompañarte en tu proceso personal. Agenda una consulta especializada según tus necesidades.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Psicología Clínica */}
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-2xl mb-6">🛋️</div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Psicología Clínica</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-light mb-6 flex-grow">
          Terapia individual y herramientas psicoterapéuticas para gestionar emociones, ansiedad y crecimiento personal.
        </p>
        <a href="#" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
          Solicitar Cita
        </a>
      </div>

      {/* Neuropsicología */}
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-2xl mb-6">🧠</div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Neuropsicología</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-light mb-6 flex-grow">
          Evaluación, estimulación y rehabilitación cognitiva basada en el funcionamiento del cerebro y la conducta.
        </p>
        <a href="#" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
          Solicitar Cita
        </a>
      </div>

      {/* Psiquiatría */}
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-2xl mb-6">🩺</div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Psiquiatría</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-light mb-6 flex-grow">
          Acompañamiento médico especializado para el diagnóstico y tratamiento integral de los trastornos emocionales.
        </p>
        <a href="#" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
          Solicitar Cita
        </a>
      </div>

      {/* Nutrición */}
      <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-2xl mb-6">🥑</div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Nutrición</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-light mb-6 flex-grow">
          Planes de alimentación personalizados para fortalecer el bienestar físico y potenciar la salud mental integral.
        </p>
        <a href="#" className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm">
          Solicitar Cita
        </a>
      </div>
    </div>
  </div>
</section>

      
    </div>
  );
}

import Swal from 'sweetalert2';

function Cartillas() {
  const [cartillas, setCartillas] = useState([]);
  const [compradas, setCompradas] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/cartillas')
      .then(res => res.json())
      .then(data => setCartillas(data))
      .catch(err => console.error(err));
      
    if (user) {
      const token = localStorage.getItem('token');
      fetch('http://localhost:5000/api/mis-compras', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCompradas(data.map(c => c.id));
        }
      })
      .catch(err => console.error(err));
    }
  }, [user]);

  const handleIngresar = (cartilla) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/cartilla/${cartilla.id}`);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800/50 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6 shadow-sm">
            Catálogo Oficial
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Nuestras Bitácoras Emocionales</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Herramientas diseñadas clínicamente para acompañarte en tu proceso. Selecciona la bitácora que mejor resuene con tus necesidades actuales.
          </p>
        </div>
        
        {cartillas.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             Cargando bitácoras...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cartillas.map((cartilla, index) => (
              <div 
                key={cartilla.id} 
                className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="w-full h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2">
                  <img 
                    src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescente.jpeg' : '/covers/infancia.jpeg'} 
                    alt={`Portada ${cartilla.titulo}`}
                    className="w-full h-full object-cover rounded-xl shadow-md transition-transform group-hover:scale-105 duration-700"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{cartilla.titulo}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow font-light leading-relaxed line-clamp-3">
                  {cartilla.descripcion}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-semibold">Inversión</p>
                    <div className="text-rose-600 dark:text-pink-400 font-extrabold text-2xl">
                      ${(cartilla.precio === 120000 ? 12000 : cartilla.precio).toLocaleString('es-CO')} <span className="text-sm font-medium opacity-70">COP</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleIngresar(cartilla)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-pink-600 dark:hover:bg-pink-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    Ingresar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function MisCartillas() {
  const [compras, setCompras] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      setTimeout(() => navigate('/login'), 100);
      return;
    }
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/mis-compras', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setCompras(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [user, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Mis Bitácoras</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">Continúa con tu progreso en las bitácoras que has adquirido.</p>
        </div>
        
        {compras.length === 0 ? (
          <div className="text-center bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Aún no tienes bitácoras</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Visita nuestro catálogo para encontrar la herramienta ideal para ti.</p>
            <Link to="/cartillas" className="bg-pink-600 dark:bg-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-pink-700 dark:hover:bg-pink-700 transition-colors shadow-md inline-block">
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {compras.map((cartilla) => (
              <div key={cartilla.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-pink-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-pink-400 dark:bg-pink-600"></div>
                <div className="w-full h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-sm p-2 border border-slate-200 dark:border-slate-700/50">
                   <img 
                    src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescentes.jpeg' : '/covers/infancia.jpeg'} 
                    alt={`Portada ${cartilla.titulo}`}
                    className="w-full h-full object-cover rounded-xl shadow-sm transition-transform group-hover:scale-105 duration-700"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{cartilla.titulo}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light leading-relaxed">{cartilla.descripcion}</p>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link to={`/cartilla/${cartilla.id}`} className="w-full text-center block bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400 font-bold px-5 py-3 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-800/50 transition-colors">
                    Continuar Taller →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-indigo-950 dark:text-white flex items-center gap-2 z-50">
          <img src={logoClick} alt="Logo" className="w-15 h-15 object-contain" />
          <span style={{ fontFamily: "'Playfair Display', serif" }}>Dra. Milagros Bolaños</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 dark:text-slate-300 font-medium hover:text-rose-600 dark:hover:text-pink-400 transition-colors">Inicio</Link>
          <Link to="/cartillas" className="text-slate-600 dark:text-slate-300 font-medium hover:text-rose-600 dark:hover:text-pink-400 transition-colors">Catálogo</Link>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div className="flex items-center gap-5">
              <Link to="/mis-cartillas" className="text-slate-600 font-medium hover:text-rose-600 transition-colors">Mis Bitácoras</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-pink-600 font-bold hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 bg-pink-50 dark:bg-pink-900/30 px-4 py-2 rounded-full transition-colors">Panel Doctora</Link>
              )}
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hola, <b className="text-rose-950 dark:text-white">{user.nombre.split(' ')[0]}</b></span>
              <button onClick={logout} className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-slate-800 dark:hover:text-white transition-colors">Salir</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="bg-pink-600 dark:bg-pink-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-pink-700 dark:hover:bg-pink-600 transition-all shadow-md hover:shadow-lg">Comenzar</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400" aria-label="Toggle Dark Mode">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl py-4 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-pink-400">Inicio</Link>
          <Link to="/cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-pink-400">Catálogo</Link>
          
          {user ? (
            <>
              <Link to="/mis-cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600">Mis Bitácoras</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-pink-600 dark:text-pink-400">Panel Doctora</Link>
              )}
              <hr className="border-slate-100 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">Hola, <b>{user.nombre}</b></span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-500 font-medium">Cerrar Sesión</button>
              </div>
            </>
          ) : (
            <>
              <hr className="border-slate-100 dark:border-slate-800" />
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-pink-600 dark:bg-pink-500 text-white text-center py-3 rounded-xl font-bold mt-2">Comenzar Ahora</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans selection:bg-pink-200 selection:text-pink-900 transition-colors duration-300">
        <NavBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cartillas" element={<Cartillas />} />
            <Route path="/mis-cartillas" element={<MisCartillas />} />
            <Route path="/cartilla/:id" element={<InteractiveWorkbook />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-pink-950 dark:bg-slate-950 text-slate-300 py-16 mt-auto border-t border-rose-900/50 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-rose-900 dark:border-slate-800 pb-12">
              <div className="md:col-span-1 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                   <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-pink-500/20">P</span>
                   <span className="text-2xl font-bold text-white tracking-tight">PsicoBitácoras</span>
                </div>
                <p className="text-rose-200/70 dark:text-slate-500 font-light max-w-sm leading-relaxed">
                  Transformando el acceso a la salud mental mediante herramientas digitales interactivas, seguras y profesionales. Empieza tu proceso hoy mismo.
                </p>
                <div className="mt-6 flex space-x-4">
                  {/* Social placeholders */}
                  {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-pink-900 dark:bg-slate-900 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors duration-300">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Plataforma</h4>
                <ul className="space-y-4">
                  <li><Link to="/cartillas" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Catálogo de Bitácoras</Link></li>
                  <li><Link to="/login" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Inicia Sesión</Link></li>
                  <li><Link to="/login" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Regístrate</Link></li>
                  <li><a href="#beneficios" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">¿Cómo Funciona?</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal & Soporte</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Términos y Condiciones</a></li>
                  <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Política de Privacidad</a></li>
                  <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Centro de Ayuda</a></li>
                  <li><a href="#" className="text-rose-200/70 dark:text-slate-500 hover:text-pink-400 dark:hover:text-pink-400 transition-colors">Contacto</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-rose-300/50 dark:text-slate-600 text-sm">
              <p>&copy; {new Date().getFullYear()} PsicoBitácoras. Diseñado para tu bienestar mental.</p>
              <p className="mt-4 md:mt-0 flex items-center gap-2">Hecho con <span className="text-pink-500">❤️</span> por expertos clínicos.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
