import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import Auth from './Auth';
import AdminDashboard from './AdminDashboard';
import InteractiveWorkbook from './InteractiveWorkbook';
import Swal from 'sweetalert2';

function Home() {
  return (
    <div className="bg-stone-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Hero Section Premium Clinical */}
      <header className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 overflow-hidden">
        {/* Elegant Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply dark:opacity-10 z-0 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-emerald-100/40 dark:bg-emerald-900/20 blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-100/40 dark:bg-amber-900/10 blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row items-center gap-16 z-10">
          <div className="flex-1 space-y-8 text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-stone-200 dark:border-slate-700 text-emerald-800 dark:text-emerald-300 text-sm font-medium shadow-sm tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute"></span>
              Atención Clínica Especializada
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Bienestar emocional <br />
              <span className="text-emerald-700 dark:text-emerald-400 italic">
                a tu propio ritmo.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Descubre un espacio seguro y profesional para tu salud mental. Cartillas terapéuticas diseñadas meticulosamente por especialistas clínicos para guiar tu proceso de sanación.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <Link to="/cartillas" className="bg-emerald-800 dark:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-all shadow-[0_8px_30px_rgb(6,78,59,0.2)] hover:shadow-[0_8px_30px_rgb(6,78,59,0.3)] hover:-translate-y-0.5 tracking-wide">
                Explorar Terapia
              </Link>
              <Link to="/login" className="bg-transparent text-emerald-900 dark:text-emerald-100 border border-emerald-800/20 dark:border-emerald-200/20 px-8 py-4 rounded-lg font-medium text-lg hover:bg-emerald-50 dark:hover:bg-slate-800 transition-all tracking-wide">
                Mi Espacio Privado
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-200 to-amber-100 dark:from-emerald-900/50 dark:to-slate-800 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000 -z-10"></div>
              <div className="relative bg-white dark:bg-slate-800 p-3 sm:p-5 rounded-2xl shadow-2xl border border-stone-100 dark:border-slate-700 transform transition-transform duration-700 hover:scale-[1.01]">
                <img 
                  src="/psicologa.jpg" 
                  alt="Dra. Psicóloga Clínica" 
                  className="rounded-xl w-full object-cover h-[450px] sm:h-[550px]"
                  onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}}
                />
                
                {/* Floating Elements (Premium) */}
                <div className="absolute -left-8 sm:-left-12 top-1/4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-stone-100/50 dark:border-slate-700/50 flex items-center gap-4 animate-float">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 text-xl border border-emerald-100 dark:border-emerald-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Metodología Clínica</p>
                    <p className="text-xs text-stone-500 dark:text-slate-400">Basada en evidencia</p>
                  </div>
                </div>
                
                <div className="absolute -right-6 sm:-right-10 bottom-1/4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-stone-100/50 dark:border-slate-700/50 flex items-center gap-4 animate-float" style={{animationDelay: '1.5s'}}>
                  <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400 text-xl border border-amber-100 dark:border-amber-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Privacidad 100%</p>
                    <p className="text-xs text-stone-500 dark:text-slate-400">Espacio seguro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Indicators / Stats (Clinical) */}
      <div className="border-y border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center divide-x divide-stone-100 dark:divide-slate-800">
            <div className="px-4">
              <div className="text-5xl font-serif text-emerald-800 dark:text-emerald-400 mb-3">10k+</div>
              <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-widest">Pacientes Atendidos</div>
            </div>
            <div className="px-4">
              <div className="text-5xl font-serif text-emerald-800 dark:text-emerald-400 mb-3">3</div>
              <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-widest">Programas Clínicos</div>
            </div>
            <div className="px-4">
              <div className="text-5xl font-serif text-emerald-800 dark:text-emerald-400 mb-3">100%</div>
              <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-widest">Confidencialidad</div>
            </div>
            <div className="px-4">
              <div className="text-5xl font-serif text-emerald-800 dark:text-emerald-400 mb-3">24/7</div>
              <div className="text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase tracking-widest">Acceso Continuo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Como Funciona Section */}
      <section className="py-32 relative bg-stone-50 dark:bg-slate-900 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white tracking-tight">El Proceso Terapéutico</h2>
            <div className="w-24 h-1 bg-emerald-600 dark:bg-emerald-500 mx-auto mt-8 mb-6 rounded-full"></div>
            <p className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">Una metodología estructurada y compasiva para acompañarte en cada paso de tu desarrollo personal.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-stone-300 dark:bg-slate-700 z-0"></div>
            
            {[
              { num: '01', title: 'Evaluación Inicial', desc: 'Identifica tus necesidades emocionales a través de nuestro catálogo especializado en ansiedad, autoestima y gestión emocional.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
              { num: '02', title: 'Intervención Activa', desc: 'Trabaja con ejercicios prácticos y basados en evidencia, registrando tus emociones y avances diarios en un entorno seguro.', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
              { num: '03', title: 'Seguimiento y Crecimiento', desc: 'Revisa tu progreso junto a tu terapeuta. Tu constancia te permitirá construir herramientas duraderas para tu bienestar.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-xl flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-8 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:border-emerald-200 dark:group-hover:border-emerald-800">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={step.icon}></path>
                  </svg>
                </div>
                <div className="text-emerald-800/20 dark:text-emerald-400/20 font-serif text-6xl absolute top-0 -z-10 group-hover:text-emerald-800/30 transition-colors duration-300">{step.num}</div>
                <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">{step.title}</h3>
                <p className="text-stone-600 dark:text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

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
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 text-sm font-medium tracking-wide uppercase mb-6">
            Programas Disponibles
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white tracking-tight mb-6">Catálogo Clínico</h2>
          <div className="w-24 h-1 bg-emerald-600 dark:bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Material terapéutico diseñado con rigor clínico. Selecciona el enfoque en el que deseas trabajar el día de hoy.
          </p>
        </div>
        
        {cartillas.length === 0 ? (
          <div className="text-center py-20 text-stone-500 dark:text-slate-400 flex flex-col items-center">
             <div className="w-12 h-12 border-2 border-emerald-800 dark:border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <span className="font-light tracking-wide uppercase text-sm">Cargando material...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {cartillas.map((cartilla, index) => (
              <div 
                key={cartilla.id} 
                className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-[0_10px_40px_rgb(0,0,0,0.03)] dark:shadow-[0_10px_40px_rgb(0,0,0,0.2)] border border-stone-100 dark:border-slate-700 hover:-translate-y-2 transition-all duration-500 flex flex-col group relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 dark:bg-slate-700 rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
                
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl mb-8 flex items-center justify-center text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {cartilla.id === 1 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path> : 
                       cartilla.id === 2 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> : 
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>}
                    </svg>
                </div>
                
                <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4 line-clamp-1 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">{cartilla.titulo}</h3>
                <p className="text-stone-600 dark:text-slate-400 mb-10 flex-grow font-light leading-relaxed line-clamp-3">
                  {cartilla.descripcion}
                </p>
                
                <div className="mt-auto pt-6 border-t border-stone-100 dark:border-slate-700 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs text-stone-500 dark:text-slate-400 uppercase tracking-widest font-medium">Honorarios</p>
                    <div className="text-slate-900 dark:text-white font-serif text-2xl">
                      ${cartilla.precio.toLocaleString('es-CO')} <span className="text-sm font-sans font-light text-stone-500">COP</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleIngresar(cartilla)}
                    className="w-full bg-slate-900 dark:bg-emerald-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-colors shadow-md tracking-wide"
                  >
                    Iniciar Programa
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-slate-900">
      <div className="w-12 h-12 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white tracking-tight mb-4">Mi Espacio Terapéutico</h2>
          <div className="w-16 h-1 bg-emerald-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto font-light">Continúa con tu progreso en las cartillas que has adquirido.</p>
        </div>
        
        {compras.length === 0 ? (
          <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-2xl shadow-sm border border-stone-200 dark:border-slate-700 max-w-2xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 bg-stone-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100 dark:border-slate-600">
               <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4">Tu estante está vacío</h3>
            <p className="text-stone-600 dark:text-slate-400 mb-8 font-light">Visita nuestro catálogo clínico para encontrar la herramienta ideal para tu proceso actual.</p>
            <Link to="/cartillas" className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-900 transition-colors shadow-md inline-block tracking-wide">
              Ver Catálogo Clínico
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {compras.map((cartilla) => (
              <div key={cartilla.id} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-stone-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col group">
                <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{cartilla.titulo}</h3>
                <p className="text-stone-600 dark:text-slate-400 mb-8 flex-grow font-light leading-relaxed">{cartilla.descripcion}</p>
                <div className="mt-auto pt-6 border-t border-stone-100 dark:border-slate-700">
                  <Link to={`/cartilla/${cartilla.id}`} className="w-full text-center block bg-stone-50 dark:bg-slate-700 text-emerald-800 dark:text-emerald-400 font-medium px-5 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-600 border border-stone-200 dark:border-slate-600 transition-colors tracking-wide">
                    Continuar Sesión
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
    <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-3 z-50">
          <span className="w-10 h-10 rounded-lg bg-emerald-800 dark:bg-emerald-600 flex items-center justify-center text-white text-lg font-sans shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </span>
          PsicoCartillas
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-stone-600 dark:text-slate-300 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors tracking-wide text-sm uppercase">Inicio</Link>
          <Link to="/cartillas" className="text-stone-600 dark:text-slate-300 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors tracking-wide text-sm uppercase">Catálogo</Link>
          
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-500 dark:text-slate-400 transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
            {theme === 'light' ? 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg> : 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            }
          </button>
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/mis-cartillas" className="text-stone-600 dark:text-slate-300 font-medium hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors tracking-wide text-sm uppercase">Mis Cartillas</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-emerald-800 dark:text-emerald-300 font-bold hover:text-emerald-900 bg-emerald-50 dark:bg-emerald-900/40 px-4 py-2 rounded-lg transition-colors border border-emerald-100 dark:border-emerald-800 tracking-wide text-sm uppercase">
                  Consultorio
                </Link>
              )}
              <div className="h-6 w-px bg-stone-300 dark:bg-slate-700"></div>
              <span className="text-sm font-medium text-stone-600 dark:text-slate-400">Hola, <b className="text-slate-900 dark:text-white font-serif text-base">{user.nombre.split(' ')[0]}</b></span>
              <button onClick={logout} className="text-stone-500 dark:text-slate-400 text-sm font-medium hover:text-red-600 dark:hover:text-red-400 transition-colors tracking-wide uppercase">Salir</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="bg-slate-900 dark:bg-emerald-600 text-white px-7 py-2.5 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all shadow-sm hover:shadow-md tracking-wide text-sm uppercase">Acceder</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <button onClick={toggleTheme} className="p-2 rounded-full text-stone-500 dark:text-slate-400">
             {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-900 dark:text-white focus:outline-none">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 shadow-xl py-6 px-6 flex flex-col space-y-5 animate-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif text-slate-900 dark:text-white hover:text-emerald-700">Inicio</Link>
          <Link to="/cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif text-slate-900 dark:text-white hover:text-emerald-700">Catálogo Clínico</Link>
          
          {user ? (
            <>
              <Link to="/mis-cartillas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif text-slate-900 dark:text-white hover:text-emerald-700">Mis Cartillas</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif font-bold text-emerald-700 dark:text-emerald-400">Consultorio Admin</Link>
              )}
              <hr className="border-stone-100 dark:border-slate-800 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-stone-600 dark:text-slate-400 text-sm">Sesión de: <b className="text-slate-900 dark:text-white font-serif text-lg">{user.nombre}</b></span>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-red-600 font-medium uppercase text-sm tracking-wide">Cerrar Sesión</button>
              </div>
            </>
          ) : (
            <>
              <hr className="border-stone-100 dark:border-slate-800 my-2" />
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-900 dark:bg-emerald-600 text-white text-center py-4 rounded-lg font-medium tracking-wide uppercase text-sm mt-2">Acceder al Portal</Link>
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
      <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 transition-colors duration-500">
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

        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-16 mt-auto border-t border-slate-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12 border-b border-slate-800 pb-12">
              <div className="md:col-span-1 lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                   <span className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center text-white text-lg shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                   </span>
                   <span className="text-2xl font-serif font-bold text-white tracking-tight">PsicoCartillas</span>
                </div>
                <p className="text-slate-400 font-light max-w-sm leading-relaxed">
                  Práctica clínica basada en la evidencia, accesible desde cualquier lugar. Espacio diseñado para tu bienestar emocional y crecimiento personal.
                </p>
                <div className="mt-8 flex space-x-4">
                  {/* Social placeholders */}
                  {['in', 'ig', 'tw'].map((icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-emerald-800 hover:border-emerald-700 text-slate-400 hover:text-white transition-all duration-300 text-sm font-medium uppercase">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Clínica</h4>
                <ul className="space-y-4">
                  <li><Link to="/cartillas" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Catálogo de Programas</Link></li>
                  <li><Link to="/login" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Portal del Paciente</Link></li>
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Metodología</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Sobre la Doctora</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 uppercase tracking-widest text-xs">Legal & Privacidad</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Aviso de Privacidad</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Términos de Servicio</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Consentimiento Informado</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors font-light">Contacto de Emergencia</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-light">
              <p>&copy; {new Date().getFullYear()} Clínica PsicoCartillas. Todos los derechos reservados.</p>
              <p className="mt-4 md:mt-0 flex items-center gap-2">Diseño profesional para la salud mental.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
