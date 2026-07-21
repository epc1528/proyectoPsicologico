import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import Auth from './Auth';
import AdminDashboard from './AdminDashboard';
import InteractiveWorkbook from './InteractiveWorkbook';
import logoClick from './assets/logo-click.jpeg';
import fotoperfil1 from './assets/perfil1.jpg';

function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section Premium */}
      <header className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-950 dark:to-teal-900/20 -z-10"></div>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-teal-200/30 dark:bg-teal-900/20 opacity-50 blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 opacity-50 blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800/50 text-teal-700 dark:text-teal-400 text-sm font-semibold mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 absolute"></span>
              Plataforma #1 en Salud Mental Digital
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Tu paz mental,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">
                donde y cuando quieras.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Inicia tu proceso de sanación a través de bitacoras interactivas diseñadas por psicólogos clínicos. Una metodología paso a paso para abrazar tus emociones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/cartillas" className="bg-indigo-600 dark:bg-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 dark:hover:bg-teal-600 transition-all shadow-[0_8px_30px_rgb(79,70,229,0.3)] dark:shadow-[0_8px_30px_rgb(20,184,166,0.25)] hover:-translate-y-1">
                Explorar Bitacoras
              </Link>
              <Link to="/login" className="bg-white dark:bg-slate-800 text-indigo-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md">
                Ingresar a mi espacio
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 -z-10"></div>
              <div className="relative bg-white dark:bg-slate-900 p-2 sm:p-4 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-800/50 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="/psicologa.jpg" 
                  alt="Terapia Digital" 
                  className="rounded-[2rem] w-full object-cover h-[400px] sm:h-[500px] shadow-inner"
                  onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}}
                />
                
                {/* Floating Elements */}
                <div className="absolute -left-6 sm:-left-12 top-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce-slow">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400 text-2xl">🌿</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Ansiedad Controlada</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Progreso 85%</p>
                  </div>
                </div>
                
                <div className="absolute -right-6 sm:-right-8 bottom-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce-slow" style={{animationDelay: '1s'}}>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-2xl">✨</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Autoestima</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Nuevos ejercicios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Indicators / Stats */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-800">
            <div className="px-4">
              <div className="text-4xl font-extrabold text-indigo-900 dark:text-teal-400 mb-2">+10k</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pacientes Felices</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-extrabold text-indigo-900 dark:text-teal-400 mb-2">3</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Programas Especializados</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-extrabold text-indigo-900 dark:text-teal-400 mb-2">100%</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Privacidad Garantizada</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-extrabold text-indigo-900 dark:text-teal-400 mb-2">24/7</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Acceso a tu material</div>
            </div>
          </div>
        </div>
      </div>

      {/* Como Funciona Section */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">¿Cómo funciona?</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">Un método comprobado de tres pasos para trabajar en ti mismo.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-teal-200 via-indigo-200 to-teal-200 dark:from-teal-900 dark:via-indigo-900 dark:to-teal-900 z-0"></div>
            
            {[
              { num: '1', title: 'Elige tu enfoque', desc: 'Explora nuestro catálogo y selecciona la cartilla que mejor resuene con tu momento actual (Ansiedad, Autoestima o Emociones).', icon: '🔍' },
              { num: '2', title: 'Interactúa y Reflexiona', desc: 'Responde ejercicios, evalúa tu nivel de energía diario y guarda tus reflexiones directamente en nuestra plataforma segura.', icon: '✍️' },
              { num: '3', title: 'Sana a tu ritmo', desc: 'Retoma donde lo dejaste en cualquier momento. Tu psicóloga podrá ver tu progreso para acompañarte mejor.', icon: '🌱' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 shadow-xl flex items-center justify-center text-4xl mb-8 relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-indigo-600 opacity-10 dark:opacity-20"></div>
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 dark:bg-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-lg">{step.num}</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*colaborador*/}
      
<section className="py-24 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 relative z-20 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Encabezado de la Sección */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Nuestro Equipo de Colaboradores
      </h2>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
        Profesionales calificados en tecnología y salud mental dedicados a proteger y optimizar tu espacio de sanación.
      </p>
    </div>

    {/* Lógica y Estructura del Carrusel */}
    {(() => {
      const colaboradores = [
        {
          nombre: "Dra. Milagro Bolaño Romero",
          cargo: "Psicóloga Clínica - Psicoterapeuta",
          desc: "Especialista en psicoterapia psicoanalítica y desarrollo de metodologías cognitivas interactivas para el bienestar emocional continuo.",
          foto: fotoperfil1
        },
        {
          nombre: "Ing. Andrea Mendoza Castro",
          cargo: "Directora de Infraestructura y Datos",
          desc: "Especialista en seguridad en la nube y arquitectura de servidores redundantes. Garantiza que la privacidad y disponibilidad de tu historial psicológico esté activa 24/7.",
          foto: "https://unsplash.com"
        },
        {
          nombre: "Dr. Carlos Valencia Ruiz",
          cargo: "Neuropsicólogo Clínico",
          desc: "Investigador en estimulación cognitiva para adultos mayores y diseñador de las dinámicas ágiles integradas en nuestras bitacoras digitales.",
          foto: "https://unsplash.com"
        }
      ];

      const [currentIndex, setCurrentIndex] = React.useState(0);

      const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % colaboradores.length);
      };

      const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + colaboradores.length) % colaboradores.length);
      };

      return (
        <div className="relative max-w-4xl mx-auto px-4 md:px-12">
          {/* Tarjeta Central */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[320px] transition-all duration-300">
            
            {/* Foto */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img 
                src={colaboradores[currentIndex].foto} 
                alt={colaboradores[currentIndex].nombre} 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Información */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {colaboradores[currentIndex].nombre}
                </h3>
                <p className="text-sm font-semibold tracking-wide uppercase text-teal-600 dark:text-teal-400 mt-1">
                  {colaboradores[currentIndex].cargo}
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light text-base md:text-lg">
                "{colaboradores[currentIndex].desc}"
              </p>
            </div>
          </div>

          {/* Flecha Izquierda */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-teal-400 hover:shadow-lg transition-all active:scale-95 cursor-pointer z-30"
          >
            ←
          </button>

          {/* Flecha Derecha */}
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-teal-400 hover:shadow-lg transition-all active:scale-95 cursor-pointer z-30"
          >
            →
          </button>

          {/* Puntos de Navegación */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {colaboradores.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === index 
                    ? 'w-8 bg-indigo-600 dark:bg-teal-500' 
                    : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      );
    })()}

  </div> {/* <-- Aquí se cerró el div de max-w-7xl que faltaba */}
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
    fetch('https://proyectopsicologico-production.up.railway.app/api/cartillas')
      .then(res => res.json())
      .then(data => setCartillas(data))
      .catch(err => console.error(err));
      
    if (user) {
      const token = localStorage.getItem('token');
      fetch('https://proyectopsicologico-production.up.railway.app/api/mis-compras', {
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
          <div className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800/50 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-6">
            Catálogo Oficial
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Nuestras Bitacoras</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Herramientas diseñadas clínicamente para acompañarte en tu proceso. Selecciona la cartilla que mejor resuene con tus necesidades actuales.
          </p>
        </div>
        
        {cartillas.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 flex flex-col items-center">
             <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             Cargando bitacoras...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cartillas.map((cartilla, index) => (
              <div 
                key={cartilla.id} 
                className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                
                <div className="w-full h-56 bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl mb-8 flex items-center justify-center relative overflow-hidden border border-white/50 dark:border-slate-700/50">
                  <div className="absolute inset-0 bg-teal-400/10 mix-blend-overlay"></div>
                  <span className="text-7xl opacity-90 drop-shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                    {cartilla.id === 1 ? '🍃' : cartilla.id === 2 ? '✨' : '🧘'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1">{cartilla.titulo}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow font-light leading-relaxed line-clamp-3">
                  {cartilla.descripcion}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-semibold">Inversión</p>
                    <div className="text-indigo-600 dark:text-teal-400 font-extrabold text-2xl">
                      ${cartilla.precio.toLocaleString('es-CO')} <span className="text-sm font-medium opacity-70">COP</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleIngresar(cartilla)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-teal-600 dark:hover:bg-teal-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
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
    fetch('https://proyectopsicologico-production.up.railway.app/api/mis-compras', {
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
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-indigo-950 tracking-tight mb-4">Mis Bitacoras</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">Continúa con tu progreso en las bitacoras que has adquirido.</p>
        </div>
        
        {compras.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-indigo-950 mb-4">Aún no tienes bitacoras</h3>
            <p className="text-slate-600 mb-6">Visita nuestro catálogo para encontrar la herramienta ideal para ti.</p>
            <Link to="/cartillas" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md inline-block">
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {compras.map((cartilla) => (
              <div key={cartilla.id} className="bg-white rounded-3xl p-8 shadow-sm border border-teal-100 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-teal-400"></div>
                <div className="w-full h-40 bg-gradient-to-br from-indigo-50 to-teal-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                   <span className="text-5xl opacity-80 mix-blend-multiply transition-transform group-hover:scale-110 duration-500">
                    {cartilla.id === 1 ? '🍃' : cartilla.id === 2 ? '✨' : '🧘'}
                   </span>
                </div>
                <h3 className="text-2xl font-bold text-indigo-950 mb-3">{cartilla.titulo}</h3>
                <p className="text-slate-600 mb-6 flex-grow font-light leading-relaxed">{cartilla.descripcion}</p>
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <Link to={`/cartilla/${cartilla.id}`} className="w-full text-center block bg-teal-50 text-teal-700 font-bold px-5 py-3 rounded-xl hover:bg-teal-100 transition-colors">
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
          Dra. Milagro Bolaño R.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 dark:text-slate-300 font-medium hover:text-indigo-600 dark:hover:text-teal-400 transition-colors">Inicio</Link>
          <Link to="/cartillas" className="text-slate-600 dark:text-slate-300 font-medium hover:text-indigo-600 dark:hover:text-teal-400 transition-colors">Catálogo</Link>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {user ? (
            <div className="flex items-center gap-5">
              <Link to="/mis-cartillas" className="text-slate-600 font-medium hover:text-indigo-600 transition-colors">Mis Bitacoras</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-teal-600 font-bold hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-full transition-colors">Panel Doctora</Link>
              )}
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hola, <b className="text-indigo-950 dark:text-white">{user.nombre.split(' ')[0]}</b></span>
              <button onClick={logout} className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-slate-800 dark:hover:text-white transition-colors">Salir</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="bg-indigo-600 dark:bg-teal-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-indigo-700 dark:hover:bg-teal-600 transition-all shadow-md hover:shadow-lg">Comenzar</Link>
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-teal-400">Inicio</Link>
          <Link to="/cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-teal-400">Catálogo</Link>
          
          {user ? (
            <>
              <Link to="/mis-cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600">Mis Bitacoras</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-teal-600 dark:text-teal-400">Panel Doctora</Link>
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
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-indigo-600 dark:bg-teal-500 text-white text-center py-3 rounded-xl font-bold mt-2">Comenzar Ahora</Link>
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
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans selection:bg-teal-200 selection:text-teal-900 transition-colors duration-300">
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

        <footer className="bg-indigo-950 dark:bg-slate-950 text-slate-300 py-16 mt-auto border-t border-indigo-900/50 dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-indigo-900 dark:border-slate-800 pb-12">
              <div className="md:col-span-1 lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                   <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-500/20">P</span>
                   <span className="text-2xl font-bold text-white tracking-tight">PsicoBitacoras</span>
                </div>
                <p className="text-indigo-200/70 dark:text-slate-500 font-light max-w-sm leading-relaxed">
                  Transformando el acceso a la salud mental mediante herramientas digitales interactivas, seguras y profesionales. Empieza tu proceso hoy mismo.
                </p>
                <div className="mt-6 flex space-x-4">
                  {/* Social placeholders */}
                  {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-indigo-900 dark:bg-slate-900 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors duration-300">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Plataforma</h4>
                <ul className="space-y-4">
                  <li><Link to="/cartillas" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Catálogo de Bitacoras</Link></li>
                  <li><Link to="/login" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Inicia Sesión</Link></li>
                  <li><Link to="/login" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Regístrate</Link></li>
                  <li><a href="#beneficios" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">¿Cómo Funciona?</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Legal & Soporte</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Términos y Condiciones</a></li>
                  <li><a href="#" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Política de Privacidad</a></li>
                  <li><a href="#" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Centro de Ayuda</a></li>
                  <li><a href="#" className="text-indigo-200/70 dark:text-slate-500 hover:text-teal-400 dark:hover:text-teal-400 transition-colors">Contacto</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-indigo-300/50 dark:text-slate-600 text-sm">
              <p>&copy; {new Date().getFullYear()} PsicoBitacoras. Diseñado para tu bienestar mental.</p>
              <p className="mt-4 md:mt-0 flex items-center gap-2">Hecho con <span className="text-teal-500">❤️</span> por expertos clínicos.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
