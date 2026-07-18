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

  if (!cartilla) return <div className="text-center py-20 text-2xl font-bold">Cartilla no encontrada</div>;

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
    <div className={`min-h-screen ${cartilla.colorFondo} py-12 transition-colors duration-500 flex flex-col`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col">
        
        {/* Navegación y Progreso */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Link to="/cartillas" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 font-bold flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-slate-700">
              ← Volver
            </Link>
            <a href={pdfLinks[id]} download className="text-white font-bold flex items-center gap-2 bg-slate-900 dark:bg-teal-500 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              📥 Descargar PDF
            </a>
          </div>
          <div className="flex-grow mx-8">
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${cartilla.colorTema} transition-all duration-500 ease-out`}
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <p className="text-center text-xs mt-2 text-slate-500 font-bold tracking-widest uppercase">
              Página {paginaActual + 1} de {cartilla.paginas.length}
            </p>
          </div>
          <button 
            onClick={handleGuardar}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${guardado ? 'bg-emerald-100 text-emerald-700' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-md'}`}
          >
            {guardado ? '✓ Guardado' : 'Guardar Progreso'}
          </button>
        </div>

        {/* Contenedor Principal (La "Hoja" de la cartilla) */}
        <div className="bg-white dark:bg-slate-900 flex-grow rounded-[3rem] shadow-2xl overflow-hidden relative border border-white/40 dark:border-slate-700/50 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Diseño de fondo abstracto para dar ese toque de "diseño de PDF premium" */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/0 to-slate-100/50 dark:to-slate-800/50 rounded-bl-full pointer-events-none"></div>
          <div className={`absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br ${cartilla.colorTema} opacity-5 blur-3xl rounded-full pointer-events-none`}></div>

          <div className="p-10 sm:p-16 flex-grow flex flex-col justify-center relative z-10">
            
            {pagina.tipo === 'portada' && (
              <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${cartilla.colorTema} flex items-center justify-center text-6xl shadow-xl shadow-current/20`}>
                  {pagina.imagen}
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {pagina.titulo}
                </h1>
                <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${cartilla.colorTema} text-white font-black tracking-widest text-lg shadow-lg`}>
                  {pagina.subtitulo}
                </div>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                  {pagina.descripcion}
                </p>
              </div>
            )}

            {pagina.tipo === 'teoria' && (
              <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
                <h2 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${cartilla.colorTema}`}>
                  {pagina.titulo}
                </h2>
                <div className="prose prose-lg dark:prose-invert prose-slate">
                  <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-light">
                    {pagina.contenido}
                  </p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-current" style={{ borderColor: 'var(--tw-gradient-from)' }}>
                   <p className="italic text-slate-600 dark:text-slate-400">"El autoconocimiento es el primer paso hacia el bienestar. Tómate tu tiempo para procesar esta información."</p>
                </div>
              </div>
            )}

            {pagina.tipo === 'ejercicio' && (
              <div className="max-w-2xl mx-auto w-full space-y-8 animate-in slide-in-from-right-8 duration-500">
                <div className="inline-flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cartilla.colorTema} text-white flex items-center justify-center font-bold shadow-lg`}>✍️</span>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{pagina.titulo}</h2>
                </div>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {pagina.instruccion}
                </p>
                
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${cartilla.colorTema} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500`}></div>
                  <textarea 
                    className="relative w-full h-64 border-0 rounded-2xl p-8 outline-none resize-none text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-inner text-lg font-medium" 
                    placeholder={pagina.placeholder}
                    value={respuestas[paginaActual] || ''}
                    onChange={(e) => handleRespuestaChange(e.target.value)}
                  ></textarea>
                </div>

                {/* Nivel de Energía Opcional */}
                {id === '2' && (
                  <div className="pt-6">
                    <label className="flex justify-between items-center mb-4 font-bold text-slate-700 dark:text-slate-300">
                      <span>Mi Energía Hoy:</span>
                      <span className={`px-4 py-1 rounded-full text-white bg-gradient-to-r ${cartilla.colorTema} shadow-md`}>{energia} / 10</span>
                    </label>
                    <input 
                      type="range" min="1" max="10" 
                      className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" 
                      value={energia} onChange={(e) => setEnergia(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Controles de Pagina */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex justify-between items-center">
            <button 
              onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
              disabled={paginaActual === 0}
              className={`px-8 py-4 rounded-xl font-bold transition-all ${paginaActual === 0 ? 'opacity-0 cursor-default' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:-translate-x-1'}`}
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
                    title: '¡Excelente trabajo!',
                    text: 'Has completado esta cartilla por hoy.',
                    icon: 'success',
                    confirmButtonColor: '#14b8a6'
                  }).then(() => {
                    navigate('/mis-cartillas');
                  });
                }
              }}
              className={`px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:translate-x-1 bg-gradient-to-r ${cartilla.colorTema}`}
            >
              {paginaActual === cartilla.paginas.length - 1 ? 'Finalizar ✨' : 'Siguiente →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
