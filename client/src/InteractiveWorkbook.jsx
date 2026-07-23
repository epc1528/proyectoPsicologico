import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { cartillasData } from './cartillasData';
import Swal from 'sweetalert2';

export default function InteractiveWorkbook() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [paginaActual, setPaginaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [guardado, setGuardado] = useState(false);
  const [energia, setEnergia] = useState('5');
  const [loading, setLoading] = useState(true);

  const cartilla = cartillasData[id];
  
  const pdfLinks = {
    '1': '/cartillas/Cartilla salud mental ADULTO MAYOR 1.pdf',
    '2': '/cartillas/cartilla salud mental ADOLESCENTES 1.pdf',
    '3': '/cartillas/cartilla salud mental INFANCIA 1.pdf'
  };

  useEffect(() => {
    if (user === null) {
      setTimeout(() => navigate('/login'), 100);
      return;
    }
    
    // Cargar respuestas de la base de datos
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/mis-respuestas', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const myRes = data.find(r => r.taller_id === parseInt(id));
        if (myRes) {
          try {
            const parsed = JSON.parse(myRes.respuesta);
            setRespuestas(parsed || {});
          } catch (e) {
            setRespuestas({});
          }
          if (myRes.energia) setEnergia(myRes.energia.toString());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, navigate, id]);

  if (!cartilla) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-slate-900">
      <div className="text-center py-20 text-2xl font-serif text-slate-800 dark:text-white">Programa Clínico no encontrado</div>
    </div>
  );

  const pagina = cartilla.paginas[paginaActual];
  const progreso = ((paginaActual + 1) / cartilla.paginas.length) * 100;

  const handleGuardar = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/respuestas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ taller_id: parseInt(id), respuesta: JSON.stringify(respuestas), energia: parseInt(energia) })
    })
    .then(res => res.json())
    .then(() => {
      setGuardado(true);
      setTimeout(() => setGuardado(false), 2000);
    })
    .catch(console.error);
  };

  const handleRespuestaChange = (val) => {
    setRespuestas({ ...respuestas, [paginaActual]: val });
  };

  return (
    <div className={`min-h-screen bg-[#FDFBF7] dark:bg-slate-950 py-12 transition-colors duration-500 flex flex-col`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col">
        
        {/* Navegación y Progreso Clínico */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-4">
            <Link to="/mis-cartillas" className="text-stone-600 hover:text-emerald-800 dark:text-slate-400 font-medium flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-5 py-2.5 rounded-lg border border-stone-200 dark:border-slate-700 backdrop-blur-md transition-all hover:bg-stone-50 dark:hover:bg-slate-700 tracking-wide text-sm uppercase">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Regresar
            </Link>
            <a href={pdfLinks[id]} download className="text-white font-medium flex items-center gap-2 bg-slate-900 dark:bg-emerald-600 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 tracking-wide text-sm uppercase">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Descargar PDF
            </a>
          </div>
          <div className="flex-grow mx-10">
            <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${cartilla.colorTema} transition-all duration-700 ease-out`}
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <p className="text-center text-xs mt-3 text-stone-500 dark:text-slate-500 font-semibold tracking-widest uppercase">
              Fase {paginaActual + 1} de {cartilla.paginas.length}
            </p>
          </div>
          <button 
            onClick={handleGuardar}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm tracking-wide uppercase border ${guardado ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' : 'bg-white border-stone-200 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800'}`}
          >
            {guardado ? (
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Registro Guardado</span>
            ) : 'Guardar Sesión'}
          </button>
        </div>

        {/* Contenedor Principal (Hoja Clínica Premium) */}
        <div className="bg-white dark:bg-slate-900 flex-grow rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgb(0,0,0,0.2)] overflow-hidden relative border border-stone-100 dark:border-slate-800 flex flex-col animate-fade-in-up">
          
          {/* Diseño de fondo abstracto */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 dark:opacity-5 mix-blend-multiply pointer-events-none rounded-bl-[100px]"></div>
          <div className={`absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br ${cartilla.colorTema} opacity-[0.03] dark:opacity-10 blur-3xl rounded-full pointer-events-none`}></div>

          <div className="p-10 sm:p-20 flex-grow flex flex-col justify-center relative z-10">
            
            {pagina.tipo === 'portada' && (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-700">
                <div className={`w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${cartilla.colorTema} flex items-center justify-center text-5xl shadow-xl shadow-current/10 border border-white/20`}>
                  {pagina.imagen}
                </div>
                <h1 className="text-5xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.2]">
                  {pagina.titulo}
                </h1>
                <div className="w-24 h-1 bg-stone-200 dark:bg-slate-700 mx-auto rounded-full"></div>
                <div className={`inline-block px-6 py-2 rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium tracking-widest text-sm uppercase shadow-sm`}>
                  Módulo: {pagina.subtitulo}
                </div>
                <p className="text-xl text-stone-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed font-light">
                  {pagina.descripcion}
                </p>
              </div>
            )}

            {pagina.tipo === 'teoria' && (
              <div className="max-w-3xl mx-auto space-y-10 animate-fade-in-up">
                <h2 className="text-4xl font-serif text-slate-900 dark:text-white border-l-4 pl-6" style={{ borderLeftColor: 'var(--tw-gradient-from)' }}>
                  {pagina.titulo}
                </h2>
                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none">
                  <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-light">
                    {pagina.contenido}
                  </p>
                </div>
                <div className="p-8 bg-stone-50/50 dark:bg-slate-800/30 rounded-2xl border border-stone-100 dark:border-slate-700/50 mt-12">
                   <p className="italic text-stone-600 dark:text-slate-400 font-serif text-lg text-center">
                     "El autoconocimiento es el primer paso hacia el bienestar. Tómate tu tiempo para procesar esta información."
                   </p>
                </div>
              </div>
            )}

            {pagina.tipo === 'ejercicio' && (
              <div className="max-w-3xl mx-auto w-full space-y-10 animate-fade-in-up">
                <div className="inline-flex items-center gap-4 border-b border-stone-100 dark:border-slate-800 pb-6 w-full">
                  <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cartilla.colorTema} text-white flex items-center justify-center font-bold shadow-md`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </span>
                  <h2 className="text-3xl font-serif text-slate-900 dark:text-white">{pagina.titulo}</h2>
                </div>
                
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                  {pagina.instruccion}
                </p>
                
                <div className="relative group">
                  <textarea 
                    className="relative w-full h-72 border border-stone-200 dark:border-slate-700 rounded-2xl p-8 outline-none resize-none text-slate-800 dark:text-slate-200 leading-relaxed bg-[#FDFBF7]/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:border-transparent text-lg font-light transition-all shadow-inner custom-scrollbar" 
                    style={{ '--tw-ring-color': 'var(--tw-gradient-from)' }}
                    placeholder={pagina.placeholder}
                    value={respuestas[paginaActual] || ''}
                    onChange={(e) => handleRespuestaChange(e.target.value)}
                  ></textarea>
                </div>

                {/* Nivel de Energía Opcional */}
                {id === '2' && (
                  <div className="pt-8 border-t border-stone-100 dark:border-slate-800 mt-8">
                    <label className="flex justify-between items-center mb-6 font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest text-xs">
                      <span>Evaluación de Energía Diaria</span>
                      <span className={`px-4 py-1.5 rounded-lg text-white bg-gradient-to-r ${cartilla.colorTema} shadow-sm font-bold text-sm`}>{energia} / 10</span>
                    </label>
                    <input 
                      type="range" min="1" max="10" 
                      className="w-full h-2 bg-stone-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer outline-none" 
                      value={energia} onChange={(e) => setEnergia(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Controles de Pagina */}
          <div className="p-8 border-t border-stone-100 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 flex justify-between items-center">
            <button 
              onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
              disabled={paginaActual === 0}
              className={`px-8 py-4 rounded-lg font-medium transition-all uppercase tracking-widest text-xs ${paginaActual === 0 ? 'opacity-0 cursor-default' : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 shadow-sm hover:shadow-md border border-stone-200 dark:border-slate-700 hover:-translate-x-1'}`}
            >
              ← Anterior
            </button>
            
            <button 
              onClick={() => {
                if (paginaActual < cartilla.paginas.length - 1) {
                  setPaginaActual(paginaActual + 1);
                } else {
                  handleGuardar();
                  Swal.fire({
                    title: '¡Sesión Finalizada!',
                    text: 'Has completado los objetivos clínicos por hoy.',
                    icon: 'success',
                    confirmButtonColor: '#059669'
                  }).then(() => {
                    navigate('/mis-cartillas');
                  });
                }
              }}
              className={`px-8 py-4 rounded-lg font-bold text-white transition-all shadow-md hover:shadow-lg hover:translate-x-1 uppercase tracking-widest text-xs bg-gradient-to-r ${cartilla.colorTema}`}
            >
              {paginaActual === cartilla.paginas.length - 1 ? 'Concluir Sesión ✓' : 'Siguiente Paso →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
