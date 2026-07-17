import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '', telefono: '', fecha_nacimiento: '', motivo_consulta: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (user) {
      navigate('/cartillas');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Hubo un error');
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate('/cartillas');
    } catch (err) {
      setError('Error al conectar con el servidor');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Columna Izquierda: Imagen / Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
        <img 
          src="/auth-bg.png" 
          alt="Salud Mental" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/40 to-indigo-900/80"></div>
        
        <div className="relative z-10 max-w-lg px-12 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold mb-8 border border-white/30 shadow-2xl">
            P
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Descubre tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-indigo-200">paz interior</span>
          </h1>
          <p className="text-xl font-light text-indigo-100/90 leading-relaxed mb-8">
            Nuestras cartillas psicológicas interactivas están diseñadas para acompañarte en tu proceso de crecimiento personal, a tu propio ritmo.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex-1">
               <div className="text-teal-300 font-bold text-2xl mb-1">100%</div>
               <div className="text-sm text-indigo-100">Seguro y Privado</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex-1">
               <div className="text-teal-300 font-bold text-2xl mb-1">3</div>
               <div className="text-sm text-indigo-100">Cartillas Especializadas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-900 relative">
        <div className="absolute top-8 right-8">
           <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors">
             Volver al inicio
           </Link>
        </div>

        <div className="max-w-md w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-950 dark:text-white mb-2">
              {isLogin ? 'Bienvenido de nuevo' : 'Comienza tu viaje'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light">
              {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Crea tu cuenta para acceder a todo el material.'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-medium border border-red-100 dark:border-red-800/50 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nombre Completo</label>
                    <input 
                      type="text" name="nombre" value={formData.nombre} onChange={handleChange} required={!isLogin}
                      className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900" 
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Teléfono</label>
                      <input 
                        type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required={!isLogin}
                        className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900" 
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Fecha de Nacimiento</label>
                      <input 
                        type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required={!isLogin}
                        className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Motivo Principal de Consulta (Opcional)</label>
                    <select 
                      name="motivo_consulta" value={formData.motivo_consulta} onChange={handleChange}
                      className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900 appearance-none"
                    >
                      <option value="">Selecciona un motivo...</option>
                      <option value="Ansiedad/Estrés">Ansiedad o Estrés</option>
                      <option value="Autoestima">Mejorar Autoestima</option>
                      <option value="Gestión Emocional">Gestión de Emociones</option>
                      <option value="Crecimiento Personal">Crecimiento Personal</option>
                      <option value="Relaciones">Problemas de Pareja/Relaciones</option>
                      <option value="Otro">Otro Motivo</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Correo Electrónico</label>
                <input 
                  type="email" name="correo" value={formData.correo} onChange={handleChange} required
                  className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900" 
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex justify-between">
                  <span>Contraseña</span>
                  {isLogin && <a href="#" className="text-indigo-600 dark:text-teal-400 font-normal hover:underline">¿Olvidaste tu contraseña?</a>}
                </label>
                <input 
                  type="password" name="password" value={formData.password} onChange={handleChange} required
                  className="w-full border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-slate-50 dark:bg-slate-800 dark:text-white text-slate-900" 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-indigo-600 dark:bg-teal-500 text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-indigo-700 dark:hover:bg-teal-600 transition-all shadow-[0_8px_20px_rgb(79,70,229,0.25)] dark:shadow-[0_8px_20px_rgb(20,184,166,0.25)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Ingresar a mi espacio' : 'Crear mi cuenta segura'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-slate-800">
            {isLogin ? '¿Aún no tienes cuenta? ' : '¿Ya eres parte de la comunidad? '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-indigo-600 dark:text-teal-400 font-bold hover:underline transition-colors"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
