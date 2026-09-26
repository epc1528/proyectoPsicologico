import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getMisRespuestas, saveRespuesta } from '../../features/respuestas/api/respuestas.api';
import { cartillasData } from '../../cartillasData';
import { CONTACT_CONFIG, getWhatsAppLink } from '../../config/constants';
import { abrirModalCompraNequi } from '../../services/compraWhatsApp';
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
                <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">Cargando tu Bitácora...</p>
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
    const totalPaginas = cartilla.paginas.length;
    const esUltimaPagina = paginaActual === totalPaginas - 1;
    const esPaginaBloqueo = pagina.tipo === 'bloqueo';
    const progreso = ((paginaActual + 1) / totalPaginas) * 100;

    return (
        <div className={`min-h-screen ${cartilla.colorFondo} py-8 md:py-12 transition-colors duration-500 flex flex-col`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col">

                {/* Barra de Control Principal */}
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-white/50 dark:border-slate-800 mb-8 flex flex-wrap items-center justify-between gap-4">
                    
                    {/* Botón Volver y Selector de Vista */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <Link to="/cartillas" className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 transition-colors flex items-center gap-2">
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
                                ✍️ Muestra Interactiva
                            </button>
                            <button
                                onClick={() => setVistaModo('pdf')}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                                    vistaModo === 'pdf'
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                📄 Vista Previa PDF
                            </button>
                        </div>
                    </div>

                    {/* Acciones del Encabezado */}
                    <div className="flex items-center gap-3 flex-wrap ml-auto">
                        <button
                            onClick={() => abrirModalCompraNequi(cartilla)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                        >
                            📥 Descargar PDF Completo
                        </button>

                        {vistaModo === 'interactivo' && !esPaginaBloqueo && (
                            <button
                                onClick={handleGuardar}
                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
                                    guardado
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                }`}
                            >
                                {guardado ? '✓ ¡Progreso Guardado!' : '💾 Guardar'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Vista 1: Visualizador de PDF Embed */}
                {vistaModo === 'pdf' && (
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 flex-grow flex flex-col min-h-[750px] animate-in fade-in duration-500">
                        {/* Banner Informativo de Compra */}
                        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">💡</span>
                                <p className="text-sm text-emerald-950 dark:text-emerald-200 font-medium">
                                    Estás en la <strong>vista previa</strong>. Para recibir el archivo PDF oficial completo de alta calidad en tu dispositivo o para imprimir, solicítalo por WhatsApp.
                                </p>
                            </div>
                            <button
                                onClick={() => abrirModalCompraNequi(cartilla)}
                                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
                            >
                                <span>💬</span> Adquirir PDF ($15.000 COP)
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-4 px-2">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                📄 {cartilla.titulo} — Vista Previa
                            </h2>
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
                        <div className="mb-6 bg-white/70 dark:bg-slate-900/70 p-4 rounded-2xl border border-white/40 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                <span>{esPaginaBloqueo ? 'Desbloqueo de Versión Completa' : 'Progreso de la Muestra'}</span>
                                <span>Página {paginaActual + 1} de {totalPaginas}</span>
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
                            
                            <div className="p-6 sm:p-12 flex-grow flex flex-col justify-center relative z-10">

                                {/* PÁGINA 1: PORTADA */}
                                {pagina.tipo === 'portada' && (
                                    <div className="text-center space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500 py-4">
                                        {pagina.imagen_url ? (
                                            <img
                                                src={pagina.imagen_url}
                                                alt="Portada Bitácora Oficial"
                                                className="w-56 sm:w-72 md:w-80 h-auto max-h-[380px] object-cover mx-auto rounded-[2rem] shadow-2xl border-4 border-white dark:border-slate-800 transition-transform hover:scale-105 duration-500"
                                            />
                                        ) : (
                                            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${cartilla.colorTema} flex items-center justify-center text-6xl shadow-xl shadow-current/20`}>
                                                {pagina.imagen}
                                            </div>
                                        )}
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {pagina.titulo}
                                        </h1>
                                        <div className={`inline-block px-6 py-2.5 rounded-full bg-gradient-to-r ${cartilla.colorTema} text-white font-black tracking-widest text-base sm:text-lg shadow-lg`}>
                                            {pagina.subtitulo}
                                        </div>
                                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
                                            {pagina.descripcion}
                                        </p>
                                        <div className="pt-2">
                                            <button
                                                onClick={() => setPaginaActual(1)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                                            >
                                                Comenzar Muestra Gratuita →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* PÁGINA 2: TEORÍA */}
                                {pagina.tipo === 'teoria' && (
                                    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500 py-4">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                            <span>📖</span> Introducción Psicoeducativa
                                        </div>
                                        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${cartilla.colorTema}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                                            {pagina.titulo}
                                        </h2>
                                        <div className="prose prose-lg dark:prose-invert prose-slate">
                                            <p className="text-lg sm:text-xl leading-relaxed text-slate-700 dark:text-slate-300 font-light">
                                                {pagina.contenido}
                                            </p>
                                        </div>
                                        {pagina.frase && (
                                            <div className="p-6 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
                                                <p className="italic text-indigo-900 dark:text-indigo-200 font-medium text-lg">"{pagina.frase}"</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* PÁGINA 3: EJERCICIO INTERACTIVO (DÍA 1) */}
                                {pagina.tipo === 'ejercicio' && (
                                    <div className="max-w-3xl mx-auto w-full space-y-6 animate-in slide-in-from-right-8 duration-500 py-4">
                                        <div className="inline-flex items-center gap-3">
                                            <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cartilla.colorTema} text-white flex items-center justify-center font-bold text-2xl shadow-lg`}>✍️</span>
                                            <div>
                                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{pagina.titulo}</h2>
                                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">Ejercicio Interactivo de Muestra</p>
                                            </div>
                                        </div>

                                        {pagina.frase && (
                                            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/60 border-l-4 border-indigo-500 text-indigo-950 dark:text-indigo-200 font-medium italic text-base sm:text-lg shadow-sm">
                                                “{pagina.frase}”
                                            </div>
                                        )}

                                        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                                            {pagina.instruccion}
                                        </p>

                                        <div className="relative group">
                                            <textarea
                                                className="relative w-full h-56 sm:h-64 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 outline-none resize-none text-slate-800 dark:text-slate-100 leading-relaxed bg-slate-50 dark:bg-slate-950 shadow-inner text-base sm:text-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={pagina.placeholder || "Escribe tu respuesta o reflexión aquí..."}
                                                value={respuestas[paginaActual] || ''}
                                                onChange={(e) => handleRespuestaChange(e.target.value)}
                                            ></textarea>
                                        </div>

                                        {/* Nivel de Bienestar / Energía */}
                                        <div className="pt-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                                            <label className="flex justify-between items-center mb-3 font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
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

                                {/* PÁGINA 4: BLOQUEO Y REDIRECCIÓN A WHATSAPP (PAYWALL) */}
                                {pagina.tipo === 'bloqueo' && (
                                    <div className="max-w-3xl mx-auto w-full space-y-6 sm:space-y-8 animate-in zoom-in-95 duration-500 py-4 text-center">
                                        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-4xl shadow-xl shadow-rose-500/20">
                                            🔒
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-xs font-black tracking-widest uppercase shadow-sm">
                                                Muestra Gratuita Finalizada
                                            </span>
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                {pagina.titulo}
                                            </h2>
                                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
                                                {pagina.descripcion}
                                            </p>
                                        </div>

                                        {/* Tarjetas de Beneficios */}
                                        <div className="grid sm:grid-cols-3 gap-4 text-left">
                                            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-2xl mb-2">🗓️</div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Guía Completa</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Todos los días y ejercicios clínicos estructurados paso a paso.</p>
                                            </div>
                                            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-2xl mb-2">📄</div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">PDF en Alta Calidad</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Listo para descargar, imprimir y conservar en tus dispositivos.</p>
                                            </div>
                                            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                                                <div className="text-2xl mb-2">💛</div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Atención Directa</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Entrega inmediata de la bitácora vía WhatsApp por la especialista.</p>
                                            </div>
                                        </div>

                                        {/* Caja de Pago Nequi */}
                                        <div className="p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-[#1e022b] to-[#3b0764] text-white shadow-2xl relative overflow-hidden text-left border border-fuchsia-500/30">
                                            <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-purple-800/50 pb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    <span className="text-xs uppercase tracking-widest text-fuchsia-200 font-bold">Pago Inmediato con Nequi</span>
                                                </div>
                                                <span className="text-2xl font-black text-emerald-400">$15.000 COP</span>
                                            </div>

                                            <p className="text-xs text-purple-200 mb-2 font-medium">NÚMERO DE CUENTA NEQUI:</p>
                                            <div className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-purple-500/30 mb-4">
                                                <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-white">
                                                    {CONTACT_CONFIG.nequiPhone}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(CONTACT_CONFIG.nequiRaw);
                                                        Swal.fire({
                                                            toast: true,
                                                            position: 'top-end',
                                                            icon: 'success',
                                                            title: '¡Número Nequi copiado!',
                                                            showConfirmButton: false,
                                                            timer: 2000
                                                        });
                                                    }}
                                                    className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    Copiar
                                                </button>
                                            </div>

                                            <p className="text-xs text-purple-200/90 leading-relaxed">
                                                ✨ Envía $15.000 COP a Nequi y presiona el botón abajo para adjuntar tu comprobante en WhatsApp y recibir el documento completo de inmediato.
                                            </p>
                                        </div>

                                        {/* Botón WhatsApp */}
                                        <div className="pt-2">
                                            <a
                                                href={getWhatsAppLink(`¡Hola! He completado la muestra gratuita de la *${cartilla.titulo}* y deseo adquirir la versión completa ($15.000 COP). Ya tengo listo el comprobante de Nequi.`)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold px-8 py-5 rounded-2xl text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer"
                                            >
                                                <span className="text-2xl">💬</span>
                                                <span>Comprar Cartilla Completa por WhatsApp ($15.000 COP)</span>
                                            </a>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Navegador Inferior de Páginas */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 flex justify-between items-center">
                                <button
                                    onClick={() => setPaginaActual(Math.max(0, paginaActual - 1))}
                                    disabled={paginaActual === 0}
                                    className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all text-sm sm:text-base ${
                                        paginaActual === 0
                                            ? 'opacity-0 cursor-default'
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 hover:-translate-x-1 cursor-pointer'
                                    }`}
                                >
                                    ← Anterior
                                </button>

                                {esPaginaBloqueo ? (
                                    <button
                                        onClick={() => abrirModalCompraNequi(cartilla)}
                                        className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:scale-105 bg-gradient-to-r from-emerald-500 to-green-600 text-sm sm:text-base cursor-pointer flex items-center gap-2"
                                    >
                                        <span>💬</span> Comprar por WhatsApp ($15.000)
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            handleGuardar();
                                            setPaginaActual(paginaActual + 1);
                                        }}
                                        className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:translate-x-1 bg-gradient-to-r ${cartilla.colorTema} text-sm sm:text-base cursor-pointer`}
                                    >
                                        Siguiente Página →
                                    </button>
                                )}
                            </div>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
