import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getMisRespuestas, saveRespuesta } from '../../features/respuestas/api/respuestas.api';
import { cartillasData } from '../../cartillasData';
import Swal from 'sweetalert2';

export default function InteractiveWorkbook() {
    const { id } = useParams();
    const { user, authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [vistaModo, setVistaModo] = useState('interactivo'); // 'interactivo' | 'pdf'
    const [paginaActual, setPaginaActual] = useState(0);
    const [respuestas, setRespuestas] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [energia, setEnergia] = useState('5');
    const [loading, setLoading] = useState(true);

    const cartillaId = id || '2';
    const cartilla = cartillasData[cartillaId] || cartillasData['2'];

    const pdfLinks = {
        '1': '/cartillas/Cartilla salud mental ADULTO MAYOR 1.pdf',
        '2': '/cartillas/C ADOLESCENTENUEVA.pdf',
        '3': '/cartillas/cartilla salud mental INFANCIA 1.pdf'
    };

    const pdfActual = pdfLinks[cartillaId] || pdfLinks['2'];

    // Cargar respuestas (de la API o de localStorage)
    useEffect(() => {
        if (authLoading) return;

        // Intentar recuperar de localStorage primero
        const localSaved = localStorage.getItem(`cartilla_respuestas_${cartillaId}`);
        if (localSaved) {
            try {
                setRespuestas(JSON.parse(localSaved));
            } catch {
                // Ignore parse error
            }
        }

        if (user) {
            getMisRespuestas()
                .then(data => {
                    if (Array.isArray(data)) {
                        const myRes = data.find(r => r.taller_id === parseInt(cartillaId) || r.cartillaId === parseInt(cartillaId));
                        if (myRes) {
                            try {
                                const parsed = JSON.parse(myRes.respuesta);
                                setRespuestas(parsed || {});
                            } catch {
                                // Ignore error
                            }
                            if (myRes.energia) setEnergia(myRes.energia.toString());
                        }
                    }
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, authLoading, cartillaId]);

    const handleGuardar = () => {
        // Guardar localmente siempre
        localStorage.setItem(`cartilla_respuestas_${cartillaId}`, JSON.stringify(respuestas));

        if (user) {
            saveRespuesta({ taller_id: parseInt(cartillaId), respuesta: JSON.stringify(respuestas), energia: parseInt(energia) })
                .then(() => {
                    setGuardado(true);
                    setTimeout(() => setGuardado(false), 2500);
                })
                .catch((err) => {
                    console.error("Error guardando en API:", err);
                    setGuardado(true);
                    setTimeout(() => setGuardado(false), 2500);
                });
        } else {
            setGuardado(true);
            setTimeout(() => setGuardado(false), 2500);
        }
    };

    const handleRespuestaChange = (val) => {
        const nuevasRespuestas = { ...respuestas, [paginaActual]: val };
        setRespuestas(nuevasRespuestas);
        localStorage.setItem(`cartilla_respuestas_${cartillaId}`, JSON.stringify(nuevasRespuestas));
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">Cargando tu Bitácora Oficial...</p>
            </div>
        );
    }

    if (!cartilla) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Bitácora no encontrada</h2>
                <Link to="/cartillas" className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold">Volver al Catálogo</Link>
            </div>
        );
    }

    const pagina = cartilla.paginas[paginaActual] || cartilla.paginas[0];
    const progreso = ((paginaActual + 1) / cartilla.paginas.length) * 100;

    return (
        <div className={`min-h-screen ${cartilla.colorFondo} py-8 md:py-12 transition-colors duration-500 flex flex-col`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col">

                {/* Barra de Control Principal */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50 dark:border-slate-800 mb-8 flex flex-wrap items-center justify-between gap-4">
                    
                    {/* Botón Volver y Selector de Vista */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <Link to="/cartillas" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors flex items-center gap-2">
                            ← Catálogo
                        </Link>

                        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                            <button
                                onClick={() => setVistaModo('interactivo')}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                                    vistaModo === 'interactivo'
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                ✍️ Modo Interactivo Web
                            </button>
                            <button
                                onClick={() => setVistaModo('pdf')}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                                    vistaModo === 'pdf'
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                📄 Ver Documento PDF
                            </button>
                        </div>
                    </div>

                    {/* Acciones del Encabezado */}
                    <div className="flex items-center gap-3 flex-wrap ml-auto">
                        <a
                            href={pdfActual}
                            download
                            className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-400 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
                        >
                            📥 Descargar PDF
                        </a>

                        {vistaModo === 'interactivo' && (
                            <button
                                onClick={handleGuardar}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                                    guardado
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                            >
                                {guardado ? '✓ ¡Progreso Guardado!' : '💾 Guardar Progreso'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Vista 1: Visualizador de PDF Embed */}
                {vistaModo === 'pdf' && (
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 flex-grow flex flex-col min-h-[750px] animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                📄 {cartilla.titulo} — Documento PDF Oficial
                            </h2>
                            <a
                                href={pdfActual}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                            >
                                Abrir en pantalla completa ↗
                            </a>
                        </div>
                        <div className="w-full flex-grow bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden min-h-[680px] border border-slate-200 dark:border-slate-800 relative">
                            <iframe
                                src={`${pdfActual}#view=FitH`}
                                title="Visualizador Bitácora PDF"
                                className="w-full h-full min-h-[680px] rounded-xl"
                            />
                        </div>
                    </div>
                )}

                {/* Vista 2: Modo Taller Interactivo */}
                {vistaModo === 'interactivo' && (
                    <>
                        {/* Barra de Progreso */}
                        <div className="mb-6 bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-white/40 dark:border-slate-800">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                <span>Progreso de la Bitácora</span>
                                <span>Página {paginaActual + 1} de {cartilla.paginas.length}</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${cartilla.colorTema} transition-all duration-500 ease-out`}
                                    style={{ width: `${progreso}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Hoja Digital Interactiva */}
                        <div className="bg-white dark:bg-slate-900 flex-grow rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-200/80 dark:border-slate-800 flex flex-col animate-in fade-in duration-500">
                            
                            <div className="p-8 sm:p-14 flex-grow flex flex-col justify-center relative z-10">

                                {pagina.tipo === 'portada' && (
                                    <div className="text-center space-y-8 animate-in zoom-in-95 duration-500 py-6">
                                        {pagina.imagen_url ? (
                                            <img
                                                src={pagina.imagen_url}
                                                alt="Portada Bitácora Oficial"
                                                className="w-64 md:w-80 h-auto max-h-[420px] object-cover mx-auto rounded-[2rem] shadow-2xl border-4 border-white dark:border-slate-800 transition-transform hover:scale-105 duration-500"
                                            />
                                        ) : (
                                            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${cartilla.colorTema} flex items-center justify-center text-6xl shadow-xl shadow-current/20`}>
                                                {pagina.imagen}
                                            </div>
                                        )}
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {pagina.titulo}
                                        </h1>
                                        <div className={`inline-block px-6 py-2.5 rounded-full bg-gradient-to-r ${cartilla.colorTema} text-white font-black tracking-widest text-lg shadow-lg`}>
                                            {pagina.subtitulo}
                                        </div>
                                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
                                            {pagina.descripcion}
                                        </p>
                                        <div className="pt-4">
                                            <button
                                                onClick={() => setPaginaActual(1)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                            >
                                                Comenzar Bitácora Interactiva →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {pagina.tipo === 'teoria' && (
                                    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 py-4">
                                        <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${cartilla.colorTema}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {pagina.titulo}
                                        </h2>
                                        <div className="prose prose-lg dark:prose-invert prose-slate">
                                            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-light">
                                                {pagina.contenido}
                                            </p>
                                        </div>
                                        {pagina.frase && (
                                            <div className="p-6 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border-l-4 border-indigo-500">
                                                <p className="italic text-indigo-900 dark:text-indigo-200 font-medium">"{pagina.frase}"</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {pagina.tipo === 'ejercicio' && (
                                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in slide-in-from-right-8 duration-500 py-4">
                                        <div className="inline-flex items-center gap-3">
                                            <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cartilla.colorTema} text-white flex items-center justify-center font-bold text-2xl shadow-lg`}>✍️</span>
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{pagina.titulo}</h2>
                                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">Ejercicio Interactivo</p>
                                            </div>
                                        </div>

                                        {pagina.frase && (
                                            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 border-l-4 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-medium italic text-lg shadow-sm">
                                                “{pagina.frase}”
                                            </div>
                                        )}

                                        <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                                            {pagina.instruccion}
                                        </p>

                                        <div className="relative group">
                                            <textarea
                                                className="relative w-full h-64 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 outline-none resize-none text-slate-800 dark:text-slate-100 leading-relaxed bg-slate-50 dark:bg-slate-950 shadow-inner text-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={pagina.placeholder || "Escribe tu respuesta o reflexión aquí..."}
                                                value={respuestas[paginaActual] || ''}
                                                onChange={(e) => handleRespuestaChange(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Nivel de Energía */}
                                        <div className="pt-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                                            <label className="flex justify-between items-center mb-3 font-bold text-slate-800 dark:text-slate-200">
                                                <span>¿Cómo sientes tu nivel de bienestar emocional hoy?</span>
                                                <span className={`px-4 py-1 rounded-full text-white bg-gradient-to-r ${cartilla.colorTema} font-black shadow-md`}>{energia} / 10</span>
                                            </label>
                                            <input
                                                type="range" min="1" max="10"
                                                className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                                value={energia} onChange={(e) => setEnergia(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Navegador de Páginas */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 flex justify-between items-center">
                                <button
                                    onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
                                    disabled={paginaActual === 0}
                                    className={`px-8 py-4 rounded-xl font-bold transition-all ${
                                        paginaActual === 0
                                            ? 'opacity-0 cursor-default'
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:-translate-x-1'
                                    }`}
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
                                                title: '<strong>¡Felicitaciones!</strong>',
                                                icon: 'success',
                                                html: `
                                                    <p style="color: #475569; margin-bottom: 12px;">Has completado y guardado tus reflexiones en la bitácora.</p>
                                                    <p style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 10px; border-radius: 10px; color: #047857; font-weight: 600;">
                                                        ✨ Recuerda que puedes descargar el archivo PDF completo o volver cuando desees.
                                                    </p>
                                                `,
                                                confirmButtonColor: '#059669',
                                                confirmButtonText: 'Volver a Mis Bitácoras'
                                            }).then(() => {
                                                navigate('/cartillas');
                                            });
                                        }
                                    }}
                                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:translate-x-1 bg-gradient-to-r ${cartilla.colorTema}`}
                                >
                                    {paginaActual === cartilla.paginas.length - 1 ? 'Finalizar y Guardar ✨' : 'Siguiente Página →'}
                                </button>
                            </div>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
