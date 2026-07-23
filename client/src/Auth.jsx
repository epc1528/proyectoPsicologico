import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Swal from 'sweetalert2';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', correo: '', password: '', telefono: '', fecha_nacimiento: '', motivo_consulta: '', codigoAdmin: '' });
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
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { correo: formData.correo, password: formData.password }
      : formData;

    fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en la solicitud');
        
        login(data.user, data.token);
        
        // Mostrar bienvenida
        Swal.fire({
          title: `¡Bienvenido(a) ${data.user.nombre.split(' ')[0]}!`,
          text: isLogin ? 'Qué bueno verte de nuevo.' : 'Tu cuenta ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonColor: '#059669',
          timer: 2000,
          showConfirmButton: false
        });
        
        navigate('/cartillas');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleForgotPassword = () => {
    if (!formData.correo) {
      Swal.fire('Atención', 'Por favor ingresa tu correo electrónico para enviarte las instrucciones.', 'info');
      return;
    }
    
    Swal.fire({
      title: 'Enviando correo...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo: formData.correo })
    })
    .then(res => res.json())
    .then(data => {
      Swal.fire('Correo enviado', 'Si el correo existe en nuestra base de datos, recibirás un enlace de recuperación pronto.', 'success');
    })
    .catch(() => {
      Swal.fire('Error', 'Hubo un problema al contactar al servidor', 'error');
    });
  };

  return (
    <div className="min-h-screen flex bg-stone-50 dark:bg-slate-900 transition-colors duration-500">
      
      {/* Columna Izquierda: Imagen / Branding (Premium) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-900 overflow-hidden items-center justify-center">
        <img 
          src="/auth-bg.png" 
          alt="Clínica PsicoCartillas" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1544027993-37db2462737e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'}}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 to-slate-900/90"></div>
        
        <div className="relative z-10 max-w-lg px-12 text-white animate-fade-in-up">
          <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-serif mb-8 border border-white/20 shadow-2xl">
            <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <h1 className="text-5xl font-serif tracking-tight mb-6 leading-tight">
            Descubre tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-200 italic">paz interior</span>
          </h1>
          <p className="text-xl font-light text-emerald-100/80 leading-relaxed mb-10">
            Un espacio clínico, confidencial y diseñado profesionalmente para acompañar tu proceso terapéutico.
          </p>
          
          <div className="flex gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex-1 hover:bg-white/10 transition-colors">
               <div className="text-emerald-300 font-serif text-3xl mb-1">100%</div>
               <div className="text-sm text-emerald-100/70 font-light tracking-wide uppercase">Confidencial</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex-1 hover:bg-white/10 transition-colors">
               <div className="text-emerald-300 font-serif text-3xl mb-1">3</div>
               <div className="text-sm text-emerald-100/70 font-light tracking-wide uppercase">Programas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-900 relative">
        <div className="absolute top-8 right-8">
           <Link to="/" className="text-sm font-medium text-stone-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors uppercase tracking-widest">
             Volver al inicio
           </Link>
        </div>

        <div className="max-w-md w-full space-y-10 animate-fade-in-up">
          <div>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white mb-3">
              {isLogin ? 'Acceso al Portal' : 'Registro de Paciente'}
            </h2>
            <p className="text-stone-500 dark:text-slate-400 font-light text-lg">
              {isLogin ? 'Ingresa tus credenciales para continuar tu proceso.' : 'Crea tu expediente clínico para comenzar.'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg text-sm font-medium border border-red-200 dark:border-red-800/30 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Nombre Completo</label>
                    <input 
                      type="text" name="nombre" value={formData.nombre} onChange={handleChange} required={!isLogin}
                      className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Teléfono</label>
                      <input 
                        type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required={!isLogin}
                        className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Fecha Nac.</label>
                      <input 
                        type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required={!isLogin}
                        className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Motivo Principal de Consulta</label>
                    <select 
                      name="motivo_consulta" value={formData.motivo_consulta} onChange={handleChange}
                      className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 appearance-none font-light"
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
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Código Especialista (Opcional)</label>
                    <input 
                      type="password" name="codigoAdmin" value={formData.codigoAdmin} onChange={handleChange}
                      className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                      placeholder="Solo para personal de la clínica"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest">Correo Electrónico</label>
                <input 
                  type="email" name="correo" value={formData.correo} onChange={handleChange} required
                  className="w-full border border-stone-200 dark:border-slate-700 p-4 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                  placeholder="paciente@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 dark:text-slate-400 mb-2 uppercase tracking-widest flex justify-between">
                  <span>Contraseña</span>
                  {isLogin && <button type="button" onClick={handleForgotPassword} className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline lowercase normal-case">¿Olvidaste tu contraseña?</button>}
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" value={formData.password} onChange={handleChange} required
                    className="w-full border border-stone-200 dark:border-slate-700 p-4 pr-12 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none transition-all bg-stone-50/50 dark:bg-slate-800 dark:text-white text-slate-900 font-light" 
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {!isLogin && (
                <div className="flex items-start gap-3 mt-4">
                  <input 
                    type="checkbox" 
                    id="terminos" 
                    required 
                    className="mt-1 w-5 h-5 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600"
                  />
                  <label htmlFor="terminos" className="text-sm text-stone-600 dark:text-slate-400 font-light leading-relaxed">
                    Acepto los <a href="#" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">Términos del Servicio Clínico</a> y autorizo el tratamiento de mis datos de salud según el <a href="#" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">Aviso de Privacidad</a>.
                  </label>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white font-medium text-lg py-4 px-8 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-700 transition-all shadow-md tracking-wide disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Ingresar al Portal' : 'Crear Expediente Clínico'
              )}
            </button>
          </form>

          <div className="text-center text-sm text-stone-500 dark:text-slate-400 pt-8 border-t border-stone-100 dark:border-slate-800">
            {isLogin ? '¿Es tu primera sesión? ' : '¿Ya tienes un expediente? '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline transition-colors uppercase tracking-widest text-xs ml-2"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
