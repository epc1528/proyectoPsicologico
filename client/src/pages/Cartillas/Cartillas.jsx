import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../app/providers/AuthProvider';
import { getCartillas } from '../../features/cartillas/api/cartillas.api';
import { getMisCompras, comprarCartilla } from '../../features/compras/api/compras.api';
import { abrirModalCompraNequi } from '../../services/compraWhatsApp';
import { CONTACT_CONFIG } from '../../config/constants';
import Swal from 'sweetalert2';

const CARTILLAS_DEFAULT = [
    {
        id: 1,
        titulo: 'Bitácora Adultos',
        descripcion: 'Ejercicios creativos que conectan para el amor propio, sanar heridas, establecer límites sanos y reducir el estrés propio de la edad.',
        precio: 12000,
        imagen_url: '/covers/adulto.jpeg'
    },
    {
        id: 2,
        titulo: 'Bitácora Adolescentes',
        descripcion: 'Herramientas para manejar la ansiedad, fortalecer la identidad, mejorar las relaciones y construir autoconfianza.',
        precio: 12000,
        imagen_url: '/covers/adolescente.jpeg'
    },
    {
        id: 3,
        titulo: 'Bitácora Infantil',
        descripcion: 'Actividades lúdicas para desarrollar inteligencia emocional, autoestima, empatía y habilidades para expresar sentimientos.',
        precio: 12000,
        imagen_url: '/covers/infancia.jpeg'
    }
];

export default function Cartillas() {
    const [cartillas, setCartillas] = useState(CARTILLAS_DEFAULT);
    const [compradas, setCompradas] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        getCartillas()
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setCartillas(data);
                }
            })
            .catch((err) => {
                console.error("Error obteniendo cartillas del servidor:", err);
            });

        if (user) {
            getMisCompras()
                .then((data) => {
                    if (Array.isArray(data)) setCompradas(data.map((c) => c.id));
                })
                .catch(console.error);
        }
    }, [user]);

    const handleIngresarMuestra = (cartilla) => {
        navigate(`/cartilla/${cartilla.id}`);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800/50 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6 shadow-sm">
                        Catálogo Oficial & Muestras Gratuitas
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Nuestras Bitácoras Emocionales
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Explora gratis las primeras 3 páginas de cada bitácora y adquiere la versión completa guiada por la especialista con pago inmediato vía Nequi.
                    </p>
                </div>

                {cartillas.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 dark:text-slate-400 flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        Cargando bitácoras...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cartillas.map((cartilla, index) => {
                            const precio = (cartilla.precio === 120000 ? 12000 : (cartilla.precio || 12000));
                            return (
                                <div
                                    key={cartilla.id}
                                    className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600/60 transition-all duration-300 flex flex-col group relative overflow-hidden hover:-translate-y-2"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-sm">
                                            <span>✨</span> MUESTRA GRATUITA (PÁGS 1-3)
                                        </span>
                                    </div>

                                    <div className="w-full h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-slate-700/50 p-2">
                                        <img
                                            src={cartilla.id === 1 ? '/covers/adulto.jpeg' : cartilla.id === 2 ? '/covers/adolescente.jpeg' : '/covers/infancia.jpeg'}
                                            alt={`Portada ${cartilla.titulo}`}
                                            className="w-full h-full object-cover rounded-xl shadow-md transition-transform group-hover:scale-105 duration-700"
                                        />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {cartilla.titulo}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow font-light leading-relaxed line-clamp-3">
                                        {cartilla.descripcion}
                                    </p>

                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                                        <div>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5 font-semibold">Valor Completa</p>
                                            <div className="text-rose-600 dark:text-pink-400 font-extrabold text-2xl">
                                                ${precio.toLocaleString('es-CO')} <span className="text-xs font-medium opacity-70">COP</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                                📱 Nequi & WhatsApp
                                            </span>
                                        </div>
                                    </div>

                                    {/* Botones de Acción Dual */}
                                    <div className="flex flex-col gap-2.5">
                                        <button
                                            onClick={() => handleIngresarMuestra(cartilla)}
                                            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                                        >
                                            <span>📖</span> Ver Muestra Gratuita (Págs 1-3)
                                        </button>
                                        <button
                                            onClick={() => abrirModalCompraNequi(cartilla)}
                                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer hover:scale-[1.02]"
                                        >
                                            <span>💬</span> Comprar Completa por WhatsApp
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
